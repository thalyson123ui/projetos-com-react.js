import { useEffect, useState } from 'react';
import './App.css';

/**
 * Rockstar confirmou apenas "2025".
 * Usamos 31/12/2025 como placeholder oficial.
 */
const GTA6_RELEASE_DATE = new Date('2026-11-19T00:00:00');


function getTime() {
  const diff = Math.max(GTA6_RELEASE_DATE - new Date(), 0);

  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff / 3600000) % 24),
    m: Math.floor((diff / 60000) % 60),
    s: Math.floor((diff / 1000) % 60),
  };
}

function FlipUnit({ value, label }) {
  return (
    <div className="flip-unit">
      <div key={value} className="flip-card">
        {String(value).padStart(2, '0')}
      </div>
      <span>{label}</span>
    </div>
  );
}

export default function App() {
  const [time, setTime] = useState(getTime());
  const [flipMode, setFlipMode] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setTime(getTime()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={flipMode ? 'flip-bg' : 'rockstar-bg'}>
      <button className="toggle" onClick={() => setFlipMode(!flipMode)}>
        {flipMode ? 'Tema Rockstar' : 'Flip Clock'}
      </button>

      <h1>GTA VI</h1>
      <h2>Lançamento oficial em 2025</h2>

      {!flipMode && (
        <div className="timer">
          <div><span>{time.d}</span>DIAS</div>
          <div><span>{time.h}</span>HORAS</div>
          <div><span>{time.m}</span>MIN</div>
          <div><span>{time.s}</span>SEG</div>
        </div>
      )}

      {flipMode && (
        <div className="flip-container">
          <FlipUnit value={time.d} label="DIAS" />
          <FlipUnit value={time.h} label="HORAS" />
          <FlipUnit value={time.m} label="MIN" />
          <FlipUnit value={time.s} label="SEG" />
        </div>
      )}
    </div>
  );
}
