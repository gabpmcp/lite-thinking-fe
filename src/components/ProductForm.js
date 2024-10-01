import React, { useState } from 'react';
import api from '../services/api';  // Importar la instancia de Axios configurada

const ProductForm = () => {
    const [product, setProduct] = useState({
        code: '',
        name: '',
        characteristics: '',
        prices: '',
        companyNIT: ''
    });

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const addProduct = async (aggregateId, product) => {
        try {
            const response = await api.post(`/orchestrator/commands?aggregateId=${aggregateId}`, {
                type: 'AddProduct',
                ...product
            });
            console.log('Product added successfully', response.data);
        } catch (error) {
            console.error('Failed to add product', error);
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-8 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Add Product</h2>
            <form onSubmit={addProduct(product.companyNIT, product)} className="space-y-4">
                <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    name="code" placeholder="Product Code" value={product.code} onChange={handleChange} required />
                <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    name="name" placeholder="Product Name" value={product.name} onChange={handleChange} required />
                <textarea
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    name="characteristics" placeholder="Characteristics" value={product.characteristics} onChange={handleChange} required />
                <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    name="prices" placeholder="Prices (comma-separated)" value={product.prices} onChange={handleChange} required />
                <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    name="companyId" placeholder="Company ID" value={product.companyNIT} onChange={handleChange} required />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-300">
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default ProductForm;
