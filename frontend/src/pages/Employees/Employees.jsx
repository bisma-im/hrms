import React from 'react';
import { Row, Col, Container, Tab, Nav } from 'react-bootstrap';
import EmployeeSummary from './EmployeeSummary';
import EmployeeDocuments from './EmployeeDocuments';
import EmployeeLeaves from './EmployeeLeaves';
import { useSelector } from 'react-redux';

const Employees = () => {
    const employee = useSelector((state) => state.employee.selectedEmployee);
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
                                <EmployeeSummary />
                            </Tab.Pane>
                            <Tab.Pane eventKey={'EmployeeDocuments'}>
                                <EmployeeDocuments />
                            </Tab.Pane>
                            <Tab.Pane eventKey={'EmployeeLeaves'}>
                                <EmployeeLeaves />
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
    );
};

export default Employees;