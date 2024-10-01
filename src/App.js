import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';  // Importa tu formulario de login
import CompanyForm from './components/CompanyForm';  // Importa tus otros componentes
import Inventory from './components/Inventory';
import ProductForm from './components/ProductForm';

const Dashboard = ({ handleLogout }) => {
  return (
    <nav className="bg-black bg-opacity-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <ul className="flex space-x-4">
          <li>
            <Link to="/company" className="text-white hover:bg-blue-500 px-3 py-2 rounded transition duration-300">
              Company
            </Link>
          </li>
          <li>
            <Link to="/product" className="text-white hover:bg-blue-500 px-3 py-2 rounded transition duration-300">
              Product
            </Link>
          </li>
          <li>
            <Link to="/inventory" className="text-white hover:bg-blue-500 px-3 py-2 rounded transition duration-300">
              Inventory
            </Link>
          </li>
          <li>
            <button
              className="text-white hover:bg-red-500 px-3 py-2 rounded transition duration-300"
              onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

const MainApp = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();  // Hook para redirigir al usuario

  // Función que se llama cuando el login es exitoso
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    navigate('/dashboard');  // Redirige al dashboard después del login
  };

  // Función para manejar el logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token');  // Eliminar el token
    navigate('/login');  // Redirigir al login
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Condicionalmente mostrar el contenido */}
      {isAuthenticated ? (
        <Dashboard handleLogout={handleLogout} />
      ) : (
        <nav className="bg-black p-4 text-white">
          <div className="container mx-auto">
            <h1 className="text-xl font-bold">Lite Thinking</h1>
          </div>
        </nav>
      )}

      <div className="container mx-auto mt-10">
        <Routes>
          {/* Ruta del login */}
          <Route
            path="/login"
            element={!isAuthenticated ? <LoginForm onLoginSuccess={handleLoginSuccess} /> : <Navigate to="/dashboard" />}
          />
          {/* Ruta del dashboard que muestra el menú para los otros componentes */}
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Navigate to="/company" /> : <Navigate to="/login" />}
          />
          {/* Rutas para los demás componentes, accesibles solo si está autenticado */}
          <Route
            path="/company"
            element={isAuthenticated ? <CompanyForm /> : <Navigate to="/login" />}
          />
          <Route
            path="/product"
            element={isAuthenticated ? <ProductForm /> : <Navigate to="/login" />}
          />
          <Route
            path="/inventory"
            element={isAuthenticated ? <Inventory /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <MainApp />
    </Router>
  );
};

export default App;
