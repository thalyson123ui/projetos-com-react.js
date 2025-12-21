import React, { useState, useEffect } from 'react';

function App() {
  const [notebooks, setNotebooks] = useState([]);
  const [filtroMarca, setFiltroMarca] = useState('');
  const [filtroAno, setFiltroAno] = useState('');

  // Simulação de chamada de API
  useEffect(() => {
    // Aqui você usaria fetch("SUA_URL_DA_API").then(...)
    setNotebooks(laptopsData);
  }, []);

  // Lógica de filtragem
  const notebooksFiltrados = notebooks.filter(nb => {
    const matchMarca = nb.marca.toLowerCase().includes(filtroMarca.toLowerCase());
    const matchAno = filtroAno === '' || nb.ano.toString() === filtroAno;
    return matchMarca && matchAno;
  });

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Catálogo de Notebooks</h1>

      {/* Seção de Filtros */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input 
          type="text" 
          placeholder="Filtrar por Marca..." 
          value={filtroMarca}
          onChange={(e) => setFiltroMarca(e.target.value)}
        />
        
        <select value={filtroAno} onChange={(e) => setFiltroAno(e.target.value)}>
          <option value="">Todos os Anos</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
        </select>
      </div>

      {/* Listagem de Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '15px' }}>
        {notebooksFiltrados.map(nb => (
          <div key={nb.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', boxShadow: '2px 2px 5px #eee' }}>
            <h3>{nb.modelo}</h3>
            <p><strong>Marca:</strong> {nb.marca}</p>
            <p><strong>Ano:</strong> {nb.ano}</p>
            <hr />
            <p style={{ fontSize: '0.9em' }}>
              <strong>Specs:</strong><br />
              CPU: {nb.cpu} <br />
              RAM: {nb.ram} <br />
              GPU: {nb.gpu}
            </p>
          </div>
        ))}
      </div>
      
      {notebooksFiltrados.length === 0 && <p>Nenhum notebook encontrado para esses filtros.</p>}
    </div>
  );
}

export default App;