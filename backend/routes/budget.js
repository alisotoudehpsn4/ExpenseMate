const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { addBudget, getFinancialAdvice } = require('../controllers/budgetController');

// @route   POST api/budget
// @desc    Add a new budget
// @access  Private
router.post('/', auth, addBudget);

// @route   GET api/budget/advice/:userId
// @desc    Get financial advice
// @access  Private
router.get('/advice/:userId', auth, getFinancialAdvice);

module.exports = router;
