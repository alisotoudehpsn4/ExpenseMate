// src/Navbar.js

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './fontAwesome'; // Ensure this path is correct

const Navbar = ({ user, setUser }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
    };

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="flex items-center text-white text-xl font-bold">
                    <FontAwesomeIcon icon="dollar-sign" className="h-6 w-6 mr-2" />
                    Expensify
                </Link>
                <div className="space-x-4">
                    <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
                    {user ? (
                        <>
                            <Link to="/expenses" className="text-gray-300 hover:text-white">Expenses</Link>
                            <button
                                onClick={handleLogout}
                                className="text-gray-300 hover:text-white"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-gray-300 hover:text-white">Login</Link>
                            <Link to="/register" className="text-gray-300 hover:text-white">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
