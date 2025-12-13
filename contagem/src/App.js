import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

const GTA6_RELEASE_DATE = new Date('2025-12-31T00:00:00');

function getTimeRemaining(targetDate) {
  const total = targetDate - new Date();

  if (total <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / 1000 / 60 / 60) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return { days, hours, minutes, seconds };
}

function App() {
  const [timeLeft, setTimeLeft] = useState(
    getTimeRemaining(GTA6_RELEASE_DATE)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining(GTA6_RELEASE_DATE));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <h1>⏳ Contagem Regressiva para GTA 6</h1>

        <div style={{ fontSize: '1.5rem', marginTop: '1rem' }}>
          <p>{timeLeft.days} dias</p>
          <p>{timeLeft.hours} horas</p>
          <p>{timeLeft.minutes} minutos</p>
          <p>{timeLeft.seconds} segundos</p>
        </div>
      </header>
    </div>
  );
}

export default App;
