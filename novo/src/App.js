import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const calcularTempo = () => {
    const agora = new Date();
    const anoNovo = new Date(agora.getFullYear() + 1, 0, 1);
    const diferenca = anoNovo - agora;

    if (diferenca <= 0) {
      return { dias: 0, horas: 0, minutos: 0, segundos: 0 };
    }

    return {
      dias: Math.floor(diferenca / (1000 * 60 * 60 * 24)),
      horas: Math.floor((diferenca / (1000 * 60 * 60)) % 24),
      minutos: Math.floor((diferenca / (1000 * 60)) % 60),
      segundos: Math.floor((diferenca / 1000) % 60)
    };
  };

  const [tempo, setTempo] = useState(calcularTempo());
  const [dark, setDark] = useState(true);
  const [felizAnoNovo, setFelizAnoNovo] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const novoTempo = calcularTempo();
      setTempo(novoTempo);

      if (
        novoTempo.dias === 0 &&
        novoTempo.horas === 0 &&
        novoTempo.minutos === 0 &&
        novoTempo.segundos === 0
      ) {
        setFelizAnoNovo(true);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`App ${dark ? 'dark' : 'light'}`}>
      <header className="App-header">
        <button className="toggle" onClick={() => setDark(!dark)}>
          {dark ? '☀️ Modo Claro' : '🌙 Modo Escuro'}
        </button>

        <img src={logo} className="App-logo" alt="logo" />

        {!felizAnoNovo ? (
          <>
            <h1>🎆 Contagem Regressiva 🎆</h1>
            <div className="countdown">
              <div><span>{tempo.dias}</span><small>Dias</small></div>
              <div><span>{tempo.horas}</span><small>Horas</small></div>
              <div><span>{tempo.minutos}</span><small>Minutos</small></div>
              <div><span>{tempo.segundos}</span><small>Segundos</small></div>
            </div>
          </>
        ) : (
          <>
            <h1 className="ano-novo">🎉 FELIZ ANO NOVO! 🎉</h1>
            <div className="fogos">
              <span></span><span></span><span></span>
              <span></span><span></span><span></span>
            </div>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
