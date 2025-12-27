// API Service
// Centralizes all API calls to the backend
// Uses axios for HTTP requests

import axios from 'axios';

// Create axios instance with base URL
// In development, requests go to http://localhost:5000
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

// Interceptor to add JWT token to every request
// This runs before every API call
API.interceptors.request.use((config) => {
  // Get token from localStorage
  const token = localStorage.getItem('authToken');
  
  // If token exists, add it to Authorization header
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

// API Functions

// Register a new user
// POST /api/auth/register
export const registerUser = (userData) => {
  return API.post('/auth/register', userData);
};

// Login user
// POST /api/auth/login
export const loginUser = (credentials) => {
  return API.post('/auth/login', credentials);
};

// Get current logged-in user
// GET /api/auth/me (protected route)
export const getCurrentUser = () => {
  return API.get('/auth/me');
};

export default API;
