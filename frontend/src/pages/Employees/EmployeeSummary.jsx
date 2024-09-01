import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import Avatar from 'components/common/ui/Avatar';
import Divider from 'components/common/ui/Divider';

const EmployeeSummary = ({ employee }) => {
    const nameStyle = {
        fontSize: '40px', // Larger font size for the name
        fontWeight: 'bold', // Optional: makes the name bold
        marginBottom: '5px' // Adds space between the image and the name
    };

    const titleStyle = {
        fontSize: '16px', // Smaller font size for the job title
        color: '#6c757d',  // Subtle color, often used for secondary text in Bootstrap themes
        fontWeight: 'bold'
    };

    // Default to an empty array if qualifications is undefined
    const sortedQualifications = employee.qualifications?.sort((a, b) => b.passing_year - a.passing_year) || [];

    const longTerm = (doj) => {
        const currentYear = new Date().getFullYear();
        const joinDate = new Date(employee.doj);
        const joinYear = joinDate.getFullYear();
        return currentYear - joinYear;
    }
    return (
        <Card className='my-card m-3'>
            <Card.Header className='card-header'>
                <h3 className='title'>EMPLOYEE DETAILS</h3>
            </Card.Header>
            <Card.Body>
                <Row className="d-flex align-items-center justify-content-md-end">
                    <Col>
                        <Avatar src={`${process.env.REACT_APP_API_URL}/uploads/${employee.avatar}`} 
                        name={`${employee.name}`} size={100} />
                    </Col>
                    <Col xs="auto">
                        <div style={nameStyle}>{`${employee.name}`}</div>
                        <div style={titleStyle}>{employee.job_title}</div>
                        <div style={titleStyle}>Years of Service: {longTerm(employee.doj)}</div>
                    </Col>
                </Row>
                <Divider />
                <Row className="my-2 d-flex align-items-center justify-content-md-end">
                    <Col xs={12} md={6}>
                        <div><strong>Employee ID: </strong> <span>{employee.employee_id}</span></div>
                        <div><strong>Phone Number: </strong> <span>{employee.cell_no}</span></div>
                        <div><strong>Work Email: </strong> <span>{employee.email}</span></div>
                    </Col>
                    <Col xs={12} md={6}>
                        <div><strong>Department: </strong> <span>{employee.department_name}</span></div>
                        <div><strong>Reports To: </strong> <span>HOD</span></div>
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
                        <div><strong>CNIC Number: </strong> <span>{employee.cnic_no}</span></div>
                        <div><strong>Nationality: </strong> <span>{employee.nationality}</span></div>
                    </Col>
                </Row>
                <Divider />
                <Row className="my-2 d-flex align-items-center justify-content-md-end">
                    <h4 className='mb-4'>Employment Details</h4>
                    <Col xs={12} md={6}>
                        <div><strong>Job Title: </strong> <span>{employee.job_title}</span></div>
                        <div><strong>Employment Type: </strong> <span>Full-time</span></div>
                        <div><strong>Employment Status: </strong> <span>Active</span></div>
                    </Col>
                    <Col xs={12} md={6}>
                        <div><strong>Salary: </strong> <span>PKR {employee.salary}/month</span></div>
                        <div><strong>Employee Classification: </strong> <span>Exempt</span></div>
                        <div><strong>Previous Position: </strong> <span>{employee.previous_position}</span></div>
                    </Col>
                </Row>
                <Divider />
                {/* <Row className="my-2 d-flex align-items-center justify-content-md-end"> */}
                    <h4 className='mb-4'>Education Details</h4>
                    <Row className="mb-4">
                    {sortedQualifications.map((qualification, idx) => (
                        <Col key={idx} xs={12} md={6} className='mb-4'>
                            <div><strong>Degree: </strong> <span>{qualification.degree_type}</span></div>
                            <div><strong>Field of Study: </strong> <span>{qualification.specialization}</span></div>
                            <div><strong>Institution: </strong> <span>{qualification.institute_name}</span></div>
                            <div><strong>Graduation Year: </strong> <span>{qualification.passing_year}</span></div>
                            <div><strong>Honors: </strong> <span>{qualification.cgpa_percentage}</span></div>
                        </Col>
                    ))}
                </Row>
                {/* </Row> */}
            </Card.Body>
        </Card>
    );
}

export default EmployeeSummary;