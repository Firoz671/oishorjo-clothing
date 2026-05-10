import api from './axios';

const orderService = {

  placeOrder: async (items, shippingAddress, paymentMethod) => {
    const response = await api.post('/orders', {
      items, shippingAddress, paymentMethod
    });
    return response.data;
  },

  getMyOrders: async () => {
    const response = await api.get('/orders/my');
    return response.data;
  },

  getOrderById: async (id) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

};

export default orderService;
