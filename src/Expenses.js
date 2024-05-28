// src/Expenses.js

import React, { useState, useEffect } from 'react';
import expenseService from './services/expenseService';

const Expenses = () => {
    const [expenses, setExpenses] = useState([]);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchExpenses = async () => {
            const result = await expenseService.getExpenses();
            setExpenses(result.data);
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

    return (
        <div>
            <h2>Expenses</h2>
            <form onSubmit={handleAddExpense}>
                <div>
                    <label>Description:</label>
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>
                <div>
                    <label>Amount:</label>
                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
                </div>
                <div>
                    <label>Category:</label>
                    <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
                </div>
                <button type="submit">Add Expense</button>
            </form>
            {message && <p>{message}</p>}
            <ul>
                {expenses.map((expense) => (
                    <li key={expense._id}>
                        {expense.description} - ${expense.amount} - {expense.category}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Expenses;
