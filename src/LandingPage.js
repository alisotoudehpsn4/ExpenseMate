import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet, faChartPie, faChartBar } from '@fortawesome/free-solid-svg-icons'; // Import different icons for key features

const LandingPage = () => {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Hero Section */}
            <div className="bg-blue-600 text-white py-16 px-6 text-center">
                <FontAwesomeIcon icon={faWallet} className="text-5xl mb-4" />
                <h1 className="text-4xl font-bold mb-4">Welcome to ExpenseMate</h1>
                <p className="text-lg mb-8">Simplify your financial life with ExpenseMate. Track expenses, set budgets, and gain insights into your spending habits.</p>
                <div className="flex flex-col sm:flex-row justify-center items-center">
                    <Link to="/register" className="bg-white text-blue-600 py-2 px-6 rounded-lg font-bold hover:bg-blue-700 hover:text-white transition duration-300 mb-4 sm:mb-0 sm:mr-4">Get Started</Link>
                    <Link to="/login" className="bg-green-600 text-white py-2 px-6 rounded-lg font-bold hover:bg-green-700 transition duration-300">Already have an account? Login</Link>
                </div>
            </div>
            
            {/* Features Section */}
            <div className="my-16 text-center">
                <h2 className="text-2xl font-bold mb-8">Key Features</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {/* Expense Tracking */}
                    <div className="bg-white shadow-md p-6 rounded-lg">
                        <FontAwesomeIcon icon={faWallet} className="text-blue-600 text-3xl mb-4 mx-auto" />
                        <h3 className="text-lg font-bold mb-2">Expense Tracking</h3>
                        <p>Effortlessly track all your expenses in one place.</p>
                    </div>
                    {/* Budgeting */}
                    <div className="bg-white shadow-md p-6 rounded-lg">
                        <FontAwesomeIcon icon={faChartPie} className="text-blue-600 text-3xl mb-4 mx-auto" />
                        <h3 className="text-lg font-bold mb-2">Budgeting</h3>
                        <p>Set budgets for different categories and track your spending against them.</p>
                    </div>
                    {/* Charts */}
                    <div className="bg-white shadow-md p-6 rounded-lg">
                        <FontAwesomeIcon icon={faChartBar} className="text-blue-600 text-3xl mb-4 mx-auto" />
                        <h3 className="text-lg font-bold mb-2">Charts</h3>
                        <p>Visualize your financial data with interactive charts and graphs.</p>
                    </div>
                </div>
            </div>
            
            {/* Testimonials Section */}
            <div className="my-16 text-center">
                <h2 className="text-2xl font-bold mb-8">What Our Users Say</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {/* Testimonial card for Ali */}
                    <div className="bg-white shadow-md p-6 rounded-lg">
                        <p className="italic mb-4">"ExpenseMate has revolutionized the way I manage my finances. It's so simple to use and has helped me save money every month." - Ali</p>
                    </div>
                    {/* Testimonial card for Tara */}
                    <div className="bg-white shadow-md p-6 rounded-lg">
                        <p className="italic mb-4">"I've tried many budgeting apps, but ExpenseMate stands out for its user-friendly interface and insightful analytics. Highly recommended!" - Tara</p>
                    </div>
                </div>
            </div>
            
            {/* CTA Section */}
            <div className="bg-gray-900 text-white py-16 px-6 text-center">
                <h2 className="text-3xl font-bold mb-4">Ready to take control of your finances?</h2>
                <p className="text-lg mb-8">Sign up for ExpenseMate today and start managing your money with ease!</p>
                <Link to="/register" className="bg-blue-600 text-white py-3 px-8 rounded-lg font-bold hover:bg-blue-700 transition duration-300">Sign Up Now</Link>
            </div>
        </div>
    );
};

export default LandingPage;
