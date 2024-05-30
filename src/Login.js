import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from './services/authService';
import { AuthContext } from './AuthContext';
import Cookies from 'js-cookie';


const LandingPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await authService.login(email, password);
            if (response) {
                login(response, Cookies.get('token'));
                setMessage('');
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Login error:', error);
            setMessage('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
                <div className="flex items-center justify-center mb-6">
                    
                  
                </div>
                
                <form onSubmit={handleLogin} className="mb-6">
                    <div className="mb-4">
                        <label className="block text-gray-700">Email:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300">Login</button>
                </form>
                {message && <p className="mt-4 text-red-500">{message}</p>}
                <div className="text-gray-600 text-center">
                    Don't have an account? <Link to="/register" className="text-blue-500">Register here</Link>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
