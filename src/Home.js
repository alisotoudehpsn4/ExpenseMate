// src/Home.js

import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <div className="max-w-md w-full bg-white p-8 border border-gray-300 rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Welcome to ExpenseMate</h2>
                <div className="flex flex-col items-center space-y-4">
                    <Link to="/login" className="text-gray-300 hover:text-white bg-blue-500 text-white py-2 px-4 rounded-lg w-full text-center">Login</Link>
                    <span className="text-gray-500">Don't have an account?</span>
                    <Link to="/register" className="text-gray-300 hover:text-white bg-green-500 text-white py-2 px-4 rounded-lg w-full text-center">Register</Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
