import { useState, useRef, useEffect } from "react";
import "./App.css";

function DraggableWindow({ id, title, children, onClose, onFocus, isActive, initialPos }) {
  const [position, setPosition] = useState(initialPos);
  const [isDragging, setIsDragging] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    onFocus(id);
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e) => {
    if (!isDragging || isMaximized) return;
    setPosition({
      x: e.clientX - dragOffset.current.x,
      y: e.clientY - dragOffset.current.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  });

  const handleMinimize = () => {
    setIsMinimized(true);
  };

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  const handleRestore = () => {
    setIsMinimized(false);
  };

  const windowStyle = {
    left: isMaximized ? 0 : position.x,
    top: isMaximized ? 0 : position.y,
    width: isMaximized ? "100vw" : 500,
    height: isMaximized ? "100vh" : 320,
  };

  return (
    <>
      {/* Ícone da janela minimizada na barra de tarefas */}
      {isMinimized && (
        <div className="taskbar-window-button" onClick={handleRestore}>
          <span>{title}</span>
        </div>
      )}

      {/* Janela principal */}
      <div
        className={
          "window " +
          (isActive ? "window-active " : "") +
          (isMinimized ? "window-minimized " : "")
        }
        style={windowStyle}
        onMouseDown={() => onFocus(id)}
      >
        <div className="window-header" onMouseDown={handleMouseDown}>
          <span className="window-title">{title}</span>
          <div className="window-buttons">
            <button onClick={handleMinimize}>—</button>
            <button onClick={handleMaximize}>{isMaximized ? "▢" : "☐"}</button>
            <button onClick={() => onClose(id)}>X</button>
          </div>
        </div>
        <div className="window-content">{children}</div>
      </div>
    </>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [windows, setWindows] = useState([
    { id: 1, title: "Bloco de Notas", initialPos: { x: 200, y: 120 } },
    { id: 2, title: "Explorador de Arquivos", initialPos: { x: 260, y: 170 } },
  ]);
  const [activeWindowId, setActiveWindowId] = useState(2);

  const handleCloseWindow = (id) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
    if (activeWindowId === id && windows.length > 1) {
      const remaining = windows.filter((w) => w.id !== id);
      if (remaining.length > 0) setActiveWindowId(remaining[0].id);
    }
  };

  const handleFocusWindow = (id) => {
    setActiveWindowId(id);
  };

  return (
    <div className="desktop">
      {/* ÍCONES DA ÁREA DE TRABALHO */}
      <div className="desktop-icons">
        <div className="desktop-icon">
          <img
            className="icon-image"
            src="https://icons.iconarchive.com/icons/tpdkdesign.net/windows-7-style/256/Computer-icon.png"
            alt="Computador"
          />
          <span>Computador</span>
        </div>

        <div className="desktop-icon">
          <img
            className="icon-image"
            src="https://icons.iconarchive.com/icons/dakirby309/windows-8-metro/256/Folder-Library-icon.png"
            alt="Bibliotecas"
          />
          <span>Bibliotecas</span>
        </div>

        <div className="desktop-icon">
          <img
            className="icon-image"
            src="https://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/256/Places-user-trash-icon.png"
            alt="Lixeira"
          />
          <span>Lixeira</span>
        </div>
      </div>

      {/* MENU INICIAR */}
      {menuOpen && (
        <div className="start-menu">
          <div className="start-menu-left">
            <h3>Programas</h3>
            <ul>
              <li
                onClick={() =>
                  setWindows((prev) => [
                    ...prev,
                    {
                      id: Date.now(),
                      title: "Bloco de Notas",
                      initialPos: { x: 260, y: 130 },
                    },
                  ])
                }
              >
                Bloco de Notas
              </li>
              <li
                onClick={() =>
                  setWindows((prev) => [
                    ...prev,
                    {
                      id: Date.now(),
                      title: "Explorador de Arquivos",
                      initialPos: { x: 290, y: 160 },
                    },
                  ])
                }
              >
                Explorador de Arquivos
              </li>
              <li>Paint</li>
              <li>Calculadora</li>
              <li>Prompt de Comando</li>
            </ul>
          </div>

          <div className="start-menu-right">
            <img
              src="https://i.imgur.com/4ZQZ4ZC.png"
              alt="User"
              className="user-pic"
            />
            <p>Usuário</p>
            <button className="shutdown-btn">Desligar</button>
          </div>
        </div>
      )}

      {/* JANELAS */}
      {windows.map((w) => (
        <DraggableWindow
          key={w.id}
          id={w.id}
          title={w.title}
          initialPos={w.initialPos}
          onClose={handleCloseWindow}
          onFocus={handleFocusWindow}
          isActive={activeWindowId === w.id}
        >
          <p>Este é o conteúdo da janela: {w.title}</p>
          <p>Você pode arrastar, minimizar, maximizar e fechar.</p>
        </DraggableWindow>
      ))}

      {/* BARRA DE TAREFAS */}
      <div className="taskbar">
        {/* Botão iniciar */}
        <div
          className="start-button"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <img
            src="https://icons.iconarchive.com/icons/tpdkdesign.net/windows-7-style/256/Start-Menu-Search-icon.png"
            className="start-orb"
            alt="Start"
          />
        </div>

        {/* Ícones fixados */}
        <div className="taskbar-pinned">
          <img
            className="taskbar-icon"
            src="https://icons.iconarchive.com/icons/dakirby309/windows-8-metro/256/File-Explorer-Metro-icon.png"
            alt="Explorer"
          />

          <img
            className="taskbar-icon"
            src="https://icons.iconarchive.com/icons/martz90/hex/256/internet-explorer-icon.png"
            alt="Internet Explorer"
          />

          <img
            className="taskbar-icon"
            src="https://icons.iconarchive.com/icons/dakirby309/windows-8-metro/256/Apps-Windows-Media-Player-Metro-icon.png"
            alt="Media Player"
          />
        </div>

        <div className="taskbar-space" />

        {/* Relógio */}
        <div className="taskbar-tray">
          <div className="tray-clock">
            <div>15:23</div>
            <div>26/12/2025</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;