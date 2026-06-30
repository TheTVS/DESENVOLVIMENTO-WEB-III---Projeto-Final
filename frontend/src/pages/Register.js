import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';

const styles = {
  container: {
    minHeight: '100vh', display: 'flex', alignItems: 'center',
    justifyContent: 'center', background: '#f3f4f6', fontFamily: 'sans-serif',
  },
  card: {
    background: '#fff', borderRadius: 8, padding: '2rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)', width: '100%', maxWidth: 380,
  },
  title: { margin: '0 0 1.5rem', fontSize: '1.5rem', textAlign: 'center', color: '#111' },
  label: { display: 'block', marginBottom: '0.25rem', fontSize: '0.85rem', color: '#374151' },
  input: {
    width: '100%', padding: '0.5rem 0.75rem', marginBottom: '1rem',
    border: '1px solid #d1d5db', borderRadius: 6, fontSize: '1rem',
    boxSizing: 'border-box',
  },
  btn: {
    width: '100%', padding: '0.6rem', background: '#16a34a', color: '#fff',
    border: 'none', borderRadius: 6, fontSize: '1rem', cursor: 'pointer',
  },
  error: { color: '#dc2626', marginBottom: '1rem', fontSize: '0.9rem' },
  link: { display: 'block', marginTop: '1rem', textAlign: 'center', color: '#2563eb', fontSize: '0.9rem' },
};

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (password !== passwordConfirmation) {
      setError('As senhas não coincidem.');
      return;
    }
    try {
      const data = await api.register(name, email, password, passwordConfirmation);
      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (err) {
      const messages = err.errors
        ? Object.values(err.errors).flat().join(' ')
        : err.message || 'Erro ao cadastrar.';
      setError(messages);
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Criar Conta</h1>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <label style={styles.label}>Nome</label>
          <input style={styles.input} type="text" value={name}
            onChange={e => setName(e.target.value)} required />
          <label style={styles.label}>E-mail</label>
          <input style={styles.input} type="email" value={email}
            onChange={e => setEmail(e.target.value)} required />
          <label style={styles.label}>Senha</label>
          <input style={styles.input} type="password" value={password}
            onChange={e => setPassword(e.target.value)} required />
          <label style={styles.label}>Confirmar Senha</label>
          <input style={styles.input} type="password" value={passwordConfirmation}
            onChange={e => setPasswordConfirmation(e.target.value)} required />
          <button style={styles.btn} type="submit">Cadastrar</button>
        </form>
        <Link style={styles.link} to="/login">Já tem conta? Faça login</Link>
      </div>
    </div>
  );
}
