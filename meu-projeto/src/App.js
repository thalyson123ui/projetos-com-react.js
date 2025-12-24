import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const getTimeLeft = () => {
    const year = new Date().getFullYear();
    const christmas = new Date(`December 25, ${year} 00:00:00`);
    const now = new Date();
    const diff = christmas - now;

    if (diff <= 0) return null;

    return {
      Dias: Math.floor(diff / (1000 * 60 * 60 * 24)),
      Horas: Math.floor((diff / (1000 * 60 * 60)) % 24),
      Minutos: Math.floor((diff / 1000 / 60) % 60),
      Segundos: Math.floor((diff / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`app ${dark ? "dark" : "light"}`}>
      {/* Neve */}
      <div className="snow"></div>

      {/* Fogos */}
      <div className="fireworks">
        <span></span><span></span><span></span>
      </div>

      {/* Árvore */}
      <div className="tree">
        <div className="star">★</div>
        <div className="layer l1"></div>
        <div className="layer l2"></div>
        <div className="layer l3"></div>
        <div className="trunk"></div>
      </div>

      <h1>🎄 Contagem Regressiva para o Natal</h1>

      {timeLeft ? (
        <div className="countdown">
          {Object.entries(timeLeft).map(([label, value]) => (
            <div className="card" key={label}>
              <span>{value}</span>
              <small>{label}</small>
            </div>
          ))}
        </div>
      ) : (
        <h2>🎅 Feliz Natal!</h2>
      )}

      <div className="controls">
        <button onClick={() => setDark(!dark)}>
          {dark ? "☀️ Modo Claro" : "🌙 Modo Escuro"}
        </button>
      </div>
    </div>
  );
}

export default App;
