import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Expenses from './Expenses';
import Analytics from './Analytics';
import Dashboard from './Dashboard';
import Settings from './Settings';
import './fontAwesome';
import AuthProvider, { AuthContext } from './AuthContext';

const ProtectedRoute = ({ element: Component }) => {
    const { user } = useContext(AuthContext);
    return user ? <Component /> : <Navigate to="/login" />;
};

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
                        <Route path="/" element={<Home />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;
