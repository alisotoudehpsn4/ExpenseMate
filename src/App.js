import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Layout'; // Import the Layout component
import LandingPage from './LandingPage'; // Import the LandingPage component
import Login from './Login'; // Import the Login component
import Register from './Register';
import Expenses from './Expenses';
import Analytics from './Analytics';
import Dashboard from './Dashboard';
import Settings from './Settings';
import AddBudget from './AddBudget';
import FinancialAdvice from './FinancialAdvice';
import './fontAwesome';
import AuthProvider from './AuthContext';
import ProtectedRoute from './ProtectedRoute';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Layout> {/* Wrap the routes in the Layout component */}
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/dashboard" element={<ProtectedRoute element={Dashboard} />} />
                        <Route path="/expenses" element={<ProtectedRoute element={Expenses} />} />
                        <Route path="/analytics" element={<ProtectedRoute element={Analytics} />} />
                        <Route path="/settings" element={<ProtectedRoute element={Settings} />} />
                        <Route path="/add-budget" element={<ProtectedRoute element={AddBudget} />} />
                        <Route path="/financial-advice" element={<ProtectedRoute element={FinancialAdvice} />} />
                        <Route path="/" element={<LandingPage />} />
                    </Routes>
                </Layout>
            </Router>
        </AuthProvider>
    );
};

export default App;
