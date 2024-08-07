import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from 'features/auth/authSlice';
import Sidebar from 'components/layout/nav/Sidebar/Sidebar';
import TopNavbar from 'components/layout/nav/TopNavbar/TopNavbar';
const Home = () => {
    const sidebarWidth = useSelector(state => state.sidebar.sidebarOpen ? 180 : 60);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth);

    function onLogout(){
        dispatch(logout());
    }

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
                    <h1>Welcome to BUKC HRMS</h1>
                    <p>This is your main area where HRMS content will be displayed.</p>
                </div>
            </div>
            {/* <Container fluid>
                <Row>
                    <Col xs={12} md={3} lg={2} className="px-0">
                        <Sidebar />
                    </Col>
                    <Col xs={12} md={9} lg={10}>
                        <div className="p-3">
                            <h1>Welcome to BUKC HRMS</h1>
                            <p>This is your main area where HRMS content will be displayed.</p>
                        </div>
                    </Col>
                </Row>
            </Container> */}
        </>
    )
};

export default Home;