import React, { useState } from 'react';
import { Form, Button, Row, Col, Container, Card } from 'react-bootstrap';

const CreateJob = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    department: '',
    qualifications: '',
    experience: '',
    type: '',
    salary: '',
    location: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // Add logic to handle form submission
  };

  return (
    <Container fluid>
        <Col lg={12}>
            <Form onSubmit={handleSubmit} className='my-form m-3'>
                <Card className="my-card card-bx mb-3">    
                    <Card.Header>
                        <h6 className="title">Create Job</h6>
                    </Card.Header>
                    <Card.Body>
                {/* <FormHeader title="Create Job" /> */}
                        <Row>
                            <Col sm={12} className="mb-3">
                                <Form.Label className="form-label">Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="form-control p-3"
                                />
                            </Col>
                        </Row>

                        <Col sm={12} className="mb-3">
                            <Form.Label className="form-label">Description</Form.Label>
                            <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Job description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="form-control form-textarea p-3"
                            style={{ height: "100px" }} 
                            />
                        </Col>

                        <Row>
                            <Col sm={6} className="mb-3">
                                <Form.Label className="form-label">Department</Form.Label>
                                <Form.Control
                                as="select"
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                                className="form-control form-select"
                                >
                                <option>Choose...</option>
                                <option value="HR">Human Resources</option>
                                <option value="IT">Information Technology</option>
                                <option value="Finance">Finance</option>
                                </Form.Control>
                            </Col>

                            <Col sm={6} className="mb-3">
                            <Form.Label className="form-label">Type</Form.Label>
                            <Form.Control
                            as="select"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="form-control form-select"
                            >
                            <option>Choose...</option>
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Contract">Contract</option>
                            <option value="Temporary">Temporary</option>
                            </Form.Control>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6} className="mb-3">
                                <Form.Label className="form-label">Required Qualifications</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Qualifications"
                                    name="qualifications"
                                    value={formData.qualifications}
                                    onChange={handleChange}
                                    className="form-control form-input p-3"
                                />
                            </Col>

                            <Col sm={6} className="mb-3">
                                <Form.Label className="form-label">Experience (years)</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Experience"
                                    name="experience"
                                    value={formData.experience}
                                    onChange={handleChange}
                                    className="form-control form-input p-3"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6} className="mb-3">
                                <Form.Label className="form-label">Salary</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Salary"
                                    name="salary"
                                    value={formData.salary}
                                    onChange={handleChange}
                                    className="form-control form-input p-3"
                                />
                            </Col>

                            <Col sm={6} className="mb-3">
                                <Form.Label className="form-label">Location</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Location"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className="form-input p-3"
                                />
                            </Col>
                        </Row>
                    </Card.Body>
                    <Card.Footer className='card-footer'>
                        <div className='btn-right'>
                        <Button variant="primary" type="submit" className='m-1'>
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit" className='m-1'>
                            Submit
                        </Button>
                        </div>
                    </Card.Footer>
                </Card>
            </Form>
        </Col>
    </Container>
  );
};

export default CreateJob;
