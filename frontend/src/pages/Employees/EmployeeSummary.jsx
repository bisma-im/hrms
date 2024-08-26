import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { avatar } from 'assets/images';
import Avatar from 'components/common/ui/Avatar';
import { useSelector } from 'react-redux';
import Divider from 'components/common/ui/Divider';

const EmployeeSummary = () => {
    const employee = useSelector((state) => state.employee.selectedEmployee);
    const nameStyle = {
        fontSize: '40px', // Larger font size for the name
        fontWeight: 'bold', // Optional: makes the name bold
        margin: '20px' // Adds space between the image and the name
    };

    const titleStyle = {
        fontSize: '16px', // Smaller font size for the job title
        color: '#6c757d',  // Subtle color, often used for secondary text in Bootstrap themes
        marginLeft: '20px',
        fontWeight: 'bold'
    };
    return (
        <Card className='my-card m-3'>
            <Card.Header className='card-header'>
                <h3 className='title'>EMPLOYEE DETAILS</h3>
            </Card.Header>
            <Card.Body>
                <Row className="d-flex align-items-center justify-content-md-end">
                    <Col>
                        <Avatar src={avatar} name={`${employee.first_name} ${employee.last_name}`} size={100} />
                    </Col>
                    <Col xs="auto">
                        <div style={nameStyle}>{`${employee.first_name} ${employee.last_name}`}</div>
                        <div style={titleStyle}>{employee.job_title}</div>
                    </Col>
                </Row>
                <Divider />
                <Row className="my-2 d-flex align-items-center justify-content-md-end">
                    <Col xs={12} md={6}>
                        <div><strong>Employee ID: </strong> <span>{employee.id}</span></div>
                        <div><strong>Phone Number: </strong> <span>{employee.phone}</span></div>
                        <div><strong>Work Email: </strong> <span>{employee.email}</span></div>
                    </Col>
                    <Col xs={12} md={6}>
                        <div><strong>Department: </strong> <span>{employee.department}</span></div>
                        <div><strong>Reports To: </strong> <span>{employee.reports_to}</span></div>
                        <div><strong>DOJ: </strong> <span>{employee.doj}</span></div>
                    </Col>
                </Row>
                <Divider />
                <Row className="my-2 d-flex align-items-center justify-content-md-end">
                    <h4 className='mb-4'>Personal Information</h4>
                    <Col xs={12} md={6}>
                        <div><strong>Address: </strong> <span>{employee.address}</span></div>
                        <div><strong>Gender: </strong> <span>{employee.gender}</span></div>
                        <div><strong>DOB: </strong> <span>{employee.dob}</span></div>
                    </Col>
                    <Col xs={12} md={6}>
                        <div><strong>Marital Status: </strong> <span>{employee.marital_status}</span></div>
                        <div><strong>CNIC Number: </strong> <span>{employee.cnic_number}</span></div>
                        <div><strong>Nationality: </strong> <span>{employee.country}</span></div>
                    </Col>
                </Row>
                <Divider />
                <Row className="my-2 d-flex align-items-center justify-content-md-end">
                    <h4 className='mb-4'>Employment Details</h4>
                    <Col xs={12} md={6}>
                        <div><strong>Job Title: </strong> <span>{employee.job_title}</span></div>
                        <div><strong>Employment Type: </strong> <span>{employee.employment_type}</span></div>
                        <div><strong>Employment Status: </strong> <span>Active</span></div>
                    </Col>
                    <Col xs={12} md={6}>
                        <div><strong>Salary: </strong> <span>PKR {employee.salary}/month</span></div>
                        <div><strong>Employee Classification: </strong> <span>Exempt</span></div>
                        <div><strong>Previous Position: </strong> <span>{employee.previous_position}</span></div>
                    </Col>
                </Row>
                <Divider />
                <Row className="my-2 d-flex align-items-center justify-content-md-end">
                    <h4 className='mb-4'>Education Details</h4>
                    <Col xs={12} md={6}>
                        <div><strong>Degree: </strong> <span>{employee.degree_1}</span></div>
                        <div><strong>Field of Study: </strong> <span>{employee.degree_1_major}</span></div>
                        <div><strong>Institution: </strong> <span>{employee.degree_1_institution}</span></div>
                        <div><strong>Graduation Year: </strong> <span>{employee.degree_1_graduation_year}</span></div>
                        <div><strong>Honors: </strong> <span>{employee.degree_1_honors}</span></div>
                    </Col>
                    <Col xs={12} md={6}>
                        <div><strong>Degree: </strong> <span>{employee.degree_2}</span></div>
                        <div><strong>Field of Study: </strong> <span>{employee.degree_2_major}</span></div>
                        <div><strong>Institution: </strong> <span>{employee.degree_2_institution}</span></div>
                        <div><strong>Graduation Year: </strong> <span>{employee.degree_2_graduation_year}</span></div>
                        <div><strong>Honors: </strong> <span>{employee.degree_2_honors}</span></div>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default EmployeeSummary;