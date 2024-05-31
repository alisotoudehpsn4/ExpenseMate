import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5002/api/budget/';

const getBudgets = () => {
    const token = Cookies.get('token');
    if (token) {
        return axios.get(`${API_URL}/budgets`, {
            headers: { 'x-auth-token': token }
        });
    }
    return Promise.reject('No token available');
};

const addBudget = (budgetData) => {
    const token = Cookies.get('token');
    if (token) {
        return axios.post(API_URL, budgetData, {
            headers: { 'x-auth-token': token }
        });
    }
    return Promise.reject('No token available');
};

const updateBudget = (id, budgetData) => {
    const token = Cookies.get('token');
    if (token) {
        return axios.put(`${API_URL}/${id}`, budgetData, {
            headers: { 'x-auth-token': token }
        });
    }
    return Promise.reject('No token available');
};

const deleteBudget = (id) => {
    const token = Cookies.get('token');
    if (token) {
        return axios.delete(`${API_URL}/${id}`, {
            headers: { 'x-auth-token': token }
        });
    }
    return Promise.reject('No token available');
};

const budgetService = {
    getBudgets,
    addBudget,
    updateBudget,
    deleteBudget,
};

export default budgetService;
