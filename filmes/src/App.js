// src/App.js
import { useEffect, useState } from "react";
import "./App.css";

const API_KEY = "SUA_API_KEY_AQUI";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR`)
      .then(res => res.json())
      .then(data => setMovies(data.results));
  }, []);

  const searchMovies = (e) => {
    e.preventDefault();

    if (!search) return;

    fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=pt-BR&query=${search}`
    )
      .then(res => res.json())
      .then(data => setMovies(data.results));

    setSearch("");
  };

  return (
    <div className="App">
      <h1>🎬 App de Filmes</h1>

      <form onSubmit={searchMovies}>
        <input
          type="text"
          placeholder="Buscar filme..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>

      <div className="movie-grid">
        {movies.map(movie => (
          <div className="movie-card" key={movie.id}>
            {movie.poster_path && (
              <img
                src={`${IMAGE_URL}${movie.poster_path}`}
                alt={movie.title}
              />
            )}
            <h2>{movie.title}</h2>
            <p>{movie.overview}</p>
            <span>⭐ {movie.vote_average}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
