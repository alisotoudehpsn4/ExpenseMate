import React, { useState, useEffect } from 'react';
import CustomDropdown from './CustomDropdown'; // Import the custom dropdown

const EditExpenseModal = ({ isOpen, onClose, expense, onSave }) => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        if (expense && isOpen) {
            setDescription(expense.description);
            setAmount(expense.amount);
            setCategory(expense.category);
        }
    }, [expense, isOpen]);

    const handleSave = () => {
        onSave({
            ...expense,
            description,
            amount: parseFloat(amount),
            category
        });
    };

    const handleClose = () => {
        onClose();
        setDescription('');
        setAmount('');
        setCategory('');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Edit Expense</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-gray-700">Description:</label>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Amount:</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Category:</label>
                        <CustomDropdown value={category} onChange={setCategory} />
                    </div>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                    <button
                        onClick={handleClose}
                        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditExpenseModal;
