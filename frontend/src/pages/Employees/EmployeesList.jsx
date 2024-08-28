import React, { useEffect } from 'react';
import { Card, Row, Col, Container } from 'react-bootstrap';
import { fetchEmployees } from 'features/employees/employeeService';
import { COLUMNS } from './Columns';
import MyTable from 'components/common/table/MyTable';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectEmployee } from 'features/employees/employeeSlice';

const EmployeesList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const employees = useSelector(state => state.employee.employees);

    // Fetch employees when component mounts
    useEffect(() => {
        dispatch(fetchEmployees());
    }, [dispatch]);

    const columnHeaders = COLUMNS;

    const handleRowClick = (employee) => {
        dispatch(selectEmployee(employee));
        navigate('/employee-details');
    };

    return (
        <Container fluid>
            <Row className="d-flex align-items-center justify-content-md-end">
                <Col xs="auto" className='m-4'>
                    <Link className='link-button' to={'/add-employee-form'}>Create</Link>
                </Col>
            </Row>
            <Row>
                <Col lg={12}>
                    <Card className='m-1 m-lg-3'>
                        <Card.Header className='h3'><h4>Employees</h4></Card.Header>
                        <Card.Body>
                            <MyTable jsonData={employees} columnHeaders={columnHeaders} onRowClick={handleRowClick}/>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default EmployeesList;