import React, { useState, useEffect } from 'react';
import expenseService from './services/expenseService';
import { Pie } from 'react-chartjs-2';

const Dashboard = () => {
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [recentExpenses, setRecentExpenses] = useState([]);
    const [expenseCategories, setExpenseCategories] = useState({});

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const result = await expenseService.getExpenses();
                const expenses = result.data;

                const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
                setTotalExpenses(total);

                const recent = expenses.slice(-5);
                setRecentExpenses(recent);

                const categories = expenses.reduce((acc, expense) => {
                    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
                    return acc;
                }, {});
                setExpenseCategories(categories);
            } catch (error) {
                console.error('Error fetching expenses:', error);
            }
        };
        fetchExpenses();
    }, []);

    const data = {
        labels: Object.keys(expenseCategories),
        datasets: [
            {
                data: Object.values(expenseCategories),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
            },
        ],
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="max-w-3xl w-full bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Dashboard</h2>
                <div className="mb-6 text-center">
                    <h3 className="text-xl font-semibold mb-4">Total Expenses</h3>
                    <p className="text-3xl">${totalExpenses.toFixed(2)}</p>
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
                <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-4">Expenses by Category</h3>
                    <Pie data={data} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
