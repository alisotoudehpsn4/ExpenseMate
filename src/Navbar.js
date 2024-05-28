// src/Navbar.js

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './fontAwesome';

const Navbar = ({ user, setUser }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
    };

    return (

<nav className="bg-gray-800 p-4">
    <div className="flex justify-between items-center">
        <div className="flex items-center flex-grow">
            <Link to="/" className="flex items-center text-white text-xl font-bold">
                <FontAwesomeIcon icon="dollar-sign" className="h-6 w-6 mr-2" />
                Expensify
            </Link>
        </div>
        <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
            {user ? (
                <>
                    
                    <Link to="/analytics" className="text-gray-300 hover:text-white">Analytics</Link>
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
