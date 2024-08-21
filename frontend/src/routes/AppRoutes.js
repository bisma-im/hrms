import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from 'pages/Login/Login';
import CreateJob from 'pages/Recruitment/CreateJob';
import Dashboard from 'pages/Dashboard/Dashboard';
import EmployeesList from 'pages/Employees/EmployeesList';
import EmployeeDetails from 'pages/Employees/EmployeeDetails';
import JobPositions from 'pages/Recruitment/JobPositions';
import ApplicationList from 'pages/Recruitment/ApplicationList';
import LeavesList from 'pages/Leaves/LeavesList';
import CasualLeave from 'pages/Leaves/CasualLeave';

const AppRoutes = () => {
    const isLoggedIn = window.localStorage.getItem('loggedIn') === 'true';
    console.log("is logged in:",isLoggedIn)
    return (
        <Routes>
            {/* Unauthorized routes */}
            {!isLoggedIn && (
                <>
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<Navigate to="login" />} />
                </>
            )}

            {/* Protected routes */}
            <Route path="/login" element={<Login />} />
            <Route path='/' element={<PrivateRoute />}>
                <Route index element={<Navigate replace to="/dashboard" />} />
                <Route path='dashboard' element={<Dashboard />} />
                <Route path="create-job" element={<CreateJob />} />
                <Route path="employees-list" element={<EmployeesList />} />
                <Route path="employee-details" element={<EmployeeDetails />} />
                <Route path="job-positions" element={<JobPositions />} />
                <Route path='leaves' element={<LeavesList />} />
                <Route path='casual-leave' element={<CasualLeave />} />
                <Route path="applications-list" element={<ApplicationList />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
