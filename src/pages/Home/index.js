import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import './style.css';

// URL DA API: /movie/now_playing?api_key=a409115261eb98a08aa6f06fb909e3f6&language=pt-BR

function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {

    async function loadMovies() {
      const response = await api.get("/movie/now_playing", {
        params: {
          api_key: "a409115261eb98a08aa6f06fb909e3f6",
          language: "pt-BR",
          page: 1
        }
      })
      //console.log(response.data.results.slice(0, 10))
      setMovies(response.data.results.slice(0, 10))

    }
    loadMovies();

  }, [])


  return (
    <div className='container'>
      <div className='list-movies'>
        {movies.map((movie) => {
          return (
            <article>
              <strong>{movie.title}</strong>
              <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title} />
              <Link to={`/movie/${movie.id}`}>Acessar</Link>
            </article>
          )
        })}
      </div>
    </div>
  )
}

export default Home;