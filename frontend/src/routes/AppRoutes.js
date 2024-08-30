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
import ApplicationForm from 'pages/Application/ApplicationForm';
import { useSelector } from 'react-redux';
import CreateEmployee from 'pages/Employees/CreateEmployee';

const AppRoutes = () => {
    const { isAuthenticated } = useSelector(state => state.auth);

    return (
        <Routes>

            <Route path="/login" element={<Login />} />
            {/* <Route path="*" element={<Navigate to="login" />} /> */}
            <Route path="/job-application" element={<ApplicationForm/>} />


            {/* Redirect if not authenticated */}
            <Route path="/" element={isAuthenticated ? <Navigate replace to="/dashboard" /> : <Navigate replace to="/login" />} />

            {/* Protected routes */}
            {isAuthenticated && (
                <Route path='/' element={<PrivateRoute />}>
                    <Route index element={<Navigate replace to="/dashboard" />} />
                    <Route path='dashboard' element={<Dashboard />} />
                    <Route path="create-job" element={<CreateJob />} />
                    <Route path="employees-list" element={<EmployeesList />} />
                    <Route path="employee-details" element={<Employees />} />
                    <Route path="add-employee-form" element={<CreateEmployee />} />
                    <Route path="add-employee-form/:applicantId" element={<CreateEmployee />} />
                    <Route path="job-positions" element={<JobPositions />} />
                    <Route path='leaves' element={<LeavesList />} />
                    <Route path='sick-leave' element={<SickLeave />} />
                    <Route path='casual-leave' element={<CasualLeave />} />
                    <Route path='privilege-leave' element={<PrivilegeLeave />} />
                    <Route path="applicants" element={<ApplicationList />} />
                    <Route path="applicants/:applicantId" element={<ApplicationForm />} />
                </Route>
            )}

            {/* Catch all - Redirects to login if not authenticated, dashboard if authenticated */}
            <Route path="*" element={isAuthenticated ? <Navigate replace to="/dashboard" /> : <Navigate replace to="/login" />} />
        </Routes>
    );
};

export default AppRoutes;
