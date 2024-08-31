import { FaPlane, FaBriefcaseMedical, FaUmbrellaBeach } from 'react-icons/fa'; // Replace icons as necessary
import { Container, Row, Col } from "react-bootstrap";
import React from 'react';
import LeaveWidget from './LeaveWidget';
import { useSelector } from 'react-redux';
import EmployeeHeader from './EmployeeHeader';

const EmployeeDashboard = () => {
    return (
        <Container fluid>
            <Row>
                <EmployeeHeader />
            </Row>
            <Row className="justify-content-center">
                <Col xs={12} md={4}>
                    <LeaveWidget icon={FaPlane} leaveType="Casual Leave" iconColor='purple' availableDays={10.0} usedDays={20} />
                </Col>
                <Col xs={12} md={4}>
                    <LeaveWidget icon={FaBriefcaseMedical} leaveType="Sick Leave" iconColor='orange' availableDays={15.0}  usedDays={5} />
                </Col>
                <Col xs={12} md={4}>
                    <LeaveWidget icon={FaUmbrellaBeach} leaveType="Privilege Leave" iconColor='green' availableDays={12.0} usedDays={10} />
                </Col>
            </Row>
        </Container>
    )
};

export default EmployeeDashboard;