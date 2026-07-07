import api from './api';

export const getEmployees = async (params) => {
  const res = await api.get('/employees', { params });
  return res.data;
};

export const getEmployeeById = async (id) => {
  const res = await api.get(`/employees/${id}`);
  return res.data;
};

export const createEmployee = async (formData) => {
  const res = await api.post('/employees', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

export const updateEmployee = async (id, formData) => {
  const res = await api.put(`/employees/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

export const deleteEmployee = async (id) => {
  const res = await api.delete(`/employees/${id}`);
  return res.data;
};

export const getMetaOptions = async () => {
  const res = await api.get('/employees/meta/options');
  return res.data;
};
