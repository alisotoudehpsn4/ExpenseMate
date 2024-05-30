import axios from 'axios';

const API_URL = 'http://localhost:5002/api/auth/';

const register = (name, email, password) => {
    return axios.post(API_URL + 'register', {
        name,
        email,
        password
    });
};

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

const logout = () => {
    localStorage.removeItem('user');
};

const updateUser = async (userData) => {
    const token = JSON.parse(localStorage.getItem('user')).token;
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token
        }
    };

    const response = await axios.put(API_URL + 'update', userData, config);
    if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
};

const changePassword = async (passwordData) => {
    const token = JSON.parse(localStorage.getItem('user')).token;
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token
        }
    };

    const response = await axios.put(API_URL + 'change-password', passwordData, config);
    return response.data;
};

const authService = {
    register,
    login,
    logout,
    updateUser,
    changePassword
};

export default authService;
