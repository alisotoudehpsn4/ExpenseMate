import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Expenses from './Expenses';

const App = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/login" element={user ? <Navigate to="/expenses" /> : <Login setUser={setUser} />} />
                    <Route path="/register" element={user ? <Navigate to="/expenses" /> : <Register setUser={setUser} />} />
                    <Route path="/expenses" element={user ? <Expenses /> : <Navigate to="/login" />} />
                    <Route path="/" element={user ? <Navigate to="/expenses" /> : <Navigate to="/login" />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
