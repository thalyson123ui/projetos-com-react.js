import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Animações de entrada controladas por JS (respeita prefers-reduced-motion)
function animateEntrance() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const wrap = document.querySelector('.form-wrap');
  const title = document.querySelector('.title');
  const fields = Array.from(document.querySelectorAll('.contact-form .field'));
  const btn = document.querySelector('.contact-form .btn');
  if (!wrap) return;

  const animateElem = (el, delay = 0, duration = 420) => {
    if (!el) return;
    // estado inicial
    el.style.transition = 'none';
    el.style.opacity = '0';
    el.style.transform = 'translateY(10px) scale(0.995)';
    // forçar reflow
    void el.offsetWidth;
    // aplicar animação final com atraso
    setTimeout(() => {
      el.style.transition = `opacity ${duration}ms cubic-bezier(.2,.9,.2,1), transform ${duration}ms cubic-bezier(.2,.9,.2,1)`;
      el.style.opacity = '1';
      el.style.transform = 'translateY(0) scale(1)';
    }, delay);
  };

  // animação do container (leve)
  animateElem(wrap, 0, 520);
  // título
  animateElem(title, 120, 480);
  // campos em cascade
  fields.forEach((f, i) => animateElem(f, 250 + i * 80, 420));
  // botão por último
  animateElem(btn, 250 + fields.length * 80 + 100, 420);
}

// dispara após primeira pintura
window.requestAnimationFrame(() => {
  setTimeout(animateEntrance, 80);
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();