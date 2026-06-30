import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

const s = {
  page: { minHeight: '100vh', background: '#f3f4f6', fontFamily: 'sans-serif' },
  header: {
    background: '#1e3a5f', color: '#fff', padding: '1rem 2rem',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
  },
  headerTitle: { margin: 0, fontSize: '1.25rem' },
  logoutBtn: {
    background: 'transparent', border: '1px solid #fff', color: '#fff',
    padding: '0.35rem 0.8rem', borderRadius: 6, cursor: 'pointer', fontSize: '0.9rem',
  },
  main: { maxWidth: 680, margin: '2rem auto', padding: '0 1rem' },
  card: { background: '#fff', borderRadius: 8, padding: '1.5rem', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', marginBottom: '1.5rem' },
  label: { display: 'block', marginBottom: '0.25rem', fontSize: '0.85rem', color: '#374151' },
  input: { width: '100%', padding: '0.5rem 0.75rem', marginBottom: '0.75rem', border: '1px solid #d1d5db', borderRadius: 6, fontSize: '1rem', boxSizing: 'border-box' },
  textarea: { width: '100%', padding: '0.5rem 0.75rem', marginBottom: '0.75rem', border: '1px solid #d1d5db', borderRadius: 6, fontSize: '1rem', boxSizing: 'border-box', minHeight: 80, resize: 'vertical' },
  addBtn: { background: '#2563eb', color: '#fff', border: 'none', padding: '0.55rem 1.25rem', borderRadius: 6, fontSize: '1rem', cursor: 'pointer' },
  sectionTitle: { margin: '0 0 1rem', fontSize: '1.1rem', color: '#111' },
  recadoItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '0.75rem 0', borderBottom: '1px solid #f1f1f1' },
  recadoBody: { flex: 1 },
  recadoTitulo: { fontWeight: 600, marginBottom: '0.2rem', color: '#1e3a5f' },
  recadoTexto: { color: '#374151', fontSize: '0.95rem' },
  deleteBtn: { background: '#dc2626', color: '#fff', border: 'none', padding: '0.3rem 0.7rem', borderRadius: 6, cursor: 'pointer', marginLeft: '1rem', flexShrink: 0 },
  empty: { color: '#9ca3af', textAlign: 'center', padding: '1rem 0' },
  error: { color: '#dc2626', fontSize: '0.85rem', marginBottom: '0.5rem' },
};

export default function Recados() {
  const [recados, setRecados] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [texto, setTexto] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function fetchRecados() {
    try {
      const data = await api.getRecados();
      setRecados(data);
    } catch {
      setError('Erro ao carregar recados.');
    }
  }

  useEffect(() => { fetchRecados(); }, []);

  async function handleAdd(e) {
    e.preventDefault();
    setError('');
    if (!titulo.trim() || !texto.trim()) { setError('Preencha título e texto.'); return; }
    try {
      await api.createRecado(titulo, texto);
      setTitulo('');
      setTexto('');
      fetchRecados();
    } catch {
      setError('Erro ao adicionar recado.');
    }
  }

  async function handleDelete(id) {
    try {
      await api.deleteRecado(id);
      fetchRecados();
    } catch {
      setError('Erro ao excluir recado.');
    }
  }

  async function handleLogout() {
    try { await api.logout(); } catch {}
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <div style={s.page}>
      <header style={s.header}>
        <h1 style={s.headerTitle}>📝 Meus Recados</h1>
        <button style={s.logoutBtn} onClick={handleLogout}>Sair</button>
      </header>

      <main style={s.main}>
        {/* Formulário de novo recado */}
        <div style={s.card}>
          <h2 style={s.sectionTitle}>Novo Recado</h2>
          {error && <p style={s.error}>{error}</p>}
          <form onSubmit={handleAdd}>
            <label style={s.label}>Título</label>
            <input style={s.input} type="text" value={titulo}
              onChange={e => setTitulo(e.target.value)} placeholder="Título do recado" />
            <label style={s.label}>Texto</label>
            <textarea style={s.textarea} value={texto}
              onChange={e => setTexto(e.target.value)} placeholder="Escreva seu recado..." />
            <button style={s.addBtn} type="submit">Adicionar</button>
          </form>
        </div>

        {/* Lista de recados */}
        <div style={s.card}>
          <h2 style={s.sectionTitle}>Recados ({recados.length})</h2>
          {recados.length === 0 ? (
            <p style={s.empty}>Nenhum recado ainda. Adicione o primeiro!</p>
          ) : (
            recados.map(r => (
              <div key={r.id} style={s.recadoItem}>
                <div style={s.recadoBody}>
                  <p style={s.recadoTitulo}>{r.titulo}</p>
                  <p style={s.recadoTexto}>{r.texto}</p>
                </div>
                <button style={s.deleteBtn} onClick={() => handleDelete(r.id)}>Excluir</button>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
