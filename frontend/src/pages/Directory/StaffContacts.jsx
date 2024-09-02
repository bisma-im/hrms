import React, { useEffect } from 'react';
import { Card, Row, Col, Container, Button } from 'react-bootstrap';
import { fetchEmployees } from 'features/employees/employeeService';
import { COLUMNS } from './Columns.jsx';
import MyTable from 'components/common/table/MyTable';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectEmployee } from 'features/employees/employeeSlice';
import LoadingSpinner from 'components/common/ui/LoadingSpinner.jsx';

const StaffContacts = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const employees = useSelector(state => state.employee.employees);

    // Fetch employees when component mounts
    useEffect(() => {
        dispatch(fetchEmployees());
    }, [dispatch]);

    const columnHeaders = COLUMNS;

    return (
        <Container fluid>
            <Row>
                <Col lg={12}>
                    <Card className='m-1 m-lg-3'>
                        <Card.Header className='title card-header'><h4>Staff Directory</h4></Card.Header>
                        <Card.Body>
                            {employees === null ? <LoadingSpinner/> : <MyTable jsonData={employees} columnHeaders={columnHeaders} includeGlobalFilter={true}/>}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default StaffContacts;