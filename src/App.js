import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Expenses from './Expenses';
import Analytics from './Analytics';
import Dashboard from './Dashboard';
import Settings from './Settings';
import AddBudget from './AddBudget';
import FinancialAdvice from './FinancialAdvice'; // Import the new FinancialAdvice component
import './fontAwesome';
import AuthProvider from './AuthContext';
import ProtectedRoute from './ProtectedRoute';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <div>
                    <Navbar />
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/dashboard" element={<ProtectedRoute element={Dashboard} />} />
                        <Route path="/expenses" element={<ProtectedRoute element={Expenses} />} />
                        <Route path="/analytics" element={<ProtectedRoute element={Analytics} />} />
                        <Route path="/settings" element={<ProtectedRoute element={Settings} />} />
                        <Route path="/add-budget" element={<ProtectedRoute element={AddBudget} />} />
                        <Route path="/financial-advice" element={<ProtectedRoute element={() => <FinancialAdvice userId="yourUserId" />} />} /> {/* New route for financial advice */}
                        <Route path="/" element={<ProtectedRoute element={Home} />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;
