import api from './axiosConfig';

export const categoryAPI = {
  getCategories: () => api.get('/categories').then((res) => res.data),
  createCategory: (body) => api.post('/categories', body).then((res) => res.data),
  updateCategory: (id, body) => api.put(`/categories/${id}`, body).then((res) => res.data),
  deleteCategory: (id) => api.delete(`/categories/${id}`).then((res) => res.data),
};
