import api from './api';

export const login = async (email, password) => {
  const res = await api.post('/auth/login', { email, password });
  if (res.data?.data?.token) {
    localStorage.setItem('token', res.data.data.token);
  }
  return res.data;
};

export const logout = async () => {
  await api.post('/auth/logout');
  localStorage.removeItem('token');
};

export const getMe = async () => {
  const res = await api.get('/auth/me');
  return res.data;
};
