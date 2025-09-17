// services/apis.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api'; 
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor to add JWT token to requests (for protected routes)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const login = async (credentials) => {
  const response = await api.post('/users/login', credentials); // Expects {email, password}
  const { token, user } = response.data;
  localStorage.setItem('token', token); // Store token for future requests
  return user;
};

export const register = async (userData) => {
  const response = await api.post('/users/register', userData); // Expects {name, email, password}
  return response.data;
};


export const getallRoles = async () => {
  const response = await api.get('/roles/getallroles');  
  return response.data;
}

export default api;