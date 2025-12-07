import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  const nome = "thalyson";
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [imc, setImc] = useState(null);
  const [categoria, setCategoria] = useState('');

  const calcularIMC = () => {
    if (peso && altura) {
      const alturaEmMetros = altura / 100;
      const imcCalculado = peso / (alturaEmMetros * alturaEmMetros);
      setImc(imcCalculado.toFixed(2));

      if (imcCalculado < 18.5) {
        setCategoria('Abaixo do peso');
      } else if (imcCalculado < 25) {
        setCategoria('Peso normal');
      } else if (imcCalculado < 30) {
        setCategoria('Sobrepeso');
      } else {
        setCategoria('Obesidade');
      }
    }
  };

  const limpar = () => {
    setPeso('');
    setAltura('');
    setImc(null);
    setCategoria('');
  };

  return (
    <div className="App">
      <h1>Calculador de IMC</h1>
      <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label>Peso (kg): </label>
          <input
            type="number"
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
            placeholder="Digite seu peso"
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Altura (cm): </label>
          <input
            type="number"
            value={altura}
            onChange={(e) => setAltura(e.target.value)}
            placeholder="Digite sua altura"
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <button onClick={calcularIMC} style={{ padding: '10px 20px', marginRight: '10px', cursor: 'pointer' }}>
            Calcular
          </button>
          <button onClick={limpar} style={{ padding: '10px 20px', cursor: 'pointer' }}>
            Limpar
          </button>
        </div>
        {imc && (
          <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
            <p><strong>IMC: {imc}</strong></p>
            <p><strong>Categoria: {categoria}</strong></p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;