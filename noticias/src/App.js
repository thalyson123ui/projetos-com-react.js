import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [news, setNews] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [category, setCategory] = useState("general");
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const API_KEY = "ee542df283bc5752005e39dd25b0a1db";

  const categories = [
    { id: "general", name: "Geral" },
    { id: "technology", name: "Tecnologia" },
    { id: "sports", name: "Esportes" },
    { id: "business", name: "Economia" },
    { id: "science", name: "Ciência" },
    { id: "health", name: "Saúde" },
    { id: "entertainment", name: "Entretenimento" },
  ];

  // Carregar favoritos do LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem("favoritos");
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  // Salvar favoritos no LocalStorage
  useEffect(() => {
    localStorage.setItem("favoritos", JSON.stringify(favorites));
  }, [favorites]);

  // Buscar notícias por categoria
  useEffect(() => {
    fetch(
      `https://gnews.io/api/v4/top-headlines?category=${category}&lang=pt&country=br&apikey=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => setNews(data.articles))
      .catch((err) => console.error(err));
  }, [category]);

  // Buscar notícias por texto
  const handleSearch = () => {
    if (search.trim() === "") return;

    fetch(
      `https://gnews.io/api/v4/search?q=${search}&lang=pt&country=br&apikey=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => setNews(data.articles))
      .catch((err) => console.error(err));
  };

  // Adicionar ou remover favoritos
  const toggleFavorite = (item) => {
    const exists = favorites.find((fav) => fav.url === item.url);

    if (exists) {
      setFavorites(favorites.filter((fav) => fav.url !== item.url));
    } else {
      setFavorites([...favorites, item]);
    }
  };

  return (
    <div className={darkMode ? "App dark" : "App"}>
      {/* MENU LATERAL */}
      <div className={sidebarOpen ? "sidebar open" : "sidebar"}>
        <h2>Categorias</h2>
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={category === cat.id ? "active" : ""}
            onClick={() => {
              setCategory(cat.id);
              setSidebarOpen(false);
            }}
          >
            {cat.name}
          </button>
        ))}

        <h2>Favoritos ⭐</h2>
        {favorites.length === 0 && <p>Nenhum favorito ainda.</p>}
        {favorites.map((fav, index) => (
          <div key={index} className="fav-item">
            <p>{fav.title}</p>
            <a href={fav.url} target="_blank" rel="noreferrer">
              Ler →
            </a>
          </div>
        ))}
      </div>

      {/* BOTÃO DO MENU */}
      <button className="menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
        ☰
      </button>

      <header>
        <h1>📰 Portal de Notícias</h1>

        <button className="dark-btn" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </header>

      {/* Barra de busca */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Buscar notícias..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>

      {/* Lista de notícias */}
      <section className="news-list">
        {news.length === 0 && <p>Nenhuma notícia encontrada.</p>}

        {news.map((item, index) => (
          <div key={index} className="card fade-in">
            <h3>{item.title}</h3>
            {item.image && <img src={item.image} alt="imagem da notícia" />}
            <p>{item.description}</p>

            <div className="card-footer">
              <a href={item.url} target="_blank" rel="noreferrer">
                Ler mais →
              </a>

              <button
                className="fav-btn"
                onClick={() => toggleFavorite(item)}
              >
                {favorites.find((fav) => fav.url === item.url)
                  ? "★"
                  : "☆"}
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default App;