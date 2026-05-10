import api from './axios';

const authService = {

  register: async (name, email, password) => {
    const response = await api.post('/auth/register', {
      name, email, password
    });
    return response.data;
  },

  login: async (email, password) => {
    const response = await api.post('/auth/login', {
      email, password
    });
    if (response.data.token) {
      localStorage.setItem('oishorjo_token', response.data.token);
      localStorage.setItem(
        'oishorjo_user', 
        JSON.stringify(response.data.data)
      );
    }
    return response.data;
  },

  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('oishorjo_token');
    localStorage.removeItem('oishorjo_user');
  },

};

export default authService;
