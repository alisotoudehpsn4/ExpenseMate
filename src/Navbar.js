import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthContext } from './AuthContext';
import { Tooltip } from 'react-tooltip';
import { faWallet, faBars, faTimes } from '@fortawesome/free-solid-svg-icons'; // Importing new icons

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showLinks, setShowLinks] = useState(false);
    const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const confirmLogout = () => {
        setShowLogoutConfirmation(true);
    };

    const cancelLogout = () => {
        setShowLogoutConfirmation(false);
    };

    const logoutConfirmed = () => {
        handleLogout();
        setShowLogoutConfirmation(false);
    };

    return (
        <nav className="bg-gray-800 p-4">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <Link to="/dashboard" className="flex items-center text-white text-xl font-bold" data-tooltip-id="home-tooltip" data-tooltip-content="Home">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-500 text-white mr-2">
                            <FontAwesomeIcon icon={faWallet} className="h-6 w-6" />
                        </div>
                        ExpenseMate
                    </Link>
                </div>
                <div className="flex items-center relative">
                    <button className="text-gray-300 hover:text-white" onClick={() => setShowLinks(!showLinks)}>
                        <FontAwesomeIcon icon={showLinks ? faTimes : faBars} className="h-6 w-6" />
                    </button>
                    {showLinks && (
                        <div className="absolute top-full right-0 bg-gray-800 p-2 rounded-lg shadow-lg mt-2 transition-opacity duration-300 opacity-100">
                            {user ? (
                                <>
                                    <Link to="/settings" className="block text-gray-300 hover:text-white mb-4" data-tooltip-id="settings-tooltip" data-tooltip-content="Settings">
                                        <FontAwesomeIcon icon="cogs" className="h-6 w-6" />
                                    </Link>
                                    <Link to="/expenses" className="block text-gray-300 hover:text-white mb-4" data-tooltip-id="expenses-tooltip" data-tooltip-content="Expenses">
                                        <FontAwesomeIcon icon="dollar-sign" className="h-6 w-6" />
                                    </Link>
                                    <Link to="/analytics" className="block text-gray-300 hover:text-white mb-4" data-tooltip-id="analytics-tooltip" data-tooltip-content="Expenses Analytics">
                                        <FontAwesomeIcon icon="chart-bar" className="h-6 w-6" />
                                    </Link>
                                    <Link to="/add-budget" className="block text-gray-300 hover:text-white mb-4" data-tooltip-id="add-budget-tooltip" data-tooltip-content="Add Budget">
                                        <FontAwesomeIcon icon="plus-circle" className="h-6 w-6" />
                                    </Link>
                                    <Link to="/financial-advice" className="block text-gray-300 hover:text-white mb-4" data-tooltip-id="financial-advice-tooltip" data-tooltip-content="Financial Advice">
                                        <FontAwesomeIcon icon="lightbulb" className="h-6 w-6" />
                                    </Link>
                                   
                                    <button
                                        onClick={confirmLogout}
                                        className="block text-gray-300 hover:text-white mb-4"
                                        data-tooltip-id="logout-tooltip" data-tooltip-content="Logout"
                                    >
                                        <FontAwesomeIcon icon="sign-out-alt" className="h-6 w-6" />
                                    </button>
                                    {showLogoutConfirmation && (
                                        <div className="absolute top-0 right-0 mt-12 p-2 bg-white rounded-lg shadow-lg">
                                            <p>Are you sure you want to log out?</p>
                                            <button className="px-4 py-2 bg-gray-800 text-white rounded-lg mr-2" onClick={logoutConfirmed}>Logout</button>
                                            <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg" onClick={cancelLogout}>Cancel</button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="block text-gray-300 hover:text-white mb-4" data-tooltip-id="login-tooltip" data-tooltip-content="Login">
                                        <FontAwesomeIcon icon="sign-in-alt" className="h-6 w-6" />
                                    </Link>
                                    <Link to="/register" className="block text-gray-300 hover:text-white mb-4" data-tooltip-id="register-tooltip" data-tooltip-content="Register">
                                        <FontAwesomeIcon icon="user-plus" className="h-6 w-6" />
                                    </Link>
                                    <Link to="/" className="block text-gray-300 hover:text-white mb-4" data-tooltip-id="home-tooltip" data-tooltip-content="Home">
                                        <FontAwesomeIcon icon="home" className="h-6 w-6" />
                                    </Link>
                                </>
                            )}
                        </div>
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
