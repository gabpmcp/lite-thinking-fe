import React, { useState } from 'react';
import api from '../services/api';

const ProductForm = () => {
    const [product, setProduct] = useState({
        code: '', name: '', characteristics: '', prices: {}, companyNIT: ''
    });
    const [currency, setCurrency] = useState('');
    const [price, setPrice] = useState('');
    const [message, setMessage] = useState(null);

    const handleChange = e => setProduct({ ...product, [e.target.name]: e.target.value });

    const handlePriceChange = (e) => {
        const { name, value } = e.target;
        name === "currency" ? setCurrency(value) : setPrice(value);
    };

    const addPrice = () => {
        if (currency && price) {
            setProduct({
                ...product,
                prices: { ...product.prices, [currency]: parseFloat(price) }
            });
            setCurrency('');
            setPrice('');
        }
    };

    const addProduct = async (e) => {
        e.preventDefault();
        try {
            await api.post(`/orchestrator/commands?aggregateId=${product.companyNIT}`, {
                type: 'AddProduct', ...product, companyId: product.companyNIT
            });
            setMessage({ text: 'Product added successfully!', error: false });
            setProduct({ code: '', name: '', characteristics: '', prices: {}, companyNIT: '' });
        } catch (error) {
            console.error('Failed to add product', error);
            setMessage({ data: { type: 'AddProduct', ...product }, text: 'Failed to add product.', error: true });
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-8 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Add Product</h2>
            {message && (
                <div className={`text-center ${message.error ? 'text-red-500' : 'text-green-500'}`}>
                    {message.text}
                </div>
            )}
            <form onSubmit={addProduct} className="space-y-4">
                {['code', 'name', 'characteristics', 'companyNIT'].map(field => (
                    <input
                        key={field}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        name={field}
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        value={product[field]}
                        onChange={handleChange}
                        required
                    />
                ))}

                {/* Section for adding prices */}
                <div className="flex space-x-4">
                    <input
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        name="currency" placeholder="Currency" value={currency} onChange={handlePriceChange} />
                    <input
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        name="price" placeholder="Price" value={price} onChange={handlePriceChange} type="number" />
                    <button type="button" onClick={addPrice} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                        Add Price
                    </button>
                </div>

                {/* Display added prices */}
                <div>
                    <h3 className="text-lg font-bold">Prices</h3>
                    <ul>
                        {Object.entries(product.prices).map(([currency, price]) => (
                            <li key={currency}>{currency}: {price}</li>
                        ))}
                    </ul>
                </div>

                <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default ProductForm;
