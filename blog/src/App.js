// src/App.js
import { useState, useEffect } from "react";
import "./App.css";

/*
  NOTE: interactions are persisted in localStorage under key "gameNewsInteractions".
  This file implements: likes (toggle + count), comments (per-news), share (navigator.share or copy).
*/

/* ---------- NewsCard ---------- */
function NewsCard({ news, onClick, likes }) {
  return (
    <div className="news-card" onClick={onClick}>
      <div className="news-image-wrapper">
        <img src={news.image} alt={news.title} className="news-image" />
      </div>
      <span className="news-category">{news.category}</span>
      <h2 className="news-title">{news.title}</h2>
      <p className="news-description">{news.description}</p>
      <div className="card-meta">
        <div className="likes-preview">❤️ {likes}</div>
      </div>
    </div>
  );
}

/* ---------- ModalNews (like/comment/share) ---------- */
function ModalNews({
  news,
  interactions,
  onClose,
  onToggleLike,
  onAddComment,
  onShare,
}) {
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    setCommentText("");
  }, [news]);

  if (!news) return null;

  const it = interactions[news.id] || { likes: 0, liked: false, comments: [] };

  function handleSubmitComment(e) {
    e.preventDefault();
    const text = commentText.trim();
    if (!text) return alert("Escreva algo antes de comentar.");
    onAddComment(news.id, text);
    setCommentText("");
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-top">
          <img src={news.image} alt={news.title} className="modal-image" />
          <div className="modal-head">
            <h2 className="modal-title">{news.title}</h2>
            <div className="modal-category">{news.category}</div>
            <p className="modal-text">{news.fullText}</p>

            <div className="modal-actions">
              <button
                className={`like-btn ${it.liked ? "liked" : ""}`}
                onClick={() => onToggleLike(news.id)}
              >
                {it.liked ? "💖 Curtido" : "🤍 Curtir"} <span>{it.likes}</span>
              </button>

              <button
                className="share-btn"
                onClick={() => onShare(news)}
                title="Compartilhar notícia"
              >
                🔗 Compartilhar
              </button>

              <button className="close-inline" onClick={onClose}>
                ✖ Fechar
              </button>
            </div>
          </div>
        </div>

        <hr />

        <section className="comments-section">
          <h3>Comentários ({it.comments.length})</h3>

          <form className="comment-form" onSubmit={handleSubmitComment}>
            <input
              className="comment-input"
              placeholder="Escreva um comentário..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button className="comment-submit" type="submit">
              Enviar
            </button>
          </form>

          <div className="comments-list">
            {it.comments.length === 0 && (
              <p className="no-comments">Seja o primeiro a comentar!</p>
            )}
            {it.comments
              .slice()
              .reverse()
              .map((c) => (
                <div className="comment-item" key={c.id}>
                  <div className="comment-meta">
                    <strong>Você</strong>
                    <span className="comment-date">
                      {new Date(c.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <div className="comment-body">{c.text}</div>
                </div>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}

/* ---------- Main App ---------- */
function App() {
  const [selectedNews, setSelectedNews] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todas");
  const [interactions, setInteractions] = useState({});
  const storageKey = "gameNewsInteractions_v1";

  const newsList = [
    {
      id: "gta6",
      title: "GTA 6 ganha novo trailer",
      category: "Ação",
      image:
        "https://cdn.mos.cms.futurecdn.net/Z5pTKtyfPBkO5RAwOB1p5C.jpg",
      description: "Rockstar libera mais detalhes do game.",
      fullText:
        "A Rockstar revelou um novo trailer de GTA 6 com gráficos impressionantes e foco nos personagens principais. O trailer mostra novidades na jogabilidade, mapa maior e melhorias em física e direção."
    },
    {
      id: "witcher4",
      title: "The Witcher 4 é confirmado",
      category: "RPG",
      image:
        "https://cdn.mos.cms.futurecdn.net/nLZDtLMXqN8j0S9IjPk8mF.jpg",
      description: "Novo jogo está oficialmente em desenvolvimento.",
      fullText:
        "A CD Projekt Red confirmou que The Witcher 4 está em produção com a nova engine Unreal Engine 5, prometendo ambientes mais ricos e interações avançadas."
    },
    {
      id: "nintendo-next",
      title: "Novo console da Nintendo",
      category: "Hardware",
      image:
        "https://www.gamespot.com/a/uploads/scale_medium/1577/15776376/4187844-switchprothumbnail.jpg",
      description: "Híbrido promete gráficos melhores.",
      fullText:
        "A Nintendo anunciou um console híbrido com foco em desempenho 4K, melhorias de bateria e uma biblioteca retrocompatível com jogos anteriores."
    },
    {
      id: "cyberpunk-dlc",
      title: "Cyberpunk 2077 ganha nova DLC",
      category: "RPG",
      image:
        "https://cdn.mos.cms.futurecdn.net/ydW29P0fGzH1T1p1TGVtEH.jpg",
      description: "DLC expande Night City.",
      fullText:
        "A nova DLC adiciona áreas inéditas, missões secundárias e um arco narrativo que continua a história dos protagonistas."
    },
    {
      id: "fortnite-medieval",
      title: "Fortnite lança temporada medieval",
      category: "Battle Royale",
      image:
        "https://cdn2.unrealengine.com/fortnite-chapter5-3840x2160-e0a9e3a64455.jpg",
      description: "Temática medieval chega ao jogo.",
      fullText:
        "A Epic Games trouxe uma temporada com dragões, eventos temáticos e novas mecânicas de combate corpo-a-corpo."
    },
    {
      id: "gow-update",
      title: "God of War ganha update gráfico",
      category: "Ação",
      image:
        "https://cdn.mos.cms.futurecdn.net/nQH2m3ENcy9XUG6uHgnvch.jpg",
      description: "Melhorias de FPS e nitidez.",
      fullText:
        "Atualização traz melhorias de desempenho, opções gráficas e correções de estabilidade para consoles e PC."
    }
  ];

  /* load interactions from localStorage and ensure each news has an entry */
  useEffect(() => {
    const raw = localStorage.getItem(storageKey);
    let data = {};
    try {
      if (raw) data = JSON.parse(raw) || {};
    } catch (err) {
      data = {};
    }

    // initialize missing entries
    const init = { ...data };
    newsList.forEach((n) => {
      if (!init[n.id]) {
        init[n.id] = { likes: 0, liked: false, comments: [] };
      }
    });

    setInteractions(init);
  }, []); // eslint-disable-line

  /* persist interactions whenever change */
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(interactions));
  }, [interactions]);

  function toggleLike(id) {
    setInteractions((prev) => {
      const curr = prev[id] || { likes: 0, liked: false, comments: [] };
      const next = {
        ...prev,
        [id]: {
          ...curr,
          liked: !curr.liked,
          likes: curr.liked ? Math.max(0, curr.likes - 1) : curr.likes + 1,
        },
      };
      return next;
    });
  }

  function addComment(id, text) {
    setInteractions((prev) => {
      const curr = prev[id] || { likes: 0, liked: false, comments: [] };
      const comment = {
        id: `${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
        text,
        createdAt: Date.now(),
      };
      const next = {
        ...prev,
        [id]: { ...curr, comments: [...curr.comments, comment] },
      };
      return next;
    });
    // small UX cue
    setTimeout(() => {
      const elem = document.querySelector(".comments-list");
      if (elem) elem.scrollTop = elem.scrollHeight;
    }, 50);
  }

  async function handleShare(news) {
    const url = `${window.location.origin}#news-${news.id}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: news.title,
          text: news.description,
          url,
        });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        alert("Link copiado para a área de transferência!");
      } else {
        // fallback: create temporary input
        const tmp = document.createElement("input");
        tmp.value = url;
        document.body.appendChild(tmp);
        tmp.select();
        document.execCommand("copy");
        tmp.remove();
        alert("Link copiado!");
      }
    } catch (err) {
      alert("Não foi possível compartilhar: " + (err.message || err));
    }
  }

  const filtered = newsList.filter(
    (news) =>
      (category === "Todas" || news.category === category) &&
      (news.title.toLowerCase().includes(search.toLowerCase()) ||
        news.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="App">
      <header className="header">
        <h1 className="logo">GameNews 🔥</h1>

        <input
          type="text"
          className="search-bar"
          placeholder="Buscar notícias..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="category-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Todas</option>
          <option>Ação</option>
          <option>RPG</option>
          <option>Hardware</option>
          <option>Battle Royale</option>
        </select>
      </header>

      <main className="news-grid">
        {filtered.map((news) => (
          <NewsCard
            key={news.id}
            news={news}
            onClick={() => setSelectedNews(news)}
            likes={(interactions[news.id] && interactions[news.id].likes) || 0}
          />
        ))}
      </main>

      <ModalNews
        news={selectedNews}
        interactions={interactions}
        onClose={() => setSelectedNews(null)}
        onToggleLike={toggleLike}
        onAddComment={addComment}
        onShare={handleShare}
      />
    </div>
  );
}

export default App;
