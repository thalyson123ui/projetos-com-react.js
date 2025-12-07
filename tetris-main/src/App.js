import React, { useEffect, useState, useRef } from "react";
import './App.css';

const COLS = 10;
const ROWS = 20;
const BASE_CELL = 28; // tamanho base em pixels (será ajustado dinamicamente)

const SHAPES = {
  I: [
    [[0,1],[1,1],[2,1],[3,1]],
    [[2,0],[2,1],[2,2],[2,3]],
  ],
  O: [
    [[1,0],[2,0],[1,1],[2,1]],
  ],
  T: [
    [[1,0],[0,1],[1,1],[2,1]],
    [[1,0],[1,1],[2,1],[1,2]],
    [[0,1],[1,1],[2,1],[1,2]],
    [[1,0],[0,1],[1,1],[1,2]],
  ],
  S: [
    [[1,0],[2,0],[0,1],[1,1]],
    [[1,0],[1,1],[2,1],[2,2]],
  ],
  Z: [
    [[0,0],[1,0],[1,1],[2,1]],
    [[2,0],[1,1],[2,1],[1,2]],
  ],
  J: [
    [[0,0],[0,1],[1,1],[2,1]],
    [[1,0],[2,0],[1,1],[1,2]],
    [[0,1],[1,1],[2,1],[2,2]],
    [[1,0],[1,1],[0,2],[1,2]],
  ],
  L: [
    [[2,0],[0,1],[1,1],[2,1]],
    [[1,0],[1,1],[1,2],[2,2]],
    [[0,1],[1,1],[2,1],[0,2]],
    [[0,0],[1,0],[1,1],[1,2]],
  ],
};

const COLORS = {
  I: "#00f0f0",
  O: "#f0f000",
  T: "#a000f0",
  S: "#00f000",
  Z: "#f00000",
  J: "#0000f0",
  L: "#f0a000",
};

function createEmptyBoard() {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(null));
}

function randomPiece() {
  const keys = Object.keys(SHAPES);
  const type = keys[Math.floor(Math.random() * keys.length)];
  return {
    type,
    rotation: 0,
    x: Math.floor(COLS / 2) - 2,
    y: 0,
    shape: SHAPES[type],
    color: COLORS[type],
  };
}

