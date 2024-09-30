import React, { useState } from 'react';
import api from '../services/loginApi';  // Importa la instancia de Axios con el interceptor configurado

const LoginForm = ({ onLoginSuccess }) => {
    // Estados para username, password y errores
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Función para manejar el submit del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Username:', username);
            // Hacer la solicitud de login enviando el username en lugar del email
            const response = await api.post('/auth/login', { username, password });

            // Guardar el token en localStorage
            const token = response.data.token;
            localStorage.setItem('token', token);

            console.log('Token:', token);

            // Llamar la función de éxito
            onLoginSuccess();
        } catch (error) {
            console.log('Error:', error);
            // Mostrar error si ocurre fallo en la autenticación
            setError('Invalid username or password');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            {error && <p className="text-red-500">{error}</p>}
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="block w-full p-2 mb-4 border rounded"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="block w-full p-2 mb-4 border rounded"
                required
            />
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                Login
            </button>
        </form>
    );
};

export default LoginForm;