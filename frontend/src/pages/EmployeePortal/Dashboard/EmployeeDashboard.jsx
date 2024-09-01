import { FaPlane, FaBriefcaseMedical, FaUmbrellaBeach } from 'react-icons/fa'; // Replace icons as necessary
import { Container, Row, Col } from "react-bootstrap";
import React, { useEffect, useState } from 'react';
import LeaveWidget from './LeaveWidget';
import EmployeeHeader from './EmployeeHeader';
import { fetchEmployeeDetails } from 'features/employees/employeeService';
import LoadingSpinner from 'components/common/ui/LoadingSpinner';
import { useDispatch, useSelector } from 'react-redux';

const EmployeeDashboard = () => {
    const [employee, setEmployee] = useState(null);
    const { user } = useSelector(state => state.auth);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setIsLoading(true);
        dispatch(fetchEmployeeDetails(user.id))
            .unwrap()
            .then(data => {
                setEmployee(data);
            })
            .catch(error => {
                console.error('Failed to fetch employee details:', error);
            })
            .finally(() => {
                setTimeout(() => {
                    setIsLoading(false);
                }, 1000);
            })
    }, [dispatch, user.id]);

    if (isLoading || !employee) return <LoadingSpinner />;
    
    return (
        <Container fluid>
            <Row>
                <EmployeeHeader employee={employee}/>
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