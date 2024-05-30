import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthContext } from './AuthContext';
import { Tooltip } from 'react-tooltip';
import './fontAwesome';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="bg-gray-800 p-4">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <Link to="/dashboard" className="flex items-center text-white text-xl font-bold" data-tooltip-id="home-tooltip" data-tooltip-content="Home">
                        <FontAwesomeIcon icon="home" className="h-6 w-6 mr-2" />
                        ExpenseMate
                    </Link>
                </div>
                <div className="flex items-center space-x-4">
                    {user ? (
                        <>
                            <Link to="/settings" className="text-gray-300 hover:text-white" data-tooltip-id="settings-tooltip" data-tooltip-content="Settings">
                                <FontAwesomeIcon icon="cogs" className="h-6 w-6" />
                            </Link>
                            <Link to="/expenses" className="text-gray-300 hover:text-white" data-tooltip-id="expenses-tooltip" data-tooltip-content="Expenses">
                                <FontAwesomeIcon icon="dollar-sign" className="h-6 w-6" />
                            </Link>
                            <Link to="/analytics" className="text-gray-300 hover:text-white" data-tooltip-id="analytics-tooltip" data-tooltip-content="Analytics">
                                <FontAwesomeIcon icon="chart-bar" className="h-6 w-6" />
                            </Link>
                            <Link to="/add-budget" className="text-gray-300 hover:text-white" data-tooltip-id="add-budget-tooltip" data-tooltip-content="Add Budget">
                                <FontAwesomeIcon icon="plus-circle" className="h-6 w-6" />
                            </Link>
                            <Link to="/financial-advice" className="text-gray-300 hover:text-white" data-tooltip-id="financial-advice-tooltip" data-tooltip-content="Financial Advice">
                                <FontAwesomeIcon icon="lightbulb" className="h-6 w-6" />
                            </Link>
                            <Link to="/dashboard" className="text-gray-300 hover:text-white" data-tooltip-id="home-tooltip" data-tooltip-content="Home">
                                <FontAwesomeIcon icon="home" className="h-6 w-6" />
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="text-gray-300 hover:text-white"
                                data-tooltip-id="logout-tooltip" data-tooltip-content="Logout"
                            >
                                <FontAwesomeIcon icon="sign-out-alt" className="h-6 w-6" />
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-gray-300 hover:text-white" data-tooltip-id="login-tooltip" data-tooltip-content="Login">
                                <FontAwesomeIcon icon="sign-in-alt" className="h-6 w-6" />
                            </Link>
                            <Link to="/register" className="text-gray-300 hover:text-white" data-tooltip-id="register-tooltip" data-tooltip-content="Register">
                                <FontAwesomeIcon icon="user-plus" className="h-6 w-6" />
                            </Link>
                            <Link to="/" className="text-gray-300 hover:text-white" data-tooltip-id="home-tooltip" data-tooltip-content="Home">
                                <FontAwesomeIcon icon="home" className="h-6 w-6" />
                            </Link>
                        </>
                    )}
                </div>
                <Tooltip id="home-tooltip" place="bottom" type="dark" effect="solid" />
                <Tooltip id="settings-tooltip" place="bottom" type="dark" effect="solid" />
                <Tooltip id="expenses-tooltip" place="bottom" type="dark" effect="solid" />
                <Tooltip id="analytics-tooltip" place="bottom" type="dark" effect="solid" />
                <Tooltip id="add-budget-tooltip" place="bottom" type="dark" effect="solid" />
                <Tooltip id="financial-advice-tooltip" place="bottom" type="dark" effect="solid" />
                <Tooltip id="logout-tooltip" place="bottom" type="dark" effect="solid" />
                <Tooltip id="login-tooltip" place="bottom" type="dark" effect="solid" />
                <Tooltip id="register-tooltip" place="bottom" type="dark" effect="solid" />
            </div>
        </nav>
    );
};

export default Navbar;
