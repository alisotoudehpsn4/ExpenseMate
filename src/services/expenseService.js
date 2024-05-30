import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5002/api/expenses/';

const getExpenses = () => {
    const token = Cookies.get('token');
    if (token) {
        return axios.get(API_URL, {
            headers: { 'x-auth-token': token }
        });
    }
    return Promise.reject('No token available');
};

const addExpense = (expenseData) => {
    const token = Cookies.get('token');
    if (token) {
        return axios.post(API_URL, expenseData, {
            headers: { 'x-auth-token': token }
        });
    }
    return Promise.reject('No token available');
};

const updateExpense = (id, description, amount, category) => {
    const token = Cookies.get('token');
    if (token) {
        return axios.put(`${API_URL}${id}`, {
            description,
            amount,
            category
        }, {
            headers: { 'x-auth-token': token }
        });
    }
    return Promise.reject('No token available');
};

const deleteExpense = (id) => {
    const token = Cookies.get('token');
    if (token) {
        return axios.delete(`${API_URL}${id}`, {
            headers: { 'x-auth-token': token }
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
