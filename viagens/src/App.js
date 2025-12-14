// src/App.js
import React from 'react';
import './App.css';
import logo from './logo.svg';

/**
 * Card de Destino
 */
function DestinationCard({ title, location, price, imageUrl }) {
  return (
    <div className="destination-card">
      <div className="image-wrapper">
        <img src={imageUrl} alt={title} />
        <span className="price-badge">R$ {price}</span>
      </div>

      <div className="card-info">
        <h3>{title}</h3>
        <p className="location">📍 {location}</p>
        <button className="book-button">Ver Detalhes</button>
      </div>
    </div>
  );
}

function App() {
  const destinations = [
    {
      id: 1,
      title: 'Praias Paradisíacas',
      location: 'Maldivas',
      price: '4.500',
      imageUrl:
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    },
    {
      id: 2,
      title: 'Aventura na Montanha',
      location: 'Alpes Suíços',
      price: '3.200',
      imageUrl:
        'https://images.unsplash.com/photo-1501785888041-af3ef285b470',
    },
    {
      id: 3,
      title: 'História e Cultura',
      location: 'Roma, Itália',
      price: '2.800',
      imageUrl:
        'https://images.unsplash.com/photo-1526481280691-9065c9d3b1b3',
    },
  ];

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="Logo" className="App-logo" />
        <h1>🌎 Seu Site de Viagens</h1>
        <nav>
          <a href="#home">Início</a>
          <a href="#destinos">Destinos</a>
          <a href="#ofertas">Ofertas</a>
          <a href="#contato">Contato</a>
        </nav>
      </header>

      <main className="App-main">
        <h2>✨ Ofertas em Destaque</h2>
        <div className="destination-list">
          {destinations.map((dest) => (
            <DestinationCard key={dest.id} {...dest} />
          ))}
        </div>
      </main>

      <footer className="App-footer">
        <p>
          &copy; {new Date().getFullYear()} Seu Site de Viagens — Todos os direitos
          reservados
        </p>
      </footer>
    </div>
  );
}

export default App;
