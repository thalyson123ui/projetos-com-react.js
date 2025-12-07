// ...existing code...
import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function randomFrom(str) {
  return str[Math.floor(Math.random() * str.length)];
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function passwordStrength(length, setsCount) {
  const score = Math.min(4, Math.floor(length / 6) + setsCount - 1);
  switch (score) {
    case 0: return 'Muito fraca';
    case 1: return 'Fraca';
    case 2: return 'Média';
    case 3: return 'Forte';
    default: return 'Muito forte';
  }
}

function App() {
  const [length, setLength] = useState(12);
  const [useLower, setUseLower] = useState(true);
  const [useUpper, setUseUpper] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()-_=+[]{};:,.<>/?';

  function generate() {
    let charPool = '';
    const required = [];

    if (useLower) { charPool += lower; required.push(randomFrom(lower)); }
    if (useUpper) { charPool += upper; required.push(randomFrom(upper)); }
    if (useNumbers) { charPool += numbers; required.push(randomFrom(numbers)); }
    if (useSymbols) { charPool += symbols; required.push(randomFrom(symbols)); }

    if (!charPool) {
      setPassword('');
      return;
    }

    const remainingLength = Math.max(0, length - required.length);
    const result = [...required];

    for (let i = 0; i < remainingLength; i++) {
      result.push(randomFrom(charPool));
    }

    setPassword(shuffleArray(result).join(''));
    setCopied(false);
  }

  async function copyToClipboard() {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // fallback
      const el = document.createElement('textarea');
      el.value = password;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  }

  const setsCount = [useLower, useUpper, useNumbers, useSymbols].filter(Boolean).length;
  const strength = password ? passwordStrength(length, setsCount) : '';

  return (
    <div className="App" style={{ padding: 20 }}>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" style={{ height: 64 }} />
        <h2>Gerador de Senha</h2>

        <div style={{ margin: '12px 0', width: 420, maxWidth: '90%' }}>
          <label>
            Comprimento: {length}
            <br />
            <input
              type="range"
              min="4"
              max="64"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </label>

          <div style={{ marginTop: 8 }}>
            <label style={{ marginRight: 12 }}>
              <input type="checkbox" checked={useLower} onChange={(e) => setUseLower(e.target.checked)} /> Minúsculas
            </label>
            <label style={{ marginRight: 12 }}>
              <input type="checkbox" checked={useUpper} onChange={(e) => setUseUpper(e.target.checked)} /> Maiúsculas
            </label>
            <label style={{ marginRight: 12 }}>
              <input type="checkbox" checked={useNumbers} onChange={(e) => setUseNumbers(e.target.checked)} /> Números
            </label>
            <label>
              <input type="checkbox" checked={useSymbols} onChange={(e) => setUseSymbols(e.target.checked)} /> Símbolos
            </label>
          </div>

          <div style={{ marginTop: 12, display: 'flex', gap: 8, alignItems: 'center' }}>
            <input
              type="text"
              readOnly
              value={password}
              placeholder="Clique em Gerar"
              style={{ flex: 1, padding: '8px 10px', borderRadius: 4, border: '1px solid #ccc' }}
            />
            <button onClick={generate} style={{ padding: '8px 12px' }}>Gerar</button>
            <button onClick={copyToClipboard} style={{ padding: '8px 12px' }}>{copied ? 'Copiado' : 'Copiar'}</button>
          </div>

          <div style={{ marginTop: 8 }}>
            <strong>Força:</strong> {strength}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;