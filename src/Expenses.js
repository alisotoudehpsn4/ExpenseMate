// src/Expenses.js

import React, { useState, useEffect } from 'react';
import expenseService from './services/expenseService';  // Correct import path

const Expenses = () => {
    const [expenses, setExpenses] = useState([]);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const result = await expenseService.getExpenses();
                setExpenses(result.data);
            } catch (error) {
                setMessage('Failed to fetch expenses. Please log in.');
            }
        };
        fetchExpenses();
    }, []);

    const handleAddExpense = async (e) => {
        e.preventDefault();
        try {
            const newExpense = await expenseService.addExpense(description, amount, category);
            setExpenses([...expenses, newExpense.data]);
            setDescription('');
            setAmount('');
            setCategory('');
            setMessage('');
        } catch (error) {
            setMessage('Failed to add expense. Please try again.');
        }
    };

    const handleDeleteExpense = async (id) => {
        try {
            await expenseService.deleteExpense(id);
            setExpenses(expenses.filter(expense => expense._id !== id));
        } catch (error) {
            setMessage('Failed to delete expense. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="max-w-2xl w-full bg-white p-8 border border-gray-300 rounded-lg">
                <h2 className="text-2xl font-bold mb-6">Expenses</h2>
                <form onSubmit={handleAddExpense} className="space-y-4">
                    <div>
                        <label className="block text-gray-700">Description:</label>
                        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div>
                        <label className="block text-gray-700">Amount:</label>
                        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div>
                        <label className="block text-gray-700">Category:</label>
                        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg">Add Expense</button>
                </form>
                {message && <p className="mt-4 text-red-500">{message}</p>}
                <ul className="mt-6 space-y-4">
                    {expenses.map((expense) => (
                        <li key={expense._id} className="flex justify-between items-center bg-gray-50 p-4 border border-gray-300 rounded-lg">
                            <div>
                                <p className="font-semibold text-lg">{expense.description}</p>
                                <p className="text-gray-600">{expense.category}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-lg text-gray-800">${expense.amount}</p>
                                <button className="text-red-500 hover:text-red-700 ml-4" onClick={() => handleDeleteExpense(expense._id)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Expenses;
