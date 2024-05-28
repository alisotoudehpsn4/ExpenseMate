// src/Analytics.js

import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import expenseService from './services/expenseService';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Analytics = () => {
    const [chartData, setChartData] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchExpenses = async () => {
        try {
            const result = await expenseService.getExpenses();
            const expenses = result.data;

            if (!expenses) {
                return;
            }

            const categories = [...new Set(expenses.map(exp => exp.category))];
            const data = categories.map(category => {
                return expenses
                    .filter(exp => exp.category === category)
                    .reduce((total, exp) => total + exp.amount, 0);
            });

            setChartData({
                labels: categories,
                datasets: [
                    {
                        label: 'Expenses by Category',
                        data: data,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(153, 102, 255, 0.6)',
                            'rgba(255, 159, 64, 0.6)',
                            'rgba(255, 99, 132, 0.6)',
                        ],
                    },
                ],
            });

            setLoading(false);
        } catch (error) {
            console.error('Error fetching expenses', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="max-w-2xl w-full bg-white p-8 border border-gray-300 rounded-lg">
                <h2 className="text-2xl font-bold mb-6">Expense Analytics</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <Bar data={chartData} />
                )}
            </div>
        </div>
    );
};

export default Analytics;
