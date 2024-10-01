import React, { useState } from 'react';
import api from '../services/api';

const CompanyForm = () => {
    const [company, setCompany] = useState({ nit: '', name: '', address: '', phone: '' });
    const [feedback, setFeedback] = useState(null);  // Estado unificado para mensajes de éxito y error

    const handleChange = (e) => setCompany({ ...company, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post(`/orchestrator/commands?aggregateId=${company.nit}`, { type: 'RegisterCompany', ...company });
            setFeedback({ success: 'Company registered successfully!' });
            console.clear();
        } catch (error) {
            console.error('Failed to register the company', error);
            setFeedback({ data: { type: 'RegisterCompany', ...company }, error: error?.response?.data || 'Failed to register the company. Please try again.' });
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-8 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Register Company</h2>
            {feedback?.success && <p className="text-center mt-4 p-2 w-full text-green-600 bg-green-100 border border-green-400 rounded">{feedback.success}</p>}
            {feedback?.error && <p className="text-center mt-4 p-2 w-full text-red-600 bg-red-100 border border-red-400 rounded">{feedback.error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                {['nit', 'name', 'address', 'phone'].map((field) => (
                    <input
                        key={field}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        name={field}
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        value={company[field]}
                        onChange={handleChange}
                        required
                    />
                ))}
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-300">
                    Register
                </button>
            </form>
        </div>
    );
};

export default CompanyForm;
