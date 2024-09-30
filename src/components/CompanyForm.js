import React, { useState } from 'react';
import axios from 'axios';

const CompanyForm = () => {
    const [company, setCompany] = useState({
        nit: '',
        name: '',
        address: '',
        phone: ''
    });

    const handleChange = (e) => {
        setCompany({ ...company, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/orchestrator', {
                type: 'RegisterCompany',
                ...company
            });
            alert('Company registered successfully!');
        } catch (error) {
            alert('Failed to register company.');
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-8 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Register Company</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    name="nit" placeholder="NIT" value={company.nit} onChange={handleChange} required />
                <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    name="name" placeholder="Company Name" value={company.name} onChange={handleChange} required />
                <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    name="address" placeholder="Address" value={company.address} onChange={handleChange} required />
                <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    name="phone" placeholder="Phone" value={company.phone} onChange={handleChange} required />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-300">
                    Register
                </button>
            </form>
        </div>
    );
};

export default CompanyForm;
