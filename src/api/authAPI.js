import api from './axiosConfig';

export const authAPI = {
  login: (body) => api.post('/auth/login', body).then((res) => res.data),
  register: (body) => api.post('/auth/register', body).then((res) => res.data),
  refresh: () => api.get('/auth/refresh').then((res) => res.data),
  updateProfile: (body) => api.put('/auth/profile', body).then((res) => res.data),
  forgotPassword: (email) => api.post('/auth/forgot', { email }).then((res) => res.data),
  resetPassword: (token, password) => api.post(`/auth/reset/${token}`, { password }).then((res) => res.data),
};
