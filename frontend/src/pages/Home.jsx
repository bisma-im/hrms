import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Outlet } from 'react-router-dom';
import Sidebar from 'components/layout/nav/Sidebar/Sidebar';
import TopNavbar from 'components/layout/nav/TopNavbar/TopNavbar';
import Dashboard from './Dashboard/Dashboard';

const Home = () => {
    const sidebarWidth = useSelector(state => state.sidebar.sidebarOpen ? 180 : 60);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth);

    

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);

    return (
        <>
            <TopNavbar />
            <div className="layout-container">
                <Sidebar />
                <div className="main-content" style={{ marginLeft: `${sidebarWidth}px` }}>
                    <Outlet/>
                </div>
            </div>
        </>
    )
};

export default Home;