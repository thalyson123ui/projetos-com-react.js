import React, { useState, useRef } from 'react';
import './App.css';

function App() {
  const [values, setValues] = useState({ nome: '', email: '', mensagem: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const formRef = useRef(null);

  const validate = () => {
    const e = {};
    if (!values.nome.trim()) e.nome = 'Nome é obrigatório';
    if (!values.email.trim()) e.email = 'Email é obrigatório';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) e.email = 'Email inválido';
    if (!values.mensagem.trim()) e.mensagem = 'Mensagem é obrigatória';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(v => ({ ...v, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const eObj = validate();
    setErrors(eObj);
    if (Object.keys(eObj).length) {
      // trigger shake animation
      formRef.current.classList.remove('shake');
      // reflow to restart animation
      void formRef.current.offsetWidth;
      formRef.current.classList.add('shake');
      return;
    }
    setSubmitting(true);
    // Simula envio assíncrono
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      // efeito de sucesso e reset após 2s
      setTimeout(() => {
        setSuccess(false);
        setValues({ nome: '', email: '', mensagem: '' });
      }, 1800);
    }, 1200);
  };

  return (
    <div className="App">
      <main className="form-wrap">
        <h1 className="title">Contato</h1>

        <form
          ref={formRef}
          className={`contact-form ${submitting ? 'submitting' : ''} ${success ? 'success' : ''}`}
          onSubmit={handleSubmit}
          noValidate
        >
          <div className={`field ${values.nome ? 'filled' : ''} ${errors.nome ? 'error' : ''}`}>
            <input
              name="nome"
              id="nome"
              value={values.nome}
              onChange={handleChange}
              autoComplete="name"
            />
            <label htmlFor="nome">Nome</label>
            {errors.nome && <small className="error-text">{errors.nome}</small>}
          </div>

          <div className={`field ${values.email ? 'filled' : ''} ${errors.email ? 'error' : ''}`}>
            <input
              name="email"
              id="email"
              value={values.email}
              onChange={handleChange}
              autoComplete="email"
            />
            <label htmlFor="email">Email</label>
            {errors.email && <small className="error-text">{errors.email}</small>}
          </div>

          <div className={`field ${values.mensagem ? 'filled' : ''} ${errors.mensagem ? 'error' : ''}`}>
            <textarea
              name="mensagem"
              id="mensagem"
              value={values.mensagem}
              onChange={handleChange}
              rows="4"
            />
            <label htmlFor="mensagem">Mensagem</label>
            {errors.mensagem && <small className="error-text">{errors.mensagem}</small>}
          </div>

          <button type="submit" className="btn" disabled={submitting || success}>
            {submitting ? 'Enviando...' : success ? 'Enviado ✓' : 'Enviar Mensagem'}
          </button>

          <div className="note">
            <small>Formulário com validação, animações e feedback visual.</small>
          </div>
        </form>

        <div className={`success-overlay ${success ? 'show' : ''}`} aria-hidden={!success}>
          <div className="checkmark">
            <svg viewBox="0 0 52 52">
              <path d="M14 27 L22 35 L38 17" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;