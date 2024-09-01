import React, { useEffect, useState } from 'react';
import { Row, Col, Container, Tab, Nav } from 'react-bootstrap';
import EmployeeSummary from './EmployeeSummary';
import EmployeeDocuments from './EmployeeDocuments';
import EmployeeLeaves from './EmployeeLeaves';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchEmployeeDetails } from 'features/employees/employeeService';
import LoadingSpinner from 'components/common/ui/LoadingSpinner';

const Employees = () => {
    const { userId } = useParams();
    console.log("User ID:", userId);

    const [employee, setEmployee] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(userId)

        if (userId) {
            console.log('fetchng user')
            setIsLoading(true);
            dispatch(fetchEmployeeDetails(userId))
                .unwrap()
                .then(data => {
                    console.log(data);
                    
                    setEmployee(data);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error('Failed to fetch applicant details:', error);
                    setIsLoading(false);
                });
        }
    }, [userId, dispatch]);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <Container fluid>
            <Tab.Container defaultActiveKey={'EmployeeSummary'}>
                <Row>
                    <Col sm={6}>
                        <h3 className='h3 mx-3'>{`${employee.name} - ${employee.employee_id}`}</h3>
                    </Col>
                    <Col sm={6} className='my-nav'>
                        <Nav variant="tabs" className='d-flex align-items-center justify-content-md-end'>
                            <Nav.Item>
                                <Nav.Link eventKey={'EmployeeSummary'}>Summary</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey={'EmployeeDocuments'}>Documents</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey={'EmployeeLeaves'}>Leaves</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                </Row>
                {/* <Card className='m-1 m-lg-3'> */}
                <Row>
                    <Col xs={12}>
                        <Tab.Content>
                            <Tab.Pane eventKey={'EmployeeSummary'}>
                                <EmployeeSummary  employee={employee}/>
                            </Tab.Pane>
                            <Tab.Pane eventKey={'EmployeeDocuments'}>
                                <EmployeeDocuments  employee={employee} />
                            </Tab.Pane>
                            <Tab.Pane eventKey={'EmployeeLeaves'}>
                                <EmployeeLeaves  employee={employee}/>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
    );
};

export default Employees;