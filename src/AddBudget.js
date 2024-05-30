import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { jwtDecode } from 'jwt-decode'; // Correct the import statement

const AddBudget = () => {
    const [budgetAmount, setBudgetAmount] = useState('');
    const [message, setMessage] = useState('');
    const [budgets, setBudgets] = useState([]);
    const [financialAdvice, setFinancialAdvice] = useState('');

    const calculateTotalBudget = () => budgets.reduce((total, budget) => total + budget.budgetAmount, 0);

    useEffect(() => {
        fetchBudgets();
        fetchFinancialAdvice();
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

    const fetchFinancialAdvice = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setMessage('No token found, authorization denied');
                return;
            }

            const decoded = jwtDecode(token); // Correct the usage
            const userId = decoded.user.id;

            const response = await axios.get(`http://localhost:5002/api/budget/advice/${userId}`, {
                headers: {
                    'x-auth-token': token,
                },
            });

            const { advice } = response.data;
            setFinancialAdvice(advice);
        } catch (error) {
            console.error('There was an error fetching the financial advice:', error);
            setMessage('There was an error fetching the financial advice.');
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
                fetchBudgets();
                fetchFinancialAdvice();
            } else {
                setMessage('There was an error adding the budget.');
            }
        } catch (error) {
            console.error('There was an error adding the budget:', error);
            setMessage('There was an error adding the budget.');
        }
    };

    const handleEdit = async (id) => {
        const newAmount = prompt('Enter new budget amount:');
        if (!newAmount) return;

        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(
                `http://localhost:5002/api/budget/${id}`,
                { budgetAmount: newAmount },
                {
                    headers: {
                        'x-auth-token': token,
                    },
                }
            );

            if (response.status === 200) {
                setMessage('Budget updated successfully!');
                fetchBudgets();
                fetchFinancialAdvice();
            } else {
                setMessage('There was an error updating the budget.');
            }
        } catch (error) {
            console.error('There was an error updating the budget:', error);
            setMessage('There was an error updating the budget.');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this budget?')) return;

        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(
                `http://localhost:5002/api/budget/${id}`,
                {
                    headers: {
                        'x-auth-token': token,
                    },
                }
            );

            if (response.status === 200) {
                setMessage('Budget deleted successfully!');
                fetchBudgets();
                fetchFinancialAdvice();
            } else {
                setMessage('There was an error deleting the budget.');
            }
        } catch (error) {
            console.error('There was an error deleting the budget:', error);
            setMessage('There was an error deleting the budget.');
        }
    };

    useEffect(() => {
        const totalExpenses = 9380.43; // Assuming the correct total expenses fetched from Dashboard.js
        setData({
            labels: ['Total Budget', 'Total Expenses', 'Remaining Budget'],
            datasets: [
                {
                    label: 'Amount',
                    data: [calculateTotalBudget(), totalExpenses, calculateTotalBudget() - totalExpenses],
                    backgroundColor: ['#4caf50', '#f44336', '#2196f3'],
                },
            ],
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [budgets]);

    const [data, setData] = useState({
        labels: ['Total Budget', 'Total Expenses', 'Remaining Budget'],
        datasets: [
            {
                label: 'Amount',
                data: [calculateTotalBudget(), 0, calculateTotalBudget()],
                backgroundColor: ['#4caf50', '#f44336', '#2196f3'],
            },
        ],
    });

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
                    <li key={budget._id} className="text-gray-700">
                        {budget.budgetAmount}
                        <button onClick={() => handleEdit(budget._id)} className="text-blue-500 ml-2">Edit</button>
                        <button onClick={() => handleDelete(budget._id)} className="text-red-500 ml-2">Delete</button>
                    </li>
                ))}
            </ul>
            <div className="mt-6">
                <Bar data={data} />
            </div>
            {financialAdvice && (
                <div className="mt-6 bg-gray-100 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold text-gray-800">Nice!</h4>
                    <p className="text-gray-700">{financialAdvice}</p>
                </div>
            )}
        </div>
    );
};

export default AddBudget;
