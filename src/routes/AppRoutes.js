import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from 'pages/Login/Login';
import Home from 'pages/Dashboard/Home';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Home />} />
            {/* More routes go here as your app expands */}
        </Routes>
    );
};

export default AppRoutes;
