import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from 'components/layout/nav/Sidebar/Sidebar';
import TopNavbar from 'components/layout/nav/TopNavbar/TopNavbar';
// private route for rbac
const PrivateRoute = () => {
    const isLoggedIn = window.localStorage.getItem('loggedIn') === 'true';
    const sidebarWidth = useSelector(state => state.sidebar.sidebarOpen ? 180 : 60);

    console.log('private route being called');
    
    // return isLoggedIn ? <Outlet/> : <Navigate to="login"/>
    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }
    return (
        <>
            <TopNavbar />
            <div className="layout-container">
                <Sidebar />
                <div className="main-content" style={{ marginLeft: `${sidebarWidth}px` }}>
                    <Outlet />
                </div>
            </div>
        </>
    )
};

export default PrivateRoute;
