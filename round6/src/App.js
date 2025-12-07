import './App.css';
import { useState } from 'react';

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  const games = [
    { name: 'Red Light, Green Light', description: 'O jogo clássico com um preço mortal' },
    { name: 'Honeycomb', description: 'Corte a forma sem quebrar o doce' },
    { name: 'Tug of War', description: 'Uma luta de cordas pelo direito de viver' },
    { name: 'Marbles', description: 'Um jogo infantil, mas com consequências fatais' },
    { name: 'Glass Bridge', description: 'Escolha o caminho certo ou caia' },
    { name: 'Squid Game', description: 'O jogo final' }
  ];

  return (
    <div className="App">
      <header className="App-header">
        <h1>🎮 ROUND 6: SQUID GAME 🎮</h1>
        <p className="subtitle">Bem-vindo ao jogo da sua vida</p>
      </header>

      <main className="App-main">
        <section className="intro">
          <h2>Os Jogos</h2>
          <div className="games-grid">
            {games.map((game, index) => (
              <div key={index} className="game-card">
                <h3>{game.name}</h3>
                <p>{game.description}</p>
              </div>
            ))}
          </div>
        </section>

        <button 
          className={`start-button ${gameStarted ? 'active' : ''}`}
          onClick={() => setGameStarted(!gameStarted)}
        >
          {gameStarted ? 'Você está participando!' : 'Participar do Jogo'}
        </button>
      </main>
    </div>
  );
}

export default App;