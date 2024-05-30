import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import expenseService from './services/expenseService';

const Dashboard = () => {
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [recentExpenses, setRecentExpenses] = useState([]);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const result = await expenseService.getExpenses();
                const expenses = result.data;

                const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
                setTotalExpenses(total);

                const recent = expenses.slice(-5);
                setRecentExpenses(recent);
            } catch (error) {
                console.error('Error fetching expenses:', error);
            }
        };
        fetchExpenses();
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="max-w-3xl w-full bg-white p-8 border border-gray-300 rounded-lg">
                <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
                <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-4">Total Expenses</h3>
                    <p className="text-2xl">${totalExpenses.toFixed(2)}</p>
                </div>
                <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-4">Recent Expenses</h3>
                    <ul className="space-y-2">
                        {recentExpenses.map((expense) => (
                            <li key={expense._id} className="bg-gray-50 p-4 border border-gray-300 rounded-lg">
                                <div className="flex justify-between items-center">
                                    <p className="font-semibold">{expense.description}</p>
                                    <p>${expense.amount.toFixed(2)}</p>
                                </div>
                                <p className="text-gray-600">{expense.category}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex space-x-4">
                    <Link to="/expenses" className="w-full bg-blue-500 text-white py-2 rounded-lg text-center">View All Expenses</Link>
                    <Link to="/analytics" className="w-full bg-green-500 text-white py-2 rounded-lg text-center">Analytics</Link>
                    <Link to="/settings" className="w-full bg-yellow-500 text-white py-2 rounded-lg text-center">Settings</Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
