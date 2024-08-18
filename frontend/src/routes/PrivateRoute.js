import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const isLoggedIn = window.localStorage.getItem('loggedIn');

    return isLoggedIn ? <Outlet/> : <Navigate to="login"/>
};

export default PrivateRoute;
