import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CompanyForm from './components/CompanyForm';
import ProductForm from './components/ProductForm';
import LoginForm from './components/LoginForm';
import Inventory from './components/Inventory';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-black shadow-600 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <div className="text-white text-2xl font-bold">
              Lite Thinking
            </div>
            <ul className="flex space-x-4">
              <li>
                <Link
                  to="/company"
                  className="text-white hover:bg-blue-500 px-3 py-2 rounded transition duration-300">
                  Company
                </Link>
              </li>
              <li>
                <Link
                  to="/product"
                  className="text-white hover:bg-blue-500 px-3 py-2 rounded transition duration-300">
                  Product
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="text-white hover:bg-blue-500 px-3 py-2 rounded transition duration-300">
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/inventory"
                  className="text-white hover:bg-blue-500 px-3 py-2 rounded transition duration-300">
                  Inventory
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="container mx-auto mt-8">
          <Routes>
            <Route path="/company" element={<CompanyForm />} />
            <Route path="/product" element={<ProductForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/inventory" element={<Inventory />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