export default function App() {
  const [board, setBoard] = useState(createEmptyBoard);
  const [piece, setPiece] = useState(randomPiece());
  const [dropInterval, setDropInterval] = useState(700);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const dropRef = useRef();
  const boardRef = useRef(board);
  boardRef.current = board;

  // cell size responsivo
  const [CELL, setCELL] = useState(BASE_CELL);
  useEffect(() => {
    function resize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      // reservar espaço para a área lateral (informações/controle)
      const sidebarReserve = 260;
      const horizontalMargin = 60; // margens/padding da página
      const availW = Math.max(320, w - sidebarReserve - horizontalMargin);
      const availH = Math.max(300, h - 140);

      // cell calculada a partir do espaço disponível (limites min/max)
      let desired = Math.floor(availW / COLS);
      desired = Math.min(60, Math.max(18, desired)); // limitar entre 18 e 60
      // garantir que caiba verticalmente também
      const maxByHeight = Math.floor(availH / ROWS);
      desired = Math.min(desired, Math.max(12, maxByHeight));
      setCELL(desired);
    }
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    function handleKey(e) {
      if (gameOver) return;
      if (e.key === "ArrowLeft") move(-1);
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowDown") drop(1);
      if (e.key === " ") hardDrop();
      if (e.key === "ArrowUp") rotatePiece();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [piece, gameOver]);

  useEffect(() => {
    dropRef.current = tick;
  });

  useEffect(() => {
    if (gameOver) return;
    const id = setInterval(() => dropRef.current(), dropInterval);
    return () => clearInterval(id);
  }, [dropInterval, gameOver]);

  function shapeCoords(p) {
    return p.shape[p.rotation % p.shape.length];
  }

  function collides(newPiece, bx = boardRef.current) {
    const coords = shapeCoords(newPiece);
    for (let [ox, oy] of coords) {
      const x = newPiece.x + ox;
      const y = newPiece.y + oy;
      if (x < 0 || x >= COLS || y >= ROWS) return true;
      if (y >= 0 && bx[y][x]) return true;
    }
    return false;
  }

  function mergeToBoard(p) {
    const newBoard = boardRef.current.map(row => row.slice());
    const coords = shapeCoords(p);
    for (let [ox, oy] of coords) {
      const x = p.x + ox;
      const y = p.y + oy;
      if (y >= 0) newBoard[y][x] = p.color;
    }
    return newBoard;
  }

  function clearLines(b) {
    let removed = 0;
    const newRows = b.filter(row => {
      if (row.every(cell => cell !== null)) {
        removed++;
        return false;
      }
      return true;
    });
    while (newRows.length < ROWS) newRows.unshift(Array(COLS).fill(null));
    if (removed > 0) {
      setScore(s => s + (removed * 100));
      setDropInterval(d => Math.max(100, d - removed * 20));
    }
    return newRows;
  }

  function spawn() {
    const next = randomPiece();
    if (collides(next)) {
      setGameOver(true);
    } else {
      setPiece(next);
    }
  }

  function lockPiece() {
    const merged = mergeToBoard(piece);
    const cleared = clearLines(merged);
    setBoard(cleared);
    spawn();
  }

  function tick() {
    drop(1);
  }

  function drop(n) {
    const moved = { ...piece, y: piece.y + n };
    if (!collides(moved)) {
      setPiece(moved);
    } else {
      if (piece.y <= 0) {
        setGameOver(true);
      } else {
        lockPiece();
      }
    }
  }

  function move(dx) {
    const moved = { ...piece, x: piece.x + dx };
    if (!collides(moved)) setPiece(moved);
  }

  function rotatePiece() {
    const next = { ...piece, rotation: (piece.rotation + 1) % piece.shape.length };
    const kicks = [0, -1, 1, -2, 2];
    for (let k of kicks) {
      const attempt = { ...next, x: piece.x + k };
      if (!collides(attempt)) {
        setPiece(attempt);
        return;
      }
    }
  }

  function hardDrop() {
    let dropY = piece.y;
    const test = { ...piece };
    while (true) {
      test.y = dropY + 1;
      if (collides(test)) break;
      dropY++;
    }
    setPiece({ ...piece, y: dropY });
    if (dropY === piece.y) {
      lockPiece();
    } else {
      setTimeout(() => lockPiece(), 0);
    }
  }

  function renderBoard() {
    const display = board.map(row => row.slice());
    const coords = shapeCoords(piece);
    for (let [ox, oy] of coords) {
      const x = piece.x + ox;
      const y = piece.y + oy;
      if (y >= 0 && y < ROWS && x >= 0 && x < COLS) display[y][x] = piece.color;
    }
    return display;
  }

  const display = renderBoard();

  return (
    <div style={{ display: "flex", gap: 20, padding: 20, fontFamily: "sans-serif" }}>
      <div>
        <div style={{
          width: COLS * CELL,
          height: ROWS * CELL,
          background: "#111",
          display: "grid",
          gridTemplateColumns: `repeat(${COLS}, ${CELL}px)`,
          gridGap: "2px",
          padding: 4,
          boxSizing: "border-box",
          borderRadius: 6,
        }}>
          {display.flat().map((cellColor, i) => (
            <div key={i} style={{
              width: CELL - 2,
              height: CELL - 2,
              background: cellColor || "#1f1f1f",
              borderRadius: 3,
              boxShadow: cellColor ? "inset 0 -6px rgba(0,0,0,0.35), 0 1px rgba(255,255,255,0.02)" : "none",
            }} />
          ))}
        </div>
        <div style={{ marginTop: 10, color: "#ddd" }}>
          <div>Pontuação: {score}</div>
          <div>Velocidade: {(700 - dropInterval) / 20}</div>
          {gameOver && <div style={{ color: "salmon", marginTop: 8 }}>Game Over — atualize a página para reiniciar</div>}
        </div>
      </div>

      <div style={{ color: "#eee", minWidth: 220 }}>
        <h3>Tetris</h3>
        <p>Controles:</p>
        <ul>
          <li>← e → mover</li>
          <li>↓ cair mais rápido</li>
          <li>↑ rotacionar</li>
          <li>Espaço hard drop</li>
        </ul>
        <button onClick={() => {
          setBoard(createEmptyBoard());
          setPiece(randomPiece());
          setDropInterval(700);
          setScore(0);
          setGameOver(false);
        }}>Reiniciar</button>
      </div>
    </div>
  );
}