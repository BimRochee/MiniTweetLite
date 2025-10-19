import api from './api.js';

// Example API functions using the configured Axios instance
export const authAPI = {
  // Example: Login function
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  // Example: Register function
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  // Example: Get current user
  getCurrentUser: async () => {
    const response = await api.get('/user');
    return response.data;
  },

  // Example: Logout function
  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  }
};
