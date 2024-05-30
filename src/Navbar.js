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
        navigate('/');
    };

    return (
        <nav className="bg-gray-800 p-4">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <Link to="/" className="flex items-center text-white text-xl font-bold">
                        <FontAwesomeIcon icon="dollar-sign" className="h-6 w-6 mr-2" />
                        ExpenseMate
                    </Link>
                </div>
                <div className="flex items-center space-x-4">
                    {user ? (
                        <>
                            <Link to="/dashboard" className="text-gray-300 hover:text-white">
                                <FontAwesomeIcon icon="tachometer-alt" className="h-6 w-6" />
                            </Link>
                            <Link to="/expenses" className="text-gray-300 hover:text-white">
                                <FontAwesomeIcon icon="dollar-sign" className="h-6 w-6" />
                            </Link>
                            <Link to="/analytics" className="text-gray-300 hover:text-white">
                                <FontAwesomeIcon icon="chart-bar" className="h-6 w-6" />
                            </Link>
                            <Link to="/" className="text-gray-300 hover:text-white">
                                <FontAwesomeIcon icon="home" className="h-6 w-6" />
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="text-gray-300 hover:text-white"
                            >
                                <FontAwesomeIcon icon="sign-out-alt" className="h-6 w-6" />
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-gray-300 hover:text-white">
                                <FontAwesomeIcon icon="sign-in-alt" className="h-6 w-6" />
                            </Link>
                            <Link to="/register" className="text-gray-300 hover:text-white">
                                <FontAwesomeIcon icon="user-plus" className="h-6 w-6" />
                            </Link>
                            <Link to="/" className="text-gray-300 hover:text-white">
                                <FontAwesomeIcon icon="home" className="h-6 w-6" />
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
