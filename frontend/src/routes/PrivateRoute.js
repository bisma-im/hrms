import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
    const user = useSelector((state) => state.auth.user);
    if (!user) {
        // Redirect to the login page if there is no user
        return <Navigate to="/login" replace />;
    }
    return children;
};

export default PrivateRoute;
