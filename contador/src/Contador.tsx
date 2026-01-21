import { useState } from "react";
import "./Contador.css";

export default function Contador() {
  const [contador, setContador] = useState<number>(0);

  return (
    <div className="container">
      <div className="card">
        <h1>Contador</h1>
        <span className="valor">{contador}</span>

        <div className="botoes">
          <button className="menos" onClick={() => setContador(contador - 1)}>
            -
          </button>
          <button className="zerar" onClick={() => setContador(0)}>
            Zerar
          </button>
          <button className="mais" onClick={() => setContador(contador + 1)}>
            +
          </button>
        </div>
      </div>
    </div>
  );
}
