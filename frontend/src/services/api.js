const BASE_URL = 'http://localhost:8000/api';

function getHeaders() {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: getHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
}

export const api = {
  login: (email, password) =>
    request('/login', { method: 'POST', body: JSON.stringify({ email, password }) }),

  register: (name, email, password, password_confirmation) =>
    request('/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, password_confirmation }),
    }),

  logout: () => request('/logout', { method: 'POST' }),

  getRecados: () => request('/recados'),

  createRecado: (titulo, texto) =>
    request('/recados', { method: 'POST', body: JSON.stringify({ titulo, texto }) }),

  deleteRecado: (id) => request(`/recados/${id}`, { method: 'DELETE' }),
};
