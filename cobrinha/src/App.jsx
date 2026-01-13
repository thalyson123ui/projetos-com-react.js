import { useEffect, useState } from "react";
import "./App.css";

const GRID_SIZE = 20;
const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 9, y: 10 }
];
const INITIAL_DIRECTION = { x: 1, y: 0 };

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

        // colisão parede
        if (
          head.x < 0 || head.y < 0 ||
          head.x >= GRID_SIZE || head.y >= GRID_SIZE ||
          prev.some(seg => seg.x === head.x && seg.y === head.y)
        ) {
          setGameOver(true);
          return prev;
        }

        const newSnake = [head, ...prev];

        if (head.x === food.x && head.y === food.y) {
          setFood(randomFood(newSnake));
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [direction, food, gameOver]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(randomFood(INITIAL_SNAKE));
    setGameOver(false);
  };

  return (
    <div className="container">
      <h1>🐍 Jogo da Cobrinha</h1>

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
