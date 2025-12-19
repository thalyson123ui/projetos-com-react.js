import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [cidade, setCidade] = useState("");
  const [clima, setClima] = useState(null);
  const [previsao, setPrevisao] = useState([]);
  const [erro, setErro] = useState("");
  const [tema, setTema] = useState("light");

  const apiKey = "SUA_API_KEY_AQUI";

  async function buscarClima() {
    if (!cidade) {
      setErro("Digite uma cidade.");
      return;
    }

    try {
      // Clima atual
      const urlAtual = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&lang=pt_br&units=metric`;
      const respostaAtual = await fetch(urlAtual);
      const dadosAtual = await respostaAtual.json();

      if (dadosAtual.cod === "404") {
        setErro("Cidade não encontrada.");
        setClima(null);
        setPrevisao([]);
        return;
      }

      setClima(dadosAtual);
      setErro("");

      // Previsão 5 dias
      const urlPrevisao = `https://api.openweathermap.org/data/2.5/forecast?q=${cidade}&appid=${apiKey}&lang=pt_br&units=metric`;
      const respostaPrev = await fetch(urlPrevisao);
      const dadosPrev = await respostaPrev.json();

      // Filtrar 1 previsão por dia (12:00)
      const filtrado = dadosPrev.list.filter((item) =>
        item.dt_txt.includes("12:00:00")
      );

      setPrevisao(filtrado);
    } catch (e) {
      setErro("Erro ao buscar dados.");
    }
  }

  function trocarTema() {
    setTema(tema === "light" ? "dark" : "light");
  }

  return (
    <div className={`app ${tema}`}>
      <header>
        <h1>Clima em React</h1>
        <button className="tema-btn" onClick={trocarTema}>
          {tema === "light" ? "🌙" : "☀️"}
        </button>
      </header>

      <div className="busca">
        <input
          type="text"
          placeholder="Digite a cidade"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
        />
        <button onClick={buscarClima}>Buscar</button>
      </div>

      {erro && <p className="erro">{erro}</p>}

      {clima && (
        <div className="card">
          <h2>{clima.name}</h2>
          <img
            className="icone"
            src={`https://openweathermap.org/img/wn/${clima.weather[0].icon}@2x.gif`}
            alt="icone clima"
          />
          <p className="temp">{clima.main.temp}°C</p>
          <p>{clima.weather[0].description}</p>
        </div>
      )}

      {previsao.length > 0 && (
        <div className="previsao-container">
          <h3>Previsão para 5 dias</h3>
          <div className="previsao">
            {previsao.map((dia) => (
              <div key={dia.dt} className="prev-card">
                <p>{new Date(dia.dt_txt).toLocaleDateString("pt-BR")}</p>
                <img
                  src={`https://openweathermap.org/img/wn/${dia.weather[0].icon}@2x.gif`}
                  alt="icone"
                />
                <p>{dia.main.temp}°C</p>
                <p>{dia.weather[0].description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;