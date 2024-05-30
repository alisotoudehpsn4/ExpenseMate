import React, { useEffect, useState } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';
import expenseService from './services/expenseService';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);

const Analytics = () => {
    const [barChartData, setBarChartData] = useState({});
    const [pieChartData, setPieChartData] = useState({});
    const [lineChartData, setLineChartData] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchExpenses = async () => {
        try {
            const result = await expenseService.getExpenses();
            const expenses = result.data;

            if (!expenses) {
                setLoading(false);
                return;
            }

            // Bar Chart Data (Expenses by Category)
            const categories = [...new Set(expenses.map(exp => exp.category))];
            const barData = categories.map(category => {
                return expenses
                    .filter(exp => exp.category === category)
                    .reduce((total, exp) => total + exp.amount, 0);
            });

            setBarChartData({
                labels: categories,
                datasets: [
                    {
                        label: 'Expenses by Category',
                        data: barData,
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

            // Pie Chart Data (Expenses by Category)
            setPieChartData({
                labels: categories,
                datasets: [
                    {
                        label: 'Expenses by Category',
                        data: barData,
                        backgroundColor: [
                            '#FF6384',
                            '#36A2EB',
                            '#FFCE56',
                            '#4BC0C0',
                            '#9966FF',
                            '#FF9F40',
                        ],
                        hoverBackgroundColor: [
                            '#FF6384',
                            '#36A2EB',
                            '#FFCE56',
                            '#4BC0C0',
                            '#9966FF',
                            '#FF9F40',
                        ]
                    }
                ],
            });

            // Line Chart Data (Expenses Over Time)
            const expensesByDate = expenses.reduce((acc, expense) => {
                const date = new Date(expense.date).toLocaleDateString();
                acc[date] = (acc[date] || 0) + expense.amount;
                return acc;
            }, {});

            setLineChartData({
                labels: Object.keys(expensesByDate),
                datasets: [
                    {
                        label: 'Expenses Over Time',
                        data: Object.values(expensesByDate),
                        fill: false,
                        backgroundColor: '#36A2EB',
                        borderColor: '#36A2EB',
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
                <h2 className="text-2xl font-bold mb-6">Expenses Analytics</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        <div className="chart-container mb-8">
                            <h3 className="text-xl mb-4">Expenses by Category</h3>
                            <Bar data={barChartData} />
                        </div>
                        <div className="chart-container mb-8">
                            <h3 className="text-xl mb-4">Expenses by Category (Pie Chart)</h3>
                            <Pie data={pieChartData} />
                        </div>
                        <div className="chart-container">
                            <h3 className="text-xl mb-4">Expenses Over Time</h3>
                            <Line data={lineChartData} />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Analytics;
