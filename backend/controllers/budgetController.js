// controllers/budgetController.js
const Budget = require('../models/Budget');
const Expense = require('../models/Expense');

const addBudget = async (req, res) => {
    const { budgetAmount } = req.body;
    const userId = req.user.id; // Assuming user ID is stored in req.user.id by the auth middleware
    try {
        const newBudget = new Budget({ userId, budgetAmount });
        await newBudget.save();
        res.status(201).json({ msg: 'Budget added successfully' });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};

const getFinancialAdvice = async (req, res) => {
    const userId = req.params.userId;
    try {
        const budget = await Budget.findOne({ userId });
        const expenses = await Expense.find({ userId });

        if (!budget) {
            return res.status(404).json({ msg: 'No budget found for this user' });
        }

        const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
        const advice = generateFinancialAdvice(budget.budgetAmount, totalExpenses);

        res.status(200).json({ advice });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};

const generateFinancialAdvice = (budget, totalExpenses) => {
    if (totalExpenses > budget) {
        return 'You are overspending. Consider reducing your expenses in certain categories.';
    } else {
        return 'You are within your budget. Keep up the good work!';
    }
};

module.exports = {
    addBudget,
    getFinancialAdvice
};
