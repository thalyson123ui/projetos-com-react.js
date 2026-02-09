import "./App.css";

function App() {
  return (
    <div>
      <header className="header">
        <h1>☕ Café & Doces</h1>
        <nav>
          <a href="#home">Início</a>
          <a href="#menu">Cardápio</a>
          <a href="#sobre">Sobre</a>
          <a href="#contato">Contato</a>
        </nav>
      </header>

      <section id="home" className="hero">
        <h2>O melhor café com doces incríveis</h2>
        <p>Café artesanal e sobremesas feitas com carinho.</p>
        <button>Ver Cardápio</button>
      </section>

      <section id="menu" className="menu">
        <h2>Cardápio</h2>

        <div className="cards">
          <div className="card">
            <h3>Café Espresso</h3>
            <p>Forte e aromático</p>
          </div>

          <div className="card">
            <h3>Cappuccino</h3>
            <p>Cremoso e suave</p>
          </div>

          <div className="card">
            <h3>Bolo de Chocolate</h3>
            <p>Fofinho e recheado</p>
          </div>
        </div>
      </section>

      <section id="sobre" className="sobre">
        <h2>Sobre Nós</h2>
        <p>
          Somos apaixonados por café e doces artesanais.
          Nosso objetivo é oferecer uma experiência acolhedora.
        </p>
      </section>

      <section id="contato" className="contato">
        <h2>Contato</h2>
        <p>📍 Rua do Café, 123</p>
        <p>📞 (11) 99999-9999</p>
      </section>

      <footer className="footer">
        <p>© 2026 Café & Doces</p>
      </footer>
    </div>
  );
}

export default App;
