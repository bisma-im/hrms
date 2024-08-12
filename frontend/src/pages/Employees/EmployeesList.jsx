import React from 'react';
import { Card, Row, Col, Container } from 'react-bootstrap';
import MOCK_DATA from './MOCK_DATA.json';
import { COLUMNS } from './Columns';
import MyTable from 'components/common/table/MyTable';
import { useNavigate } from 'react-router-dom';

const EmployeesList = () => {
    const navigate = useNavigate();
    const columnHeaders = COLUMNS;

    const jsonData = MOCK_DATA;

    const handleRowClick = (employee) => {
        console.log('Selected Employee:', employee);
        navigate('/employee-details');
    };

    return (
        <Container fluid>
            <Row>
                <Col lg={12}>
                    <Card className='m-1 m-lg-3'>
                        <Card.Header><h5 className="card-title">Employees</h5></Card.Header>
                        <Card.Body>
                            <MyTable jsonData={jsonData} columnHeaders={columnHeaders} onRowClick={handleRowClick}/>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default EmployeesList;