// src/App.js

import { useState, useEffect } from 'react';
import './App.css';

function NewsCard({ title, image, description, category, onClick }) {
  return (
    <div className="news-card" onClick={onClick}>
      <div className="news-image-wrapper">
        <img src={image} alt={title} className="news-image" />
      </div>
      <span className="news-category">{category}</span>
      <h2 className="news-title">{title}</h2>
      <p className="news-description">{description}</p>
    </div>
  );
}

function ModalNews({ news, onClose }) {
  if (!news) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <img src={news.image} alt={news.title} className="modal-image" />
        <h2 className="modal-title">{news.title}</h2>
        <p className="modal-category">{news.category}</p>
        <p className="modal-text">{news.fullText}</p>

        <button className="close-btn" onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
}

function App() {
  const [selectedNews, setSelectedNews] = useState(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState("Todas");
  const [theme, setTheme] = useState("dark");

  // Salvar tema no localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setTheme(savedTheme);
  }, []);

  // Aplicar tema no BODY
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const newsList = [
    {
      title: "GTA 6 ganha novo trailer",
      category: "Ação",
      image: "https://cdn.mos.cms.futurecdn.net/Z5pTKtyfPBkO5RAwOB1p5C.jpg",
      description: "Rockstar libera mais detalhes do game.",
      fullText: "A Rockstar revelou um novo trailer de GTA 6 com gráficos impressionantes..."
    },
    {
      title: "The Witcher 4 é confirmado",
      category: "RPG",
      image: "https://cdn.mos.cms.futurecdn.net/nLZDtLMXqN8j0S9IjPk8mF.jpg",
      description: "Novo jogo está oficialmente em desenvolvimento.",
      fullText: "A CD Projekt Red confirmou que The Witcher 4 está em produção..."
    },
    {
      title: "Novo console da Nintendo",
      category: "Hardware",
      image: "https://www.gamespot.com/a/uploads/scale_medium/1577/15776376/4187844-switchprothumbnail.jpg",
      description: "Híbrido promete gráficos melhores.",
      fullText: "A Nintendo anunciou um console com 4K, DLSS e retrocompatibilidade..."
    },
    {
      title: "Cyberpunk 2077 ganha nova DLC",
      category: "RPG",
      image: "https://cdn.mos.cms.futurecdn.net/ydW29P0fGzH1T1p1TGVtEH.jpg",
      description: "DLC expande Night City.",
      fullText: "A nova DLC adiciona áreas inéditas, armas e um arco narrativo completo..."
    },
    {
      title: "Fortnite lança temporada medieval",
      category: "Battle Royale",
      image: "https://cdn2.unrealengine.com/fortnite-chapter5-3840x2160-e0a9e3a64455.jpg",
      description: "Temática medieval chega ao jogo.",
      fullText: "Uma temporada cheia de magia, dragões, espadas e novos eventos..."
    },
    {
      title: "God of War ganha update gráfico",
      category: "Ação",
      image: "https://cdn.mos.cms.futurecdn.net/nQH2m3ENcy9XUG6uHgnvch.jpg",
      description: "Melhorias de FPS e nitidez.",
      fullText: "O update melhora iluminação, FPS e traz efeitos revisados..."
    }
  ];

  const filteredNews = newsList.filter(news =>
    (category === "Todas" || news.category === category) &&
    (news.title.toLowerCase().includes(search.toLowerCase()) ||
      news.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="App">
      
      {/* HEADER */}
      <header className="header">
        <h1 className="logo">GameNews 🔥</h1>

        <input
          type="text"
          className="search-bar"
          placeholder="Buscar notícias..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select
          className="category-select"
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          <option>Todas</option>
          <option>Ação</option>
          <option>RPG</option>
          <option>Hardware</option>
          <option>Battle Royale</option>
        </select>

        {/* BOTÃO DARK/LIGHT MODE */}
        <button
          className="theme-btn"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? "🌞 Claro" : "🌙 Escuro"}
        </button>
      </header>

      {/* GRID */}
      <main className="news-grid">
        {filteredNews.map((news, index) => (
          <NewsCard
            key={index}
            title={news.title}
            image={news.image}
            description={news.description}
            category={news.category}
            onClick={() => setSelectedNews(news)}
          />
        ))}
      </main>

      <ModalNews news={selectedNews} onClose={() => setSelectedNews(null)} />
    </div>
  );
}

export default App;
