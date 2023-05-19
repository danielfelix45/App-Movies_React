import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import './style.css';

function Favorites() {

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const listMovies = localStorage.getItem('@primeflix');
    setMovies(JSON.parse(listMovies) || []);

  }, [])

  function deleteMovie(id) {
    let filterMovies = movies.filter((movie) => {
      return (movie.id !== id);
    })

    setMovies(filterMovies);
    localStorage.setItem('@primeflix', JSON.stringify(filterMovies));
    toast.success("Successfully deleted movie");
  }

  return (
    <div className='my-movies'>
      <h1>My Movies</h1>

      {movies.length === 0 && <span>You haven't movie saved in your list.</span>}
      <ul>
        {movies.map((movie) => {
          return (
            <li key={movie.id}>
              <span>{movie.title}</span>

              <div>
                <Link to={`/movie/${movie.id}`} >See details</Link>
                <button onClick={() => deleteMovie(movie.id)}>Remove</button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Favorites;