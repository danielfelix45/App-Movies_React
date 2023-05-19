import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './style.css';

function Favorites() {

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const listMovies = localStorage.getItem('@primeflix');
    setMovies(JSON.parse(listMovies) || []);

  }, [])

  return (
    <div className='my-movies'>
      <h1>My Movies</h1>

      <ul>
        {movies.map((movie) => {
          return (
            <li key={movie.id}>
              <span>{movie.title}</span>

              <div>
                <Link to={`/movie/${movie.id}`} >See details</Link>
                <button>Remove</button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Favorites;