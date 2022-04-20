import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './App.css'
import MovieCard from './MovieCard'

const omdbapi = 'http://www.omdbapi.com/?i=tt3896198&apikey=36ac6ee8'


const App = () => {
  const [search, setSearch] = useState('')
  const [movies, setMovies] = useState([])

  useEffect(() => {
    searchMovies('batman')
  }, [])

  const searchMovies = async (title) => {
    const req = await axios.get(`${omdbapi}&s=${title}`)
    setMovies(req.data.Search)
    setSearch('')
  }

  return (
    <>
      <div className="app">
        <h1>Movie Search</h1>
        <div className="search">
          <input
            type="search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <i class="bi bi-search"
          onClick={()=> searchMovies(search)}
          ></i>
        </div>
      </div>

      <div className="container">
        {movies?.length > 0 ? (
          movies.map((movie) => {
          return <MovieCard movie={movie} key={movie.imdbID} />;
          })
        ) : (
        <h1>No Movies</h1>
        )}
      </div>
    </>
  );
}

export default App