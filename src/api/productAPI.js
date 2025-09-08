import api from './axiosConfig';
export const productAPI = {
  getProducts: (params) => api.get('/products', { params }).then((res) => res.data),
  getProduct: (id) => api.get(`/products/${id}`).then((res) => res.data),
  getFeatured: () => api.get('/products/featured').then((res) => res.data),
  createReview: (id, body) => api.post(`/products/${id}/reviews`, body).then((res) => res.data),
};
