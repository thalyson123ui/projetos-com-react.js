import React, { useState, useEffect } from 'react';
import './App.css';

const WORDS = [
  'PROGRAMAR', 'JAVASCRIPT', 'REACT', 'COMPONENTE', 'ESTADO',
  'PROPRIEDADE', 'FUNCAO', 'VARIAVEL', 'SISTEMA', 'DESENVOLVER'
];

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const MAX_WRONG = 6;

function drawParts(wrong) {
  // retorna elementos SVG conforme o número de erros
  const parts = [];
  if (wrong > 0) parts.push(<line key="head" x1="60" y1="40" x2="60" y2="40" />); // placeholder para cabeça
  // vamos desenhar de forma simples usando círculos/linhas incrementais
  return (
    <svg width="140" height="200" viewBox="0 0 140 200" >
      {/* base */}
      <line x1="10" y1="190" x2="130" y2="190" stroke="#000" strokeWidth="4" />
      {/* mastro */}
      <line x1="30" y1="190" x2="30" y2="20" stroke="#000" strokeWidth="4" />
      <line x1="30" y1="20" x2="90" y2="20" stroke="#000" strokeWidth="4" />
      <line x1="90" y1="20" x2="90" y2="40" stroke="#000" strokeWidth="4" />
      {/* partes do corpo conforme errors */}
      {wrong > 0 && <circle cx="90" cy="55" r="12" stroke="#000" strokeWidth="3" fill="none" />}
      {wrong > 1 && <line x1="90" y1="67" x2="90" y2="110" stroke="#000" strokeWidth="3" />}
      {wrong > 2 && <line x1="90" y1="80" x2="70" y2="95" stroke="#000" strokeWidth="3" />}
      {wrong > 3 && <line x1="90" y1="80" x2="110" y2="95" stroke="#000" strokeWidth="3" />}
      {wrong > 4 && <line x1="90" y1="110" x2="75" y2="145" stroke="#000" strokeWidth="3" />}
      {wrong > 5 && <line x1="90" y1="110" x2="105" y2="145" stroke="#000" strokeWidth="3" />}
    </svg>
  );
}

function App() {
  const [word, setWord] = useState('');
  const [guessed, setGuessed] = useState(new Set());
  const [wrong, setWrong] = useState(0);
  const [status, setStatus] = useState('PLAYING'); // PLAYING, WON, LOST

  useEffect(() => {
    startNewGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function pickWord() {
    const idx = Math.floor(Math.random() * WORDS.length);
    return WORDS[idx];
  }

  function startNewGame() {
    setWord(pickWord());
    setGuessed(new Set());
    setWrong(0);
    setStatus('PLAYING');
  }

  function handleGuess(letter) {
    if (status !== 'PLAYING') return;
    if (guessed.has(letter)) return;
    const next = new Set(guessed);
    next.add(letter);
    setGuessed(next);

    if (!word.includes(letter)) {
      const nw = wrong + 1;
      setWrong(nw);
      if (nw >= MAX_WRONG) {
        setStatus('LOST');
      }
    } else {
      // verificar vitória
      const allGuessed = word.split('').every(ch => next.has(ch));
      if (allGuessed) setStatus('WON');
    }
  }

  function displayWord() {
    return word.split('').map((ch, i) => (
      <span key={i} className="letter">
        {guessed.has(ch) || status === 'LOST' ? ch : '_'}
      </span>
    ));
  }

  return (
    <div className="App" style={{ fontFamily: 'Arial, sans-serif', padding: 20 }}>
      <h1>Jogo da Forca</h1>
      <div style={{ display: 'flex', gap: 20 }}>
        <div>
          {drawParts(wrong)}
          <div style={{ marginTop: 10 }}>
            Erros: {wrong} / {MAX_WRONG}
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 28, letterSpacing: 6, marginBottom: 12 }}>
            {displayWord()}
          </div>

          <div style={{ marginBottom: 12 }}>
            {ALPHABET.map(letter => {
              const disabled = guessed.has(letter) || status !== 'PLAYING';
              return (
                <button
                  key={letter}
                  onClick={() => handleGuess(letter)}
                  disabled={disabled}
                  style={{
                    margin: 4,
                    width: 36,
                    height: 36,
                    cursor: disabled ? 'not-allowed' : 'pointer'
                  }}
                >
                  {letter}
                </button>
              );
            })}
          </div>

          <div style={{ marginTop: 10 }}>
            {status === 'WON' && <div style={{ color: 'green' }}>Você venceu! 🎉</div>}
            {status === 'LOST' && <div style={{ color: 'red' }}>Você perdeu. Palavra: {word}</div>}
          </div>

          <div style={{ marginTop: 12 }}>
            <button onClick={startNewGame}>Reiniciar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;