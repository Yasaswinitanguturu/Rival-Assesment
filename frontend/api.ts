import axios from 'axios';

const api = axios.create({
  // This line tells the code to use the Vercel variable, 
  // and only use localhost if the variable is missing.
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000', 
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