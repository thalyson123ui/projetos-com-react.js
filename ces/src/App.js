import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

// 🔑 SUA CHAVE GNEWS
const API_KEY = 'EE542df283BC5752005e39DD25B0A1D';

const categories = [
  { label: 'Todas', value: 'CES 2026' },
  { label: 'IA', value: 'CES 2026 inteligência artificial' },
  { label: 'Celulares', value: 'CES 2026 smartphones' },
  { label: 'TVs', value: 'CES 2026 TVs' },
  { label: 'Carros', value: 'CES 2026 carros tecnologia' },
  { label: 'Áudio', value: 'CES 2026 fones áudio' },
];

function App() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [query, setQuery] = useState('CES 2026');
  const [search, setSearch] = useState('');
  const [darkMode, setDarkMode] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      darkMode ? 'dark' : 'light'
    );
  }, [darkMode]);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(
      `https://gnews.io/api/v4/search?q=${encodeURIComponent(
        query
      )}&lang=pt&max=12&token=${API_KEY}`
    )
      .then((res) => {
        if (!res.ok) throw new Error('Erro ao carregar notícias');
        return res.json();
      })
      .then((data) => {
        setNews(data.articles || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) setQuery(search);
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* TOPO */}
        <div className="top-bar">
          <img src={logo} className="App-logo" alt="logo" />
          <button
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? '☀️ Claro' : '🌙 Escuro'}
          </button>
        </div>

        <h1>CES 2026</h1>
        <p>Notícias, lançamentos e tendências da maior feira de tecnologia</p>

        {/* BUSCA */}
        <form className="search-box" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Buscar notícias..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">Buscar</button>
        </form>

        {/* FILTROS */}
        <div className="filters">
          {categories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => setQuery(cat.value)}
              className={query === cat.value ? 'active' : ''}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* ESTADOS */}
        {loading && <p>Carregando notícias...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {/* NOTÍCIAS */}
        <div className="news-container">
          {news.map((item, index) => (
            <div className="news-card" key={index}>
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="news-image"
                />
              )}
              <h3>{item.title}</h3>
              <p>{item.description || 'Sem descrição disponível.'}</p>
              <a
                className="App-link"
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ler notícia completa →
              </a>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
