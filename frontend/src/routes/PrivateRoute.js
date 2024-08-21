import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from 'components/layout/nav/Sidebar/Sidebar';
import TopNavbar from 'components/layout/nav/TopNavbar/TopNavbar';
// private route for rbac
const PrivateRoute = () => {
    const isLoggedIn = window.localStorage.getItem('loggedIn') === 'true';
    const sidebarWidth = useSelector(state => state.sidebar.sidebarOpen ? 180 : 60);
    console.log("localStorage item:", window.localStorage.getItem('loggedIn'));

    if (!sidebarWidth) return null; 

    console.log('is logged in in private route:', isLoggedIn);
    
    // return isLoggedIn ? <Outlet/> : <Navigate to="login"/>
    if (isLoggedIn) {
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
    }
    return <Navigate to="/login" replace />;

};

export default PrivateRoute;
