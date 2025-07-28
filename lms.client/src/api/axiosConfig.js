import axios from 'axios';
import { isTokenValid, clearAuthData } from '../utils/authUtils';

const api = axios.create({
    baseURL: 'https://localhost:7173/api/',
});

// Request interceptor
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Response interceptor
api.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response.status === 401) {
        // Handle unauthorized access
        clearAuthData();
        window.location.href = '/login'; 
    }
    return Promise.reject(error);
});

export default api;