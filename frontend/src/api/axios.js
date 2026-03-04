import axios from 'axios';

const api = axios.create({
  baseURL: 'https://lux-lettings-backend.vercel.app/',
  
  // baseURL: 'http://localhost:3010',
});

export default api;
