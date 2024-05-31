import axios from 'axios';

const API_URL = 'http://localhost:5002/api/budget';

const getBudgets = () => {
    return axios.get(`${API_URL}/budgets`, {
        headers: {
            'x-auth-token': localStorage.getItem('token'),
        },
    });
};

const addBudget = (budgetData) => {
    return axios.post(API_URL, budgetData, {
        headers: {
            'x-auth-token': localStorage.getItem('token'),
        },
    });
};

const updateBudget = (id, budgetData) => {
    return axios.put(`${API_URL}/${id}`, budgetData, {
        headers: {
            'x-auth-token': localStorage.getItem('token'),
        },
    });
};

const deleteBudget = (id) => {
    return axios.delete(`${API_URL}/${id}`, {
        headers: {
            'x-auth-token': localStorage.getItem('token'),
        },
    });
};

const budgetService = {
    getBudgets,
    addBudget,
    updateBudget,
    deleteBudget,
};

export default budgetService;
