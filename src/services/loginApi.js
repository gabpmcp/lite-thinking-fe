import axios from 'axios';

// Instancia de Axios sin el interceptor para el login
const loginApi = axios.create({
    baseURL: 'http://localhost:8080',  // Apunta al mismo backend
    headers: {
        'Content-Type': 'application/json'
    }
});

export default loginApi;
