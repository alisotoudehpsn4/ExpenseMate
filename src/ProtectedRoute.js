import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const ProtectedRoute = ({ element: Component }) => {
    const { user, loading } = useContext(AuthContext);

    console.log("ProtectedRoute user state:", user); // Debugging line

    if (loading) {
        return <div>Loading...</div>; // Show loading state while checking for user
    }

    return user ? <Component /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
