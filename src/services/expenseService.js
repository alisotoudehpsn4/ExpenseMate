// src/services/expenseService.js

import axios from 'axios';

const API_URL = 'http://localhost:5002/api/expenses/';

// Get all expenses
const getExpenses = () => {
    return axios.get(API_URL, {
        headers: { 'x-auth-token': JSON.parse(localStorage.getItem('user')).token }
    });
};

// Add a new expense
const addExpense = (description, amount, category) => {
    return axios.post(API_URL, {
        description,
        amount,
        category
    }, {
        headers: { 'x-auth-token': JSON.parse(localStorage.getItem('user')).token }
    });
};

// Update an expense
const updateExpense = (id, description, amount, category) => {
    return axios.put(API_URL + id, {
        description,
        amount,
        category
    }, {
        headers: { 'x-auth-token': JSON.parse(localStorage.getItem('user')).token }
    });
};

// Delete an expense
const deleteExpense = (id) => {
    return axios.delete(API_URL + id, {
        headers: { 'x-auth-token': JSON.parse(localStorage.getItem('user')).token }
    });
};

export default {
    getExpenses,
    addExpense,
    updateExpense,
    deleteExpense
};
