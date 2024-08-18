import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from 'pages/Login/Login';
import Home from 'pages/Home';
import CreateJob from 'pages/Recruitment/CreateJob';
import Dashboard from 'pages/Dashboard/Dashboard';
import EmployeesList from 'pages/Employees/EmployeesList';
import EmployeeDetails from 'pages/Employees/EmployeeDetails';
import JobPositions from 'pages/Recruitment/JobPositions';
import ApplicationList from 'pages/Recruitment/ApplicationList';

const AppRoutes = () => {
    const isLoggedIn = window.localStorage.getItem('loggedIn');
    return (
        <Routes>
            {/* Unauthorized routes */}
            {!isLoggedIn && (
                <>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Login />} />
                </>
            )}

            {/* Protected routes */}
            <Route element={<PrivateRoute />}>
                <Route index element={<Dashboard />} />
                <Route path="/" element={<Dashboard />} />
                <Route path="create-job" element={<CreateJob />} />
                <Route path="employees-list" element={<EmployeesList />} />
                <Route path="employee-details" element={<EmployeeDetails />} />
                <Route path="job-positions" element={<JobPositions />} />
                <Route path="applications-list" element={<ApplicationList />} />
            </Route>

            {/* <Route exact path="/" element={isLoggedIn ? <Home/> : <Login/>}>
                
            </Route> */}
            {/* More routes go here as your app expands */}
        </Routes>
    );
};

export default AppRoutes;
