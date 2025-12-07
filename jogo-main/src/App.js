import React, { useState } from 'react';
import './App.css';

function calculateWinner(squares) {
    const lines = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];
    for (let [a,b,c] of lines) {
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

function Square({ value, onClick }) {
    return (
        <button
            onClick={onClick}
            style={{
                width: 80, height: 80, fontSize: 32, margin: 4,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                background: '#fff', border: '2px solid #444', cursor: 'pointer'
            }}
        >
            {value}
        </button>
    );
}

function Board({ squares, onClick }) {
    const renderSquare = (i) => <Square key={i} value={squares[i]} onClick={() => onClick(i)} />;

    return (
        <div>
            <div style={{ display: 'flex' }}>{renderSquare(0)}{renderSquare(1)}{renderSquare(2)}</div>
            <div style={{ display: 'flex' }}>{renderSquare(3)}{renderSquare(4)}{renderSquare(5)}</div>
            <div style={{ display: 'flex' }}>{renderSquare(6)}{renderSquare(7)}{renderSquare(8)}</div>
        </div>
    );
}

function App() {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);

    const winner = calculateWinner(squares);
    const status = winner ? `Vencedor: ${winner}` : squares.every(Boolean) ? 'Empate' : `Próximo: ${xIsNext ? 'X' : 'O'}`;

    function handleClick(i) {
        if (squares[i] || winner) return;
        const next = squares.slice();
        next[i] = xIsNext ? 'X' : 'O';
        setSquares(next);
        setXIsNext(!xIsNext);
    }

    function reset() {
        setSquares(Array(9).fill(null));
        setXIsNext(true);
    }

    return (
        <div className="App" style={{ fontFamily: 'sans-serif', padding: 24 }}>
            <h2>Jogo da Velha</h2>
            <p>{status}</p>
            <Board squares={squares} onClick={handleClick} />
            <div style={{ marginTop: 16 }}>
                <button onClick={reset} style={{ padding: '8px 12px', cursor: 'pointer' }}>Reiniciar</button>
            </div>
        </div>
    );
}

export default App;