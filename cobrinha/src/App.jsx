import { useEffect, useRef, useState } from "react";
import "./App.css";

const GRID_SIZE = 20;
const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 9, y: 10 }
];
const INITIAL_DIRECTION = { x: 1, y: 0 };
const INITIAL_SPEED = 180;
const MIN_SPEED = 60;

function randomFood(snake) {
  let food;
  do {
    food = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  } while (snake.some(seg => seg.x === food.x && seg.y === food.y));
  return food;
}

export default function App() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState(randomFood(INITIAL_SNAKE));
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [darkMode, setDarkMode] = useState(true);

  const eatSound = useRef(new Audio("/eat.mp3"));
  const gameOverSound = useRef(new Audio("/gameover.mp3"));

  useEffect(() => {
    const handleKey = (e) => {
      switch (e.key) {
        case "ArrowUp":
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case "ArrowDown":
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case "ArrowLeft":
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case "ArrowRight":
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [direction]);

  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      setSnake(prev => {
        const head = {
          x: prev[0].x + direction.x,
          y: prev[0].y + direction.y
        };

        // colisão
        if (
          head.x < 0 || head.y < 0 ||
          head.x >= GRID_SIZE || head.y >= GRID_SIZE ||
          prev.some(seg => seg.x === head.x && seg.y === head.y)
        ) {
          setGameOver(true);
          gameOverSound.current.play();
          return prev;
        }

        const newSnake = [head, ...prev];

        if (head.x === food.x && head.y === food.y) {
          eatSound.current.play();
          setScore(s => s + 1);
          setFood(randomFood(newSnake));

          setSpeed(s =>
            s > MIN_SPEED ? s - 5 : s
          );
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [direction, food, gameOver, speed]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(randomFood(INITIAL_SNAKE));
    setGameOver(false);
    setScore(0);
    setSpeed(INITIAL_SPEED);
  };

  return (
    <div className={`container ${darkMode ? "dark" : "light"}`}>
      <header className="top">
        <h1>🐍 Cobrinha</h1>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️ Claro" : "🌙 Escuro"}
        </button>
      </header>

      <p className="score">Pontuação: {score}</p>

      <div className="board">
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
          const x = i % GRID_SIZE;
          const y = Math.floor(i / GRID_SIZE);

          const isSnake = snake.some(seg => seg.x === x && seg.y === y);
          const isFood = food.x === x && food.y === y;

          return (
            <div
              key={i}
              className={`cell ${isSnake ? "snake" : ""} ${isFood ? "food" : ""}`}
            />
          );
        })}
      </div>

      {gameOver && (
        <div className="game-over">
          <p>💀 Game Over</p>
          <button onClick={resetGame}>Jogar novamente</button>
        </div>
      )}
    </div>
  );
}
