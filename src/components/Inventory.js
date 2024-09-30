import React, { useState } from 'react';
import axios from 'axios';

const Inventory = () => {
    const [email, setEmail] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleDownloadPdf = async () => {
        try {
            const response = await axios.get('http://localhost:8080/inventory/download', {
                responseType: 'blob' // Indica que la respuesta es un archivo binario (PDF)
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'inventory.pdf'); // Nombre del archivo de descarga
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            alert('Failed to download PDF.');
        }
    };

    const handleSendEmail = async () => {
        try {
            await axios.post('http://localhost:8080/inventory/send-email', { email });
            alert('PDF sent successfully!');
        } catch (error) {
            alert('Failed to send email.');
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Inventory Management</h2>
            <div className="flex flex-col items-center space-y-4">
                <button
                    onClick={handleDownloadPdf}
                    className="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Download PDF
                </button>

                <input
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />

                <button
                    onClick={handleSendEmail}
                    className="px-4 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                    Send PDF to Email
                </button>
            </div>
        </div>
    );
};

export default Inventory;
