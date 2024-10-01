import React, { useState } from 'react';
import api from '../services/api';

const Inventory = () => {
    const [email, setEmail] = useState('');
    const [aggregateId, setAggregateId] = useState(''); // Estado para el aggregateId
    const [errorMessage, setErrorMessage] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleAggregateIdChange = (e) => {
        setAggregateId(e.target.value);
    };

    const handleDownloadPdf = async () => {
        setErrorMessage('');
        try {
            const response = await api.get(`http://localhost:8080/projections/download-pdf?aggregateId=${aggregateId}`, {
                responseType: 'blob'
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'inventory.pdf');
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Error downloading PDF:', error);
            setErrorMessage('Failed to download PDF. Please try again later.');
        }
    };

    const handleSendEmail = async () => {
        setErrorMessage('');
        try {
            await api.post('http://localhost:8080/inventory/send-email', { email });
            setErrorMessage('PDF sent successfully!');
        } catch (error) {
            console.error('Error sending PDF via email:', error);
            setErrorMessage('Failed to send PDF. Please check the email address and try again.');
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Inventory Management</h2>
            <div className="flex flex-col items-center space-y-4">

                {/* Campo de entrada para el aggregateId */}
                <input
                    type="text"
                    placeholder="Enter Aggregate ID"
                    value={aggregateId}
                    onChange={handleAggregateIdChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />

                {/* Botón para descargar el PDF */}
                <button
                    onClick={handleDownloadPdf}
                    className="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Download PDF
                </button>

                {/* Campo de entrada de email */}
                <input
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />

                {/* Botón para enviar el PDF por correo */}
                <button
                    onClick={handleSendEmail}
                    className="px-4 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                    Send PDF to Email
                </button>

                {/* Mostrar mensaje de error o éxito */}
                {errorMessage && (
                    <div className="mt-4 p-2 w-full text-center text-red-600 bg-red-100 border border-red-400 rounded">
                        {errorMessage}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Inventory;
