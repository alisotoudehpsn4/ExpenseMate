// components/AddBudget.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddBudget = () => {
    const [budgetAmount, setBudgetAmount] = useState('');
    const [message, setMessage] = useState('');
    const [budgets, setBudgets] = useState([]);

    useEffect(() => {
        fetchBudgets();
    }, []);

    const fetchBudgets = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setMessage('No token found, authorization denied');
                return;
            }

            const response = await axios.get('http://localhost:5002/api/budget/budgets', {
                headers: {
                    'x-auth-token': token,
                },
            });

            setBudgets(response.data);
        } catch (error) {
            console.error('There was an error fetching the budgets:', error);
            setMessage('There was an error fetching the budgets.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setMessage('No token found, authorization denied');
                return;
            }

            const response = await axios.post(
                'http://localhost:5002/api/budget',
                { budgetAmount },
                {
                    headers: {
                        'x-auth-token': token,
                    },
                }
            );

            if (response.status === 201) {
                setMessage('Budget added successfully!');
                setBudgetAmount('');
                fetchBudgets(); // Update the list after adding a new budget
            } else {
                setMessage('There was an error adding the budget.');
            }
        } catch (error) {
            console.error('There was an error adding the budget:', error);
            setMessage('There was an error adding the budget.');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Add Budget</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="budgetAmount" className="block text-gray-700 font-medium mb-2">Budget Amount:</label>
                    <input
                        type="number"
                        id="budgetAmount"
                        value={budgetAmount}
                        onChange={(e) => setBudgetAmount(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
                >
                    Add Budget
                </button>
            </form>
            {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
            <h3 className="text-xl font-bold mt-6 text-gray-800">Budgets</h3>
            <ul className="list-disc pl-5">
                {budgets.map((budget) => (
                    <li key={budget._id} className="text-gray-700">{budget.budgetAmount}</li>
                ))}
            </ul>
        </div>
    );
};

export default AddBudget;
