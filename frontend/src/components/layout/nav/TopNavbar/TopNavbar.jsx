import React from 'react';
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';
import { useState, useEffect } from "react";
import { FaBell, FaUser } from 'react-icons/fa';
import { logo } from 'assets/images';
import { Searchbar } from 'components/common/index';
import './TopNavbar.css';

const TopNavbar = () => {
    const [isMobile, setIsMobile] = useState(false);

    const [dateState, setDateState] = useState(new Date());
    useEffect(() => {
        setInterval(() => {
            setDateState(new Date());
        }, 1000);

        // ------------handle mobile screen size
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <Navbar expand="lg" className="top-navbar p-0">
            <Container fluid className="d-flex justify-content-between align-items-center p-0">
                <div className="navbar-header d-flex align-items-center">
                    <img src={logo} alt="Logo" className="navbar-logo" />
                    {!isMobile ? <span className="navbar-title">BUKC HRMS</span> : ''}
                </div>
                <Nav className="align-items-center custom-nav">
                    <Nav.Item className="icon-button">
                        <Searchbar />
                    </Nav.Item>
                    {!isMobile ? <Nav.Item className="icon-button">
                        <div className='clock'>
                            {dateState.toLocaleString("en-US", {
                                hour: "numeric",
                                minute: "numeric",
                                hour12: true,
                            })}
                        </div>
                    </Nav.Item> : ''}
                    <NavDropdown title={<FaBell className='icon-fill' />} className="nav-item icon-button nav-dropdown" align="end" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something else here</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title={<FaUser className='icon-fill' />} align="end" id="basic-nav-dropdown" className="nav-item icon-button nav-dropdown">
                        <NavDropdown.Item href="#action/4.1">Profile</NavDropdown.Item>
                        <NavDropdown.Item href="#action/4.2">Settings</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/4.3">Logout</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default TopNavbar;
