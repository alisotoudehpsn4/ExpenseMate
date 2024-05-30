// components/FinancialAdvice.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FinancialAdvice = ({ userId }) => {
    const [advice, setAdvice] = useState('');

    useEffect(() => {
        const fetchAdvice = async () => {
            try {
                const response = await axios.get(`/api/budget/advice/${userId}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }); // Ensure the token is included in the headers
                setAdvice(response.data.advice);
            } catch (error) {
                console.error('There was an error fetching the financial advice!', error);
            }
        };

        fetchAdvice();
    }, [userId]);

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Financial Advice</h2>
            <p className="text-gray-700">{advice}</p>
        </div>
    );
};

export default FinancialAdvice;
