import React, { useEffect, useRef, useState } from "react";

const GAME_DURATION_MS = 30000; // 30s para terminar
const TRACK_LENGTH = 100; // distância até a linha de chegada (unidade abstrata)
const SPEED_WHEN_MOVING = 20; // unidades por segundo
const LIGHT_MIN_MS = 1200; // tempo mínimo por estado da luz
const LIGHT_MAX_MS = 3000; // tempo máximo por estado da luz

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function Game() {
  const [position, setPosition] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [light, setLight] = useState("green"); // "green" | "red"
  const [status, setStatus] = useState("idle"); // "idle" | "running" | "win" | "lose" | "timeup"
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION_MS);
  const [message, setMessage] = useState("");
  const loopRef = useRef(null);
  const lightTimerRef = useRef(null);
  const lastFrameRef = useRef(performance.now());
  const countdownRef = useRef(null);

  // Alterna as luzes em intervalos aleatórios
  const scheduleLightToggle = () => {
    clearTimeout(lightTimerRef.current);
    lightTimerRef.current = setTimeout(() => {
      setLight((prev) => (prev === "green" ? "red" : "green"));
      scheduleLightToggle();
    }, randomBetween(LIGHT_MIN_MS, LIGHT_MAX_MS));
  };

  // Loop principal do jogo (movimento e checagens)
  const gameLoop = (now) => {
    const dt = (now - lastFrameRef.current) / 1000; // segundos
    lastFrameRef.current = now;

    setPosition((prev) => {
      let next = prev;
      if (status === "running" && isMoving) {
        next += SPEED_WHEN_MOVING * dt;
      }
      return Math.min(next, TRACK_LENGTH);
    });

    // Checa perda por mover em luz vermelha
    if (status === "running" && isMoving && light === "red") {
      setStatus("lose");
      setMessage("Você se moveu na luz vermelha. Fim de jogo!");
      cleanup();
      return;
    }

    // Checa vitória
    setPosition((prev) => {
      if (status === "running" && prev >= TRACK_LENGTH) {
        setStatus("win");
        setMessage("Você cruzou a linha! Vitória!");
        cleanup();
      }
      return prev;
    });

    loopRef.current = requestAnimationFrame(gameLoop);
  };

  const cleanup = () => {
    cancelAnimationFrame(loopRef.current);
    clearTimeout(lightTimerRef.current);
    clearInterval(countdownRef.current);
  };

  const startGame = () => {
    setPosition(0);
    setIsMoving(false);
    setLight("green");
    setStatus("running");
    setMessage("");
    setTimeLeft(GAME_DURATION_MS);
    lastFrameRef.current = performance.now();

    scheduleLightToggle();
    loopRef.current = requestAnimationFrame(gameLoop);

    clearInterval(countdownRef.current);
    countdownRef.current = setInterval(() => {
      setTimeLeft((t) => {
        const nt = t - 100;
        if (nt <= 0) {
          setStatus((s) => {
            if (s === "running") {
              cleanup();
              setMessage("O tempo acabou!");
              return "timeup";
            }
            return s;
          });
          return 0;
        }
        return nt;
      });
    }, 100);
  };

  // Controles: espaço para mover
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        setIsMoving(true);
      }
    };
    const handleKeyUp = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        setIsMoving(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Limpeza ao desmontar
  useEffect(() => {
    return () => cleanup();
  }, []);

  const progressPct = Math.round((position / TRACK_LENGTH) * 100);
  const timeSec = (timeLeft / 1000).toFixed(1);

  return (
    <div className="game">
      <div className="hud">
        <div className={`light ${light}`}></div>
        <div className="time">
          <strong>Tempo:</strong> {timeSec}s
        </div>
        <div className="status">
          <strong>Status:</strong> {status === "idle"
            ? "Parado"
            : status === "running"
            ? "Jogando"
            : status === "win"
            ? "Vitória"
            : status === "lose"
            ? "Derrota"
            : "Tempo esgotado"}
        </div>
      </div>

      <div className="track">
        <div className="progress" style={{ width: `${progressPct}%` }}>
          <div className="player">🧍</div>
        </div>
        <div className="finish">Chegada</div>
      </div>

      <div className="controls">
        {status !== "running" ? (
          <button className="btn" onClick={startGame}>
            Iniciar jogo
          </button>
        ) : (
          <button className="btn btn-secondary" onClick={() => setIsMoving(false)}>
            Parar
          </button>
        )}
        <p className="hint">
          Segure <kbd>Espaço</kbd> para andar. Solte na luz vermelha.
        </p>
      </div>

      {message && <div className="message">{message}</div>}
    </div>
  );
}