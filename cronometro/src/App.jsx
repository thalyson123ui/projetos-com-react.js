import React, { useState, useRef } from "react";
import "./App.css";

export default function App() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const [dark, setDark] = useState(true);

  const intervalRef = useRef(null);

  const start = () => {
    if (!running) {
      setRunning(true);
      intervalRef.current = setInterval(() => {
        setTime(t => t + 10);
      }, 10);
    }
  };

  const pause = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
    setTime(0);
    setLaps([]);
  };

  const addLap = () => {
    if (running) setLaps([...laps, time]);
  };

  const format = (ms) => {
    const m = Math.floor(ms / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    const ms2 = Math.floor((ms % 1000) / 10);
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}:${String(ms2).padStart(2, "0")}`;
  };

  // círculo
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const progress = (time % 60000) / 60000;
  const offset = circumference - progress * circumference;

  return (
    <div className={`app ${dark ? "dark" : "light"}`}>
      <button className="theme" onClick={() => setDark(!dark)}>
        {dark ? "🌙" : "☀️"}
      </button>

      <h1>Cronômetro</h1>

      <div className="circle">
        <svg width="220" height="220">
          <circle
            r={radius}
            cx="110"
            cy="110"
            className="bg"
          />
          <circle
            r={radius}
            cx="110"
            cy="110"
            className="progress"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="time">{format(time)}</div>
      </div>

      <div className="buttons">
        <button onClick={start}>Iniciar</button>
        <button onClick={pause}>Pausar</button>
        <button onClick={reset}>Resetar</button>
        <button onClick={addLap}>Volta</button>
      </div>

      <ul className="laps">
        {laps.map((lap, i) => (
          <li key={i}>Volta {i + 1}: {format(lap)}</li>
        ))}
      </ul>
    </div>
  );
}
