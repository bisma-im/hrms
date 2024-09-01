import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { format } from 'date-fns';

const EmployeeHeader = ({ employee }) => {
 // or return a loader/spinner
    return (
        <Container fluid className="my-3">
            <Row className="align-items-center">
                <Col xs="auto">
                    <Image
                        src={`${process.env.REACT_APP_API_URL}/uploads/${employee.avatar}`}
                        roundedCircle
                        width="90"
                        height="90"
                        className='m-2'
                        style={{ backgroundColor: 'white', padding: '5px'}}
                    />
                </Col>
                <Col>
                    <p className="mb-0 custom-label" style={{ fontSize: '20px', fontWeight: 'bold'}}>{employee.name}</p>
                    <p className="custom-label my-2 pt-2" style={{ fontSize: '13px'}}>{employee.job_title}</p>
                </Col>
                <Col>
                    <p className='mb-1 custom-label'>Employee ID: {employee.employee_id}</p>
                    <p className='mb-1 custom-label'>Date of Birth: {format(new Date(employee.dob), 'dd/MMMM/yyyy')}</p>
                    <p className='mb-1 custom-label'>Gender: {employee.gender}</p>
                </Col>
                <Col>
                    <p className='mb-1 custom-label'>Registration Number: {employee.reg_no}</p>
                    <p className='mb-1 custom-label'>Department: {employee.department_name}</p>
                    <p className='mb-1 custom-label'>Date of Joining: {format(new Date(employee.doj), 'dd/MMMM/yyyy')}</p>
                </Col>
            </Row>
        </Container>
    );
};

export default EmployeeHeader;
