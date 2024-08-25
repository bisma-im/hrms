import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from 'pages/Login/Login';
import CreateJob from 'pages/Recruitment/CreateJob';
import Dashboard from 'pages/Dashboard/Dashboard';
import EmployeesList from 'pages/Employees/EmployeesList';
import Employees from 'pages/Employees/Employees';
import JobPositions from 'pages/Recruitment/JobPositions';
import ApplicationList from 'pages/Recruitment/ApplicationList';
import LeavesList from 'pages/Leaves/LeavesList';
import CasualLeave from 'pages/Leaves/CasualLeave';
import SickLeave from 'pages/Leaves/SickLeave';
import PrivilegeLeave from 'pages/Leaves/PrivilegeLeave';
import { selectUser } from 'features/auth/authSlice';
import { useSelector } from 'react-redux';

const AppRoutes = () => {
    // const isLoggedIn = window.localStorage.getItem('loggedIn') === 'true';
    const {isAuthenticated} = useSelector(state => state.auth);

    return (
        <Routes>
            {/* Unauthorized routes */}
            {!isAuthenticated && (
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
                <Route path="employee-details" element={<Employees />} />
                <Route path="job-positions" element={<JobPositions />} />
                <Route path='leaves' element={<LeavesList />} />
                <Route path='sick-leave' element={<SickLeave />} />
                <Route path='casual-leave' element={<CasualLeave />} />
                <Route path='privilege-leave' element={<PrivilegeLeave />} />
                <Route path="applications-list" element={<ApplicationList />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
