// App.jsx
import { useEffect, useState } from "react";
import "./App.css";

const EMOJIS = ["🐶", "🐱", "🐼", "🦊", "🐵", "🐸", "🐷", "🐯"];

function App() {
  const [cards, setCards] = useState([]);
  const [firstChoice, setFirstChoice] = useState(null);
  const [secondChoice, setSecondChoice] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [turns, setTurns] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);

  // Embaralhar e iniciar o jogo
  const shuffleCards = () => {
    const duplicated = [...EMOJIS, ...EMOJIS];
    const shuffled = duplicated
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        matched: false,
      }));

    setCards(shuffled);
    setFirstChoice(null);
    setSecondChoice(null);
    setTurns(0);
    setGameFinished(false);
  };

  // Iniciar ao carregar
  useEffect(() => {
    shuffleCards();
  }, []);

  // Quando o jogador escolhe uma carta
  const handleChoice = (card) => {
    if (disabled) return;
    if (card === firstChoice || card.matched) return;

    if (!firstChoice) {
      setFirstChoice(card);
    } else {
      setSecondChoice(card);
    }
  };

  // Verificar se deu par
  useEffect(() => {
    if (firstChoice && secondChoice) {
      setDisabled(true);

      if (firstChoice.emoji === secondChoice.emoji) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.emoji === firstChoice.emoji
              ? { ...card, matched: true }
              : card
          )
        );
        resetTurn();
      } else {
        setTimeout(() => {
          resetTurn();
        }, 800);
      }
    }
  }, [firstChoice, secondChoice]);

  // Verificar se o jogo terminou
  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.matched)) {
      setGameFinished(true);
    }
  }, [cards]);

  const resetTurn = () => {
    setFirstChoice(null);
    setSecondChoice(null);
    setTurns((prev) => prev + 1);
    setDisabled(false);
  };

  const isFlipped = (card) => {
    return (
      card === firstChoice || card === secondChoice || card.matched
    );
  };

  return (
    <div className="app">
      <h1>Jogo da Memória</h1>
      <button onClick={shuffleCards}>Reiniciar</button>

      <p>Jogadas: {turns}</p>

      {gameFinished && <p>Parabéns, você concluiu o jogo!</p>}

      <div className="grid">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            flipped={isFlipped(card)}
            handleChoice={handleChoice}
          />
        ))}
      </div>
    </div>
  );
}

function Card({ card, flipped, handleChoice }) {
  const handleClick = () => {
    handleChoice(card);
  };

  return (
    <div className={`card ${flipped ? "flipped" : ""}`} onClick={handleClick}>
      <div className="card-inner">
        <div className="card-front">?</div>
        <div className="card-back">{card.emoji}</div>
      </div>
    </div>
  );
}

export default App;