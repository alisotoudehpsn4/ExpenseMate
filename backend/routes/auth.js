const express = require('express');
const router = express.Router();
const { registerUser, loginUser, updateUser, changePassword } = require('../controllers/authController');
const auth = require('../middleware/auth');

// @route   POST api/auth/register
// @desc    Register a new user
router.post('/register', registerUser);

// @route   POST api/auth/login
// @desc    Login a user
router.post('/login', loginUser);

// @route   PUT api/auth/update
// @desc    Update user profile
// @access  Private
router.put('/update', auth, updateUser);

// @route   PUT api/auth/change-password
// @desc    Change user password
// @access  Private
router.put('/change-password', auth, changePassword);

module.exports = router;
