const Expense = require('../models/Expense');

// Add a new expense
const addExpense = async (req, res) => {
    const { description, amount, category } = req.body;

    try {
        console.log('Received data:', { description, amount, category }); // Log the received data
        const newExpense = new Expense({
            user: req.user.id,
            description: String(description), // Ensure description is a string
            amount: parseFloat(amount), // Ensure amount is a number
            category: String(category), // Ensure category is a string
        });

        const expense = await newExpense.save();
        res.json(expense);
    } catch (err) {
        console.error('Error saving expense:', err.message); // Log the error message
        res.status(500).send('Server error');
    }
};

// Get all expenses for a user
const getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ user: req.user.id });
        res.json(expenses);
    } catch (err) {
        console.error('Error fetching expenses:', err.message); // Log the error message
        res.status(500).send('Server error');
    }
};

// Update an expense
const updateExpense = async (req, res) => {
    const { description, amount, category } = req.body;

    try {
        console.log('Update data:', { description, amount, category }); // Log the update data
        let expense = await Expense.findById(req.params.id);

        if (!expense) return res.status(404).json({ msg: 'Expense not found' });

        // Make sure user owns expense
        if (expense.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        const updatedData = {
            description: String(description.description), // Correctly extract description
            amount: parseFloat(description.amount), // Correctly extract amount
            category: String(description.category) // Correctly extract category
        };

        expense = await Expense.findByIdAndUpdate(
            req.params.id,
            { $set: updatedData },
            { new: true }
        );

        res.json(expense);
    } catch (err) {
        console.error('Error updating expense:', err.message); // Log the error message
        res.status(500).send('Server error');
    }
};

// Delete an expense
const deleteExpense = async (req, res) => {
    try {
        let expense = await Expense.findById(req.params.id);

        if (!expense) return res.status(404).json({ msg: 'Expense not found' });

        // Make sure user owns expense
        if (expense.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await Expense.findByIdAndDelete(req.params.id);

        res.json({ msg: 'Expense removed' });
    } catch (err) {
        console.error('Error deleting expense:', err.message); // Log the error message
        res.status(500).send('Server error');
    }
};

module.exports = {
    addExpense,
    getExpenses,
    updateExpense,
    deleteExpense
};
