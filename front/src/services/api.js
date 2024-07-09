import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const fetchUsers = () => api.get('/users');
export const addUser = (user) => api.post('/users', user);
export const sendAlert = (alert) => api.post('/alerts', alert);
export const fetchStats = () => api.get('/stats');
