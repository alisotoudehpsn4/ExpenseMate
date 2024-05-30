import React, { useState, useEffect } from 'react';
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

const App = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    return (
        <Router>
            <div>
                <Navbar user={user} setUser={setUser} />
                <Routes>
                    <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login setUser={setUser} />} />
                    <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register setUser={setUser} />} />
                    <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
                    <Route path="/expenses" element={user ? <Expenses /> : <Navigate to="/login" />} />
                    <Route path="/analytics" element={user ? <Analytics /> : <Navigate to="/login" />} />
                    <Route path="/settings" element={user ? <Settings user={user} /> : <Navigate to="/login" />} />
                    <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Home />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
