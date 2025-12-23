import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [photos, setPhotos] = useState([]);
  const [visibleSections, setVisibleSections] = useState({});

  // -----------------------------
  // API UNSPLASH (IMAGENS)
  // -----------------------------
  useEffect(() => {
    const UNSPLASH_KEY = "SUA_CHAVE_AQUI"; // coloque sua chave aqui

    fetch(
      `https://api.unsplash.com/search/photos?query=christmas&per_page=12&client_id=${UNSPLASH_KEY}`
    )
      .then((res) => res.json())
      .then((data) => setPhotos(data.results));
  }, []);

  // -----------------------------
  // ANIMAÇÕES DE SCROLL
  // -----------------------------
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll("section").forEach((sec) => observer.observe(sec));
  }, []);

  return (
    <div className="App">

      {/* HERO */}
      <header className="hero">
        <h1 className="hero-title">🎄 Feliz Natal, Thalyson 🎄</h1>
        <p className="hero-subtitle">Uma galeria natalina com imagens em tempo real</p>

        <a href="#gallery" className="hero-button">Ver Galeria</a>
      </header>

      {/* GALERIA UNSPLASH */}
      <section id="gallery" className={`section fade ${visibleSections["gallery"] ? "show" : ""}`}>
        <h2>📸 Galeria de Natal</h2>

        <div className="gallery">
          {photos.length > 0 ? (
            photos.map((img) => (
              <img key={img.id} src={img.urls.small} alt="Natal" />
            ))
          ) : (
            <p>Carregando imagens...</p>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>Feito com ❤️ usando React + Unsplash API</p>
      </footer>
    </div>
  );
}

export default App;