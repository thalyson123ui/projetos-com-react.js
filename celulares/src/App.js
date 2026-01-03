import { useEffect, useState } from "react";

function App() {
  const [celulares, setCelulares] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/celulares") // ou /celulares se usar JSON Server
      .then(res => res.json())
      .then(data => setCelulares(data));
  }, []);

  const lancados = celulares.filter(c => c.status === "lançado");
  const aLancar = celulares.filter(c => c.status === "a_lancar");

  return (
    <div style={{ padding: 20 }}>
      <h1>Catálogo de Celulares</h1>

      <h2>Já lançados</h2>
      <ul>
        {lancados.map(c => (
          <li key={c.id}>{c.nome} - {c.marca}</li>
        ))}
      </ul>

      <h2>Próximos lançamentos</h2>
      <ul>
        {aLancar.map(c => (
          <li key={c.id}>{c.nome} - {c.marca}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;