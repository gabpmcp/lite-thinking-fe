import axios from 'axios';

// Configurar el axios instance
const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interceptor para agregar el token en la cabecera Authorization
api.interceptors.request.use(
    (config) => {
        // Obtener el token de localStorage
        const token = localStorage.getItem('token');

        // Si hay un token, agregarlo a la cabecera Authorization
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const registerCompany = (company) => api.post('/orchestrator', company);
export const addProduct = (product) => api.post('/orchestrator', product);
export const login = (credentials) => api.post('/auth/login', credentials);
export const downloadInventoryPdf = () => api.get('/inventory/download', { responseType: 'blob' });
export const sendInventoryEmail = (email) => api.post('/inventory/send-email', { email });

export default api;
