import React, { useState } from "react";
import "./App.css";

const emojiList = [
  { symbol: "😀", name: "Sorriso" },
  { symbol: "😂", name: "Rindo" },
  { symbol: "😍", name: "Apaixonado" },
  { symbol: "😎", name: "Descolado" },
  { symbol: "🤔", name: "Pensando" },
  { symbol: "😭", name: "Chorando" },
  { symbol: "😡", name: "Bravo" },
  { symbol: "🥳", name: "Festa" },
  { symbol: "🚀", name: "Foguete" },
  { symbol: "❤️", name: "Coração" }
];

function App() {
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState("");

  const filteredEmojis = emojiList.filter(emoji =>
    emoji.name.toLowerCase().includes(search.toLowerCase())
  );

  const copyEmoji = (emoji) => {
    navigator.clipboard.writeText(emoji);
    setCopied(emoji);

    setTimeout(() => {
      setCopied("");
    }, 1500);
  };

  return (
    <div className="container">
      <h1>😄 Galeria de Emojis</h1>

      <input
        type="text"
        placeholder="Buscar emoji..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search"
      />

      <div className="emoji-grid">
        {filteredEmojis.map((emoji, index) => (
          <div
            key={index}
            className="emoji-card"
            onClick={() => copyEmoji(emoji.symbol)}
          >
            <span className="emoji">{emoji.symbol}</span>
            <span className="name">{emoji.name}</span>

            {copied === emoji.symbol && (
              <span className="copied">Copiado! 📋</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
