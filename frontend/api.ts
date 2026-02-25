import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Points to your NestJS Backend
});
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;