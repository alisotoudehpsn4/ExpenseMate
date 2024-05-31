import React, { useState, useEffect, useCallback } from 'react';
import { Bar } from 'react-chartjs-2';
import budgetService from './services/budgetService';
import expenseService from './services/expenseService';

const AddBudget = () => {
    const [budgetAmount, setBudgetAmount] = useState('');
    const [message, setMessage] = useState('');
    const [budgets, setBudgets] = useState([]);
    const [data, setData] = useState({
        labels: ['Total Budget', 'Total Expenses', 'Remaining Budget'],
        datasets: [{
            label: 'Amount',
            data: [0, 0, 0],
            backgroundColor: ['#4caf50', '#f44336', '#2196f3'],
        }],
    });

    const calculateTotalBudget = useCallback((budgets) => {
        return budgets.reduce((total, budget) => total + budget.budgetAmount, 0);
    }, []);

    const calculateTotalExpenses = useCallback((expenses) => {
        return expenses.reduce((total, expense) => total + expense.amount, 0);
    }, []);

    const updateChartData = useCallback((budgets, expenses) => {
        const totalBudget = calculateTotalBudget(budgets);
        const totalExpenses = calculateTotalExpenses(expenses);
        setData({
            labels: ['Total Budget', 'Total Expenses', 'Remaining Budget'],
            datasets: [{
                label: 'Amount',
                data: [totalBudget, totalExpenses, totalBudget - totalExpenses],
                backgroundColor: ['#4caf50', '#f44336', '#2196f3'],
            }],
        });
    }, [calculateTotalBudget, calculateTotalExpenses]);

    const fetchBudgetsAndExpenses = useCallback(async () => {
        try {
            const [budgetsResult, expensesResult] = await Promise.all([
                budgetService.getBudgets(),
                expenseService.getExpenses(),
            ]);
            setBudgets(budgetsResult.data);
            updateChartData(budgetsResult.data, expensesResult.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setMessage('Error fetching data.');
        }
    }, [updateChartData]);

    useEffect(() => {
        fetchBudgetsAndExpenses();
    }, [fetchBudgetsAndExpenses]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { status } = await budgetService.addBudget({ budgetAmount });
            if (status === 201) {
                setMessage('Budget added successfully!');
                setBudgetAmount('');
                fetchBudgetsAndExpenses();
            } else {
                setMessage('Error adding budget.');
            }
        } catch (error) {
            console.error('Error adding budget:', error);
            setMessage('Error adding budget.');
        }
    };

    const handleEdit = async (id) => {
        const newAmount = prompt('Enter new budget amount:');
        if (!newAmount) return;

        try {
            const { status } = await budgetService.updateBudget(id, { budgetAmount: newAmount });
            if (status === 200) {
                setMessage('Budget updated successfully!');
                fetchBudgetsAndExpenses();
            } else {
                setMessage('Error updating budget.');
            }
        } catch (error) {
            console.error('Error updating budget:', error);
            setMessage('Error updating budget.');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this budget?')) return;

        try {
            const { status } = await budgetService.deleteBudget(id);
            if (status === 200) {
                setMessage('Budget deleted successfully!');
                fetchBudgetsAndExpenses();
            } else {
                setMessage('Error deleting budget.');
            }
        } catch (error) {
            console.error('Error deleting budget:', error);
            setMessage('Error deleting budget.');
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
        </div>
    );
};

export default AddBudget;
