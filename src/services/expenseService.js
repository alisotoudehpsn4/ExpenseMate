// src/services/expenseService.js

import axios from 'axios';

const API_URL = 'http://localhost:5002/api/expenses/';

// Get all expenses
const getExpenses = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        return axios.get(API_URL, {
            headers: { 'x-auth-token': user.token }
        });
    }
    return Promise.reject('No token available');
};

// Add a new expense
const addExpense = (expenseData) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        return axios.post(API_URL, expenseData, {
            headers: { 'x-auth-token': user.token }
        });
    }
    return Promise.reject('No token available');
};

// Update an expense
const updateExpense = (id, description, amount, category) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        return axios.put(API_URL + id, {
            description,
            amount,
            category
        }, {
            headers: { 'x-auth-token': user.token }
        });
    }
    return Promise.reject('No token available');
};

// Delete an expense
const deleteExpense = (id) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        return axios.delete(API_URL + id, {
            headers: { 'x-auth-token': user.token }
        });
    }
    return Promise.reject('No token available');
};

const expenseService = {
    getExpenses,
    addExpense,
    updateExpense,
    deleteExpense
};

export default expenseService;
