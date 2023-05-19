import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './style.css';

import api from '../../services/api';

function Movie() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovie() {
      await api.get(`/movie/${id}`, {
        params: {
          api_key: "a409115261eb98a08aa6f06fb909e3f6",
          language: "pt-BR"
        }
      })
        .then(response => {
          setMovie(response.data);
          setLoading(false);
        })
        .catch(() => {
          console.log("Movie not found");
          navigate("/", { replace: true });
          return;
        })
    }

    loadMovie();

    return () => {
      console.log('Desmontado');
    }
  }, [navigate, id])

  function SaveMovie() {
    const myList = localStorage.getItem("@primeflix");

    let saveMovies = JSON.parse(myList) || [];

    const hasMovie = saveMovies.some((saveMovies) => saveMovies.id === movie.id);

    if (hasMovie) {
      alert('This movie is already on your list');
      return;
    }

    saveMovies.push(movie);
    localStorage.setItem("@primeflix", JSON.stringify(saveMovies));
    alert('Successfully saved movie');
  }

  if (loading) {
    return (
      <div className='filme-info'>
        <h1>Carregando...</h1>
      </div>
    )
  }

  return (
    <div className='filme-info'>
      <h1>{movie.title}</h1>
      <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title} />

      <h3>Sinopse</h3>
      <span>{movie.overview}</span>
      <strong>Avaliação: {movie.vote_average} / 10</strong>

      <div className='area-buttons'>
        <button onClick={SaveMovie}>Salvar</button>
        <button>
          <a target="_blank" rel="noreferrer" href={`https://youtube.com/results?search_query=${movie.title} Trailer`} >
            Trailer
          </a>
        </button>
      </div>

    </div>
  )
}

export default Movie;