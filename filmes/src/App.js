// src/App.js
import { useEffect, useState } from "react";
import "./App.css";

const API_KEY = "91ec9ea6fde16094ade18949431a8b82";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState("dark");
  const [genre, setGenre] = useState("");

  // Atualiza tema
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Carrega filmes populares
  useEffect(() => {
    fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR`)
      .then((res) => res.json())
      .then((data) => setMovies(data.results || []))
      .catch(() => setMovies([]));
  }, []);

  // Pesquisa por título
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

  // Filtro por gênero
  const handleGenreFilter = (genreId) => {
    setGenre(genreId);
    if (!genreId) return; // se não escolher nada, não faz busca

    fetch(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=pt-BR&with_genres=${genreId}`
    )
      .then((res) => res.json())
      .then((data) => setMovies(data.results || []))
      .catch(() => setMovies([]));
  };

  return (
    <div className="App">
      <h1>🎬 App de Filmes</h1>

      {/* Botão de tema */}
      <button className="theme-btn" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        Alternar para {theme === "dark" ? "🌞 Claro" : "🌙 Escuro"}
      </button>

      {/* Formulário de busca */}
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Buscar filme..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" className="search-btn">🔍 Buscar</button>
      </form>

      {/* Dropdown de gêneros */}
      <div className="filters">
        <select
          value={genre}
          onChange={(e) => handleGenreFilter(e.target.value)}
          className="genre-select"
        >
          <option value="">Filtrar por gênero...</option>
          <option value="28">🎯 Ação</option>
          <option value="35">😂 Comédia</option>
          <option value="18">🎭 Drama</option>
          <option value="27">👻 Terror</option>
          <option value="10749">❤️ Romance</option>
          <option value="16">🎨 Animação</option>
          <option value="878">🚀 Ficção Científica</option>
        </select>
      </div>

      {/* Grid de filmes */}
      <div className="movie-grid">
        {movies.length === 0 ? (
          <p>Nenhum filme encontrado.</p>
        ) : (
          movies.map((movie) => (
            <div className="movie-card" key={movie.id}>
              {movie.poster_path ? (
                <img
                  src={`${IMAGE_URL}${movie.poster_path}`}
                  alt={movie.title}
                />
              ) : (
                <div className="no-image">Sem imagem</div>
              )}

              <h3>{movie.title}</h3>
              <p>
                {movie.overview
                  ? movie.overview.slice(0, 120) + "..."
                  : "Sem descrição disponível."}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}