import React from 'react';
import { Navigate } from 'react-router-dom';

// Simple PrivateRoute: checks for token in localStorage (or your auth method)
const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
    const token = localStorage.getItem('access_token');

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default PrivateRoute;