import React, { useState, useEffect } from 'react';
import expenseService from './services/expenseService';
import CustomDropdown, { categories } from './CustomDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import EditExpenseModal from './EditExpenseModal';

const Expenses = () => {
    const [expenses, setExpenses] = useState([]);
    const [addDescription, setAddDescription] = useState('');
    const [addAmount, setAddAmount] = useState('');
    const [addCategory, setAddCategory] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [sortCriteria, setSortCriteria] = useState('');
    const [message, setMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingExpense, setEditingExpense] = useState(null);

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

        const parsedAmount = parseFloat(addAmount);
        if (isNaN(parsedAmount) || parsedAmount <= 0) {
            setMessage('Please enter a valid amount greater than zero.');
            console.log('Invalid amount:', addAmount);
            return;
        }

        try {
            const expenseData = {
                description: addDescription,
                amount: parsedAmount,
                category: addCategory
            };
            console.log('Sending expense data:', expenseData);
            const newExpense = await expenseService.addExpense(expenseData);
            setExpenses([...expenses, newExpense.data]);
            setAddDescription('');
            setAddAmount('');
            setAddCategory('');
            setMessage('');
        } catch (error) {
            console.error('Error adding expense:', error.response ? error.response.data : error.message);
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

    const handleEditExpense = (expense) => {
        setEditingExpense(expense);
        setIsModalOpen(true);
    };

    const handleSaveExpense = async (updatedExpense) => {
        try {
            console.log('Updated expense data:', updatedExpense);
            const response = await expenseService.updateExpense(editingExpense._id, {
                description: updatedExpense.description,
                amount: updatedExpense.amount,
                category: updatedExpense.category,
            });
            console.log('Server response:', response);
            setExpenses(expenses.map(expense => (expense._id === editingExpense._id ? response.data : expense)));
            setIsModalOpen(false);
            setEditingExpense(null);
        } catch (error) {
            console.error('Error updating expense:', error.response ? error.response.data : error.message);
            setMessage('Failed to update expense. Please try again.');
        }
    };

    const handleFilterChange = (e) => {
        setFilterCategory(e.target.value);
    };

    const handleSortChange = (e) => {
        setSortCriteria(e.target.value);
    };

    const filteredExpenses = expenses.filter(expense => {
        if (!filterCategory) return true;
        return expense.category === filterCategory;
    });

    const sortedExpenses = filteredExpenses.sort((a, b) => {
        if (sortCriteria === 'amount') {
            return b.amount - a.amount;
        } else if (sortCriteria === 'date') {
            return new Date(b.createdAt) - new Date(a.createdAt);
        }
        return 0;
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="max-w-2xl w-full bg-white p-8 border border-gray-300 rounded-lg">
                <h2 className="text-2xl font-bold mb-6">Expenses</h2>
                <form onSubmit={handleAddExpense} className="space-y-4">
                    <div>
                        <label className="block text-gray-700">Description:</label>
                        <input type="text" value={addDescription} onChange={(e) => setAddDescription(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div>
                        <label className="block text-gray-700">Amount:</label>
                        <input type="number" value={addAmount} onChange={(e) => setAddAmount(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div>
                        <label className="block text-gray-700">Category:</label>
                        <CustomDropdown value={addCategory} onChange={setAddCategory} />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg">Add Expense</button>
                </form>
                {message && <p className="mt-4 text-red-500">{message}</p>}
                <div className="mt-6 flex justify-between items-center">
                    <div>
                        <label className="block text-gray-700">Filter by Category:</label>
                        <select value={filterCategory} onChange={handleFilterChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                            <option value="">All</option>
                            {categories.map((cat) => (
                                <option key={cat.name} value={cat.name}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700">Sort by:</label>
                        <select value={sortCriteria} onChange={handleSortChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                            
                            <option value="amount">Amount</option>
                            <option value="date">Date</option>
                        </select>
                    </div>
                </div>
                <ul className="mt-6 space-y-4">
                    {sortedExpenses.map((expense) => (
                        <li key={expense._id} className="flex justify-between items-center bg-gray-50 p-4 border border-gray-300 rounded-lg">
                            <div>
                                <p className="font-semibold text-lg">{expense.description}</p>
                                <p className="text-gray-600">
                                    {categories.find(cat => cat.name === expense.category)?.icon && (
                                        <FontAwesomeIcon icon={categories.find(cat => cat.name === expense.category).icon} className="mr-2" />
                                    )}
                                    {expense.category}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-lg text-gray-800">${expense.amount}</p>
                                <button className="text-blue-500 hover:text-blue-700 ml-4" onClick={() => handleEditExpense(expense)}>
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                                <button className="text-red-500 hover:text-red-700 ml-4" onClick={() => handleDeleteExpense(expense._id)}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <EditExpenseModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                expense={editingExpense}
                onSave={handleSaveExpense}
            />
        </div>
    );
};

export default Expenses;
