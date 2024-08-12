import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from 'pages/Login/Login';
import Home from 'pages/Home';
import CreateJob from 'pages/Recruitment/CreateJob';
import Dashboard from 'pages/Dashboard/Dashboard';
import EmployeesList from 'pages/Employees/EmployeesList';
import EmployeeDetails from 'pages/Employees/EmployeeDetails';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />}>
                <Route index element={<Dashboard />} />
                <Route path="create-job" element={<CreateJob />} />
                {/* <Route path="employees-list" element={<EmployeesList />} /> */}
                <Route path="employees-list" element={<EmployeesList />} />
                <Route path="employee-details" element={<EmployeeDetails />} />

                {/* Add other routes that should be accessible from the main layout */}
            </Route>
            {/* More routes go here as your app expands */}
        </Routes>
    );
};

export default AppRoutes;
