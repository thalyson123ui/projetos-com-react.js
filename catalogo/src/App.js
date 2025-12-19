import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [releasedGames, setReleasedGames] = useState([]);
  const [upcomingGames, setUpcomingGames] = useState([]);

  const API_KEY = "YOUR_API_KEY_HERE";

  useEffect(() => {
    // Jogos já lançados
    fetch(`https://api.rawg.io/api/games?dates=2020-01-01,2025-12-31&ordering=-released&key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setReleasedGames(data.results));

    // Jogos que ainda vão lançar
    fetch(`https://api.rawg.io/api/games?dates=2025-12-20,2026-12-31&ordering=released&key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setUpcomingGames(data.results));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>🎮 Catálogo de Jogos</h1>
      </header>

      <section>
        <h2>✅ Jogos Já Lançados</h2>
        <div className="game-list">
          {releasedGames.map((game) => (
            <div key={game.id} className="game-card">
              <img src={game.background_image} alt={game.name} />
              <h3>{game.name}</h3>
              <p>Lançamento: {game.released}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>🚀 Jogos que Ainda Vão Lançar</h2>
        <div className="game-list">
          {upcomingGames.map((game) => (
            <div key={game.id} className="game-card">
              <img src={game.background_image} alt={game.name} />
              <h3>{game.name}</h3>
              <p>Data prevista: {game.released}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;