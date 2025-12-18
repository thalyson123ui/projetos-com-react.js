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

  // Atualiza o atributo data-theme no <html>
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Carrega filmes populares ao iniciar
  useEffect(() => {
    fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR`)
      .then((res) => res.json())
      .then((data) => setMovies(data.results || []))
      .catch(() => setMovies([]));
  }, []);

  // Função de pesquisa
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

      {/* Formulário de busca */}
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Buscar filme..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">🔍 Buscar</button>
      </form>

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