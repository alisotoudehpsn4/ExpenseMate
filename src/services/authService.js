import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5002/api/auth/';

const register = async (name, email, password) => {
    try {
        const response = await axios.post(API_URL + 'register', { name, email, password });
        console.log('Register response:', response.data); // Debugging line
        return response.data;
    } catch (error) {
        console.error('Register error:', error);
        throw error;
    }
};

const login = async (email, password) => {
    try {
        const response = await axios.post(API_URL + 'login', { email, password });
        console.log('Login response:', response.data); // Debugging line
        if (response.data.token) {
            Cookies.set('user', JSON.stringify(response.data.user));
            Cookies.set('token', response.data.token);
        }
        return response.data.user;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

const logout = () => {
    Cookies.remove('user');
    Cookies.remove('token');
};

const updateUser = async (userData) => {
    try {
        const token = Cookies.get('token');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            }
        };

        const response = await axios.put(API_URL + 'update', userData, config);
        console.log('Update user response:', response.data); // Debugging line
        if (response.data.token) {
            Cookies.set('user', JSON.stringify(response.data.user));
            Cookies.set('token', response.data.token);
        }
        return response.data.user;
    } catch (error) {
        console.error('Update user error:', error);
        throw error;
    }
};

const changePassword = async (passwordData) => {
    try {
        const token = Cookies.get('token');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            }
        };

        const response = await axios.put(API_URL + 'change-password', passwordData, config);
        console.log('Change password response:', response.data); // Debugging line
        return response.data;
    } catch (error) {
        console.error('Change password error:', error);
        throw error;
    }
};

const authService = {
    register,
    login,
    logout,
    updateUser,
    changePassword
};

export default authService;
