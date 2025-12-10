// ...existing code...
import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './index.css';

function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('tasks')) || [];
    } catch {
      return [];
    }
  });
  const [text, setText] = useState('');
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const addTask = (e) => {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;
    setTasks([{ id: Date.now(), text: value, done: false, favorite: false, editing: false }, ...tasks]);
    setText('');
  };

  const toggleDone = (id) => {
    setTasks(tasks.map(t => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const toggleFavorite = (id) => {
    setTasks(tasks.map(t => (t.id === id ? { ...t, favorite: !t.favorite } : t)));
  };

  const startEdit = (id) => {
    setTasks(tasks.map(t => (t.id === id ? { ...t, editing: true, editText: t.text } : t)));
  };

  const changeEditText = (id, value) => {
    setTasks(tasks.map(t => (t.id === id ? { ...t, editText: value } : t)));
  };

  const saveEdit = (id) => {
    setTasks(tasks.map(t => (t.id === id ? { ...t, text: (t.editText||'').trim() || t.text, editing: false, editText: undefined } : t)));
  };

  const cancelEdit = (id) => {
    setTasks(tasks.map(t => (t.id === id ? { ...t, editing: false, editText: undefined } : t)));
  };

  const clearFavorites = () => {
    setTasks(tasks.filter(t => !t.favorite));
  };

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-top">
          <div>
            <img src={logo} className="App-logo" alt="logo" />
            <h1>Lista de Tarefas</h1>
          </div>

          <div className="header-actions">
            <button className="clear-favorites" onClick={clearFavorites} title="Remover favoritas">
              Limpar Favoritas
            </button>
            <button className="theme-toggle" onClick={toggleTheme} aria-label="alternar-tema">
              {theme === 'dark' ? 'Modo Claro' : 'Modo Escuro'}
            </button>
          </div>
        </div>

        <form onSubmit={addTask} className="task-form" aria-label="form-nova-tarefa">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Nova tarefa..."
            aria-label="nova-tarefa"
          />
          <button type="submit">Adicionar</button>
        </form>

        <ul className="task-list" aria-live="polite">
          {tasks.length === 0 && <li className="empty">Nenhuma tarefa</li>}
          {tasks.map((task) => (
            <li key={task.id} className={`task-item ${task.favorite ? 'favorite' : ''}`}>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleDone(task.id)}
                aria-label={`marcar-${task.id}`}
              />

              {!task.editing ? (
                <>
                  <span className={`task-text ${task.done ? 'done' : ''}`}>{task.text}</span>

                  <div className="task-actions">
                    <button className="fav-btn" onClick={() => toggleFavorite(task.id)} aria-label={`favoritar-${task.id}`}>
                      {task.favorite ? '★' : '☆'}
                    </button>
                    <button className="edit-btn" onClick={() => startEdit(task.id)} aria-label={`editar-${task.id}`}>Editar</button>
                    <button className="remove-btn" onClick={() => removeTask(task.id)} aria-label={`remover-${task.id}`}>Remover</button>
                  </div>
                </>
              ) : (
                <>
                  <input
                    className="edit-input"
                    value={task.editText ?? ''}
                    onChange={(e) => changeEditText(task.id, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') saveEdit(task.id);
                      if (e.key === 'Escape') cancelEdit(task.id);
                    }}
                    autoFocus
                  />
                  <div className="task-actions">
                    <button onClick={() => saveEdit(task.id)} aria-label={`salvar-${task.id}`}>Salvar</button>
                    <button onClick={() => cancelEdit(task.id)} aria-label={`cancelar-${task.id}`}>Cancelar</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
// ...existing code...