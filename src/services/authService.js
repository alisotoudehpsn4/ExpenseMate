// src/services/authService.js

import axios from 'axios';

const API_URL = 'http://localhost:5002/api/auth/';

// Register user
const register = (name, email, password) => {
    return axios.post(API_URL + 'register', {
        name,
        email,
        password
    });
};

// Login user
const login = (email, password) => {
    return axios.post(API_URL + 'login', {
        email,
        password
    }).then((response) => {
        if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
    });
};

// Logout user
const logout = () => {
    localStorage.removeItem('user');
};

export default {
    register,
    login,
    logout
};
