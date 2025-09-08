import api from './axiosConfig';

export const adminAPI = {
  /* Dashboard */
  getDashboard: () => api.get('/admin/dashboard').then((res) => res.data),

  /* Products */
  getProducts: (params) => api.get('/admin/products', { params }).then((res) => res.data),
  createProduct: (body) => api.post('/admin/products', body).then((res) => res.data),
  updateProduct: (id, body) => api.put(`/admin/products/${id}`, body).then((res) => res.data),
  deleteProduct: (id) => api.delete(`/admin/products/${id}`).then((res) => res.data),

  /* Orders */
  getOrders: (params) => api.get('/admin/orders', { params }).then((res) => res.data),
  updateOrderStatus: (id, status) => api.put(`/admin/orders/${id}/status`, { status }).then((res) => res.data),

  /* Users */
  getUsers: (page) => api.get('/admin/users', { params: { page } }).then((res) => res.data),
  updateUserRole: (id, role) => api.put(`/admin/users/${id}/role`, { role }).then((res) => res.data),
};
