import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [platform, setPlatform] = useState("");
  const [genresList, setGenresList] = useState([]);
  const [platformsList, setPlatformsList] = useState([]);

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  const API_KEY = "12554e2749ab423baaeee1077f0e3d20";

  // Aplicar tema no body
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Carregar lista de gêneros e plataformas
  useEffect(() => {
    fetch(`https://api.rawg.io/api/genres?key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setGenresList(data.results));

    fetch(`https://api.rawg.io/api/platforms?key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setPlatformsList(data.results));
  }, []);

  // Carregar jogos com filtros
  useEffect(() => {
    let url = `https://api.rawg.io/api/games?key=${API_KEY}`;

    if (search) url += `&search=${search}`;
    if (genre) url += `&genres=${genre}`;
    if (platform) url += `&platforms=${platform}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setGames(data.results));
  }, [search, genre, platform]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>🎮 Catálogo de Jogos</h1>

        {/* Botão de tema */}
        <button
          className="theme-btn"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? "🌞 Tema Claro" : "🌙 Tema Escuro"}
        </button>
      </header>

      {/* Barra de busca e filtros */}
      <div className="filters">
        <input
          type="text"
          placeholder="Buscar jogo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select onChange={(e) => setGenre(e.target.value)}>
          <option value="">Todos os gêneros</option>
          {genresList.map((g) => (
            <option key={g.id} value={g.slug}>
              {g.name}
            </option>
          ))}
        </select>

        <select onChange={(e) => setPlatform(e.target.value)}>
          <option value="">Todas as plataformas</option>
          {platformsList.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      {/* Lista de jogos */}
      <div className="game-list">
        {games.map((game) => (
          <div key={game.id} className="game-card">
            <img src={game.background_image} alt={game.name} />
            <h3>{game.name}</h3>
            <p>Lançamento: {game.released}</p>
            <p>⭐ {game.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;