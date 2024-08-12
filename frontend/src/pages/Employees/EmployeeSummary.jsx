import React from 'react';
import { Card, Row, Col, Container, Tab, Nav } from 'react-bootstrap';
import { avatar } from 'assets/images'; 
import Avatar from 'components/common/ui/Avatar';
import Divider from 'components/common/ui/Divider';

const EmployeeSummary = () => {
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
        <Container fluid className='p-4'>
            <Row className="d-flex align-items-center justify-content-md-end">
                <Col>
                    <Avatar src={avatar} name={'Saif Hassan'} size={100}/>
                </Col>
                <Col xs="auto">
                    <div style={nameStyle}>{'Saif Hassan'}</div>
                    <div style={titleStyle}>{'Associate Professor'}</div>
                </Col>
            </Row>
            <Divider/>
            <Row className="my-2 d-flex align-items-center justify-content-md-end">
                <Col xs={12} md={6}>
                    <div><strong>Employee ID: </strong> <span>12345</span></div>
                    <div><strong>Phone Number: </strong> <span>0343-1233693</span></div>
                    <div><strong>Work Email: </strong> <span>saif.hassan@example.com</span></div>
                </Col>
                <Col xs={12} md={6}>
                    <div><strong>Department: </strong> <span>Computer Science</span></div>
                    <div><strong>Reports To: </strong> <span>Mitchell Admin</span></div>
                    <div><strong>DOJ: </strong> <span>12-Jul-2008</span></div>
                </Col>
            </Row>
            <Divider/>
            <Row className="my-2 d-flex align-items-center justify-content-md-end">
                <h4 className='mb-4'>Personal Information</h4>
                <Col xs={12} md={6}>
                    <div><strong>Address: </strong> <span>House no. 12, Nazimabad, Karachi</span></div>
                    <div><strong>Gender: </strong> <span>Male</span></div>
                    <div><strong>DOB: </strong> <span>31-Jan-1985</span></div>
                </Col>
                <Col xs={12} md={6}>
                    <div><strong>Marital Status: </strong> <span>Married</span></div>
                    <div><strong>CNIC Number: </strong> <span>40293-3273649-2</span></div>
                    <div><strong>Nationality: </strong> <span>Pakistani</span></div>
                </Col>
            </Row>
            <Divider/>
            <Row className="my-2 d-flex align-items-center justify-content-md-end">
                <h4 className='mb-4'>Employment Details</h4>
                <Col xs={12} md={6}>
                    <div><strong>Job Title: </strong> <span>Associate Professor</span></div>
                    <div><strong>Employment Type: </strong> <span>Full-time</span></div>
                    <div><strong>Employment Status: </strong> <span>Active</span></div>
                </Col>
                <Col xs={12} md={6}>
                    <div><strong>Salary: </strong> <span>PKR 150,000/month</span></div>
                    <div><strong>Employee Classification: </strong> <span>Exempt</span></div>
                    <div><strong>Previous Position: </strong> <span>Assistant Professor</span></div>
                </Col>
            </Row>
            <Divider/>
            <Row className="my-2 d-flex align-items-center justify-content-md-end">
                <h4 className='mb-4'>Education Details</h4>
                <Col xs={12} md={6}>
                    <div><strong>Degree: </strong> <span>BS in Computer Science</span></div>
                    <div><strong>Field of Study: </strong> <span>Computer Science</span></div>
                    <div><strong>Institution: </strong> <span>Karachi University</span></div>
                    <div><strong>Graduation Year: </strong> <span>2014</span></div>
                    <div><strong>Honors: </strong> <span>Cum Laude</span></div>
                </Col>
                <Col xs={12} md={6}>
                    <div><strong>Degree: </strong> <span>MS in Computer Science</span></div>
                    <div><strong>Field of Study: </strong> <span>Computer Science</span></div>
                    <div><strong>Institution: </strong> <span>National University of Sciences and Technology (NUST)</span></div>
                    <div><strong>Graduation Year: </strong> <span>2017</span></div>
                    <div><strong>Honors: </strong> <span>Magna Cum Laude</span></div>
                </Col>
            </Row>
        </Container>
    );
}

export default EmployeeSummary;