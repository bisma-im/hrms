import React from 'react';
import { Card, Row, Col, Container, Tab, Nav } from 'react-bootstrap';
import EmployeeSummary from './EmployeeSummary';
import EmployeeDocuments from './EmployeeDocuments';

const EmployeeDetails = () => {
    
    return (
        <Container fluid>
            <Card className='m-1 m-lg-3'>
                <Tab.Container defaultActiveKey={'EmployeeSummary'}>
                    <Card.Header className="card-title">
                        <Nav variant="tabs">
                            <Nav.Item>
                                <Nav.Link eventKey={'EmployeeSummary'}>Employee Summary</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey={'EmployeeDocuments'}>Documents</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Card.Header>
                    <Row>
                        <Col xs={12}>
                            <Tab.Content>
                                <Tab.Pane eventKey={'EmployeeSummary'}>
                                    <EmployeeSummary />
                                </Tab.Pane>
                                <Tab.Pane eventKey={'EmployeeDocuments'}>
                                    <EmployeeDocuments />
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Card>
        </Container>
    );
};

export default EmployeeDetails;