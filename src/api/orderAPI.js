import api from './axiosConfig';

export const orderAPI = {
  createOrder: (body) => api.post('/orders', body).then((res) => res.data),
  getMyOrders: () => api.get('/orders/my').then((res) => res.data),
  getOrderById: (id) => api.get(`/orders/${id}`).then((res) => res.data),
  payOrder: (id, paymentResult) => api.put(`/orders/${id}/pay`, paymentResult).then((res) => res.data),
};
