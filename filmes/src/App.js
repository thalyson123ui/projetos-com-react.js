// src/App.js
import { useEffect, useState } from "react";
import "./App.css";

const API_KEY = "91ec9ea6fde16094ade18949431a8b82";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState("dark"); // 👈 novo estado para tema

  // Atualiza o atributo data-theme no <html>
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR`)
      .then((res) => res.json())
      .then((data) => setMovies(data.results || []))
      .catch(() => setMovies([]));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=pt-BR&query=${search}`
    )
      .then((res) => res.json())
      .then((data) => setMovies(data.results || []))
      .catch(() => setMovies([]));

    setSearch("");
  };

  return (
    <div className="App">
      <h1>🎬 App de Filmes</h1>

      {/* Botão para alternar tema */}
      <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        Alternar para {theme === "dark" ? "🌞 Claro" : "🌙 Escuro"}
      </button>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Buscar filme..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>

      <div className="movie-grid">
        {movies.map((movie) => (
          <div className="movie-card" key={movie.id}>
            {movie.poster_path ? (
              <img
                src={`${IMAGE_URL}${movie.poster_path}`}
                alt={movie.title}
              />
            ) : (
              <div className="no-image">Sem imagem</div>
            )}

            <p>
              {movie.overview
                ? movie.overview.slice(0, 120) + "..."
                : "Sem descrição disponível."}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}