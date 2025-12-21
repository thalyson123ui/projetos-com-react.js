import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [brasilNews, setBrasilNews] = useState([]);
  const [worldNews, setWorldNews] = useState([]);

  const API_KEY = "ee542df283bc5752005e39dd25b0a1db";

  useEffect(() => {
    // Notícias do Brasil
    fetch(`https://gnews.io/api/v4/top-headlines?country=br&lang=pt&apikey=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setBrasilNews(data.articles))
      .catch((err) => console.error(err));

    // Notícias do Mundo
    fetch(`https://gnews.io/api/v4/top-headlines?lang=en&apikey=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setWorldNews(data.articles))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="App">
      <h1>📰 Portal de Notícias</h1>

      <section>
        <h2>🇧🇷 Notícias do Brasil</h2>
        {brasilNews.map((news, index) => (
          <div key={index} className="card">
            <h3>{news.title}</h3>
            {news.image && <img src={news.image} alt="imagem da notícia" />}
            <p>{news.description}</p>
            <a href={news.url} target="_blank" rel="noreferrer">
              Ler mais
            </a>
          </div>
        ))}
      </section>

      <section>
        <h2>🌍 Notícias do Mundo</h2>
        {worldNews.map((news, index) => (
          <div key={index} className="card">
            <h3>{news.title}</h3>
            {news.image && <img src={news.image} alt="imagem da notícia" />}
            <p>{news.description}</p>
            <a href={news.url} target="_blank" rel="noreferrer">
              Ler mais
            </a>
          </div>
        ))}
      </section>
    </div>
  );
}

export default App;