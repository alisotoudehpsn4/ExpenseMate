const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { addBudget, getFinancialAdvice, getBudgets, updateBudget, deleteBudget } = require('../controllers/budgetController');

// @route   POST api/budget
// @desc    Add a new budget
// @access  Private
router.post('/', auth, addBudget);

// @route   GET api/budget/advice/:userId
// @desc    Get financial advice
// @access  Private
router.get('/advice/:userId', auth, getFinancialAdvice);

// @route   GET api/budget/budgets
// @desc    Get all budgets for the authenticated user
// @access  Private
router.get('/budgets', auth, getBudgets);

// @route   PUT api/budget/:id
// @desc    Update a budget
// @access  Private
router.put('/:id', auth, updateBudget); 

// @route   DELETE api/budget/:id
// @desc    Delete a budget
// @access  Private
router.delete('/:id', auth, deleteBudget); 

module.exports = router;
