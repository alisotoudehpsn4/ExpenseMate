const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
    addExpense,
    getExpenses,
    updateExpense,
    deleteExpense
} = require('../controllers/expenseController');

// @route   POST api/expenses
// @desc    Add a new expense
router.post('/', auth, addExpense);

// @route   GET api/expenses
// @desc    Get all expenses for a user
router.get('/', auth, getExpenses);

// @route   PUT api/expenses/:id
// @desc    Update an expense
router.put('/:id', auth, updateExpense);

// @route   DELETE api/expenses/:id
// @desc    Delete an expense
router.delete('/:id', auth, deleteExpense);

module.exports = router;
