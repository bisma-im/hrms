import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Outlet } from 'react-router-dom';
import Sidebar from 'components/layout/nav/Sidebar/Sidebar';
import TopNavbar from 'components/layout/nav/TopNavbar/TopNavbar';

const Home = () => {
    const sidebarWidth = useSelector(state => state.sidebar.sidebarOpen ? 180 : 60);
    
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