import React, { useMemo } from 'react';
import { Card, Row, Col, Container } from 'react-bootstrap';
import LEAVE_DATA from './LEAVE_DATA.json';
import { COLUMNS } from './Columns';
import MyTable from 'components/common/table/MyTable';
import { Link } from 'react-router-dom';
const LeavesList = () => {

    const columnHeaders = useMemo(() => COLUMNS, []);

    const jsonData = LEAVE_DATA;

    const handleRowClick = (leave) => {
        // dispatch(selectEmployee(employee));
        // navigate('/employee-details');
        console.log(leave)
    };

    return (
        <Container fluid>
            <Row className="d-flex align-items-center justify-content-md-end">
                <Col xs="auto" className='mx-3'>
                    <Link className='link-button btn-primary' to={'/casual-leave'}>Create</Link>
                </Col>
            </Row>
            <Row>
                <Col lg={12}>
                    <Card className='m-1 m-lg-3'>
                        <Card.Header><h5 className="card-title">Leaves</h5></Card.Header>
                        <Card.Body>
                            <MyTable jsonData={jsonData} columnHeaders={columnHeaders} onRowClick={handleRowClick} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default LeavesList;