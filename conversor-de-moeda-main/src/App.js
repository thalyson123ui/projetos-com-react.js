import { useState } from 'react';
import './App.css';

function App() {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('BRL');
  const [convertedAmount, setConvertedAmount] = useState('');

  // Taxas de câmbio (você pode atualizar com uma API real)
  const exchangeRates = {
    USD: { BRL: 5.15, EUR: 0.92, GBP: 0.79 },
    BRL: { USD: 0.19, EUR: 0.18, GBP: 0.15 },
    EUR: { USD: 1.09, BRL: 5.61, GBP: 0.86 },
    GBP: { USD: 1.27, BRL: 6.53, EUR: 1.16 }
  };

  const handleConvert = () => {
    if (amount && exchangeRates[fromCurrency][toCurrency]) {
      const result = (amount * exchangeRates[fromCurrency][toCurrency]).toFixed(2);
      setConvertedAmount(result);
    }
  };

  return (
    <div className="App">
      <div className="converter-container">
        <h1>Conversor de Moeda</h1>
        
        <div className="converter-card">
          <div className="input-group">
            <label>Valor</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Digite o valor"
            />
          </div>

          <div className="currencies-group">
            <div className="input-group">
              <label>De:</label>
              <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
                <option>USD</option>
                <option>BRL</option>
                <option>EUR</option>
                <option>GBP</option>
              </select>
            </div>

            <div className="input-group">
              <label>Para:</label>
              <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
                <option>USD</option>
                <option>BRL</option>
                <option>EUR</option>
                <option>GBP</option>
              </select>
            </div>
          </div>

          <button onClick={handleConvert} className="convert-btn">
            Converter
          </button>

          {convertedAmount && (
            <div className="result">
              <p>{amount} {fromCurrency} = <strong>{convertedAmount} {toCurrency}</strong></p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;