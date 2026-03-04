import axios from 'axios';

const api = axios.create({
  baseURL: 'https://lux-lettings-backend.vercel.app/',
});

export default api;
