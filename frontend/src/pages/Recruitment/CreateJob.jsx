import { fetchDepartments } from 'features/department/departmentService';
import { addJob, fetchJob } from 'features/job/jobService';
import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Container, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const CreateJob = () => {
    const { jobId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth);
    const { departments } = useSelector((state) => state.departments);

    useEffect(() => {
        dispatch(fetchDepartments());
    }, [dispatch]);

    useEffect(() => {
        const fetchData = async () => {
            if (jobId) {
                try {
                    const data = await fetchJob(jobId);
                    console.log(data)
                    setFormData(data);
                } catch (error) {
                    console.error('Failed to fetch job details:', error);
                } 
            }
        };

        fetchData();
    }, [jobId, dispatch]);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        department_id: '',
        qualification: '',
        experience_years: '',
        employment_type: '',
        salary_range: '',
        campus: '',
        vacancies: '',
        is_published: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            ...formData,  // Assuming formData is already an object containing the form fields
            user_id: user.id  // Add user_id directly to the object
        };

        // Use the FormData object for the request
        const response = await addJob(data);
        if (response.success) {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Job successfully created!',
                confirmButtonText: 'OK'
            }).then(resetResult => {
                if (resetResult.isConfirmed) navigate('/jobs');
            });
        }
        // Add logic to handle form submission
    };

    return (
        <Container fluid>
            <Col lg={12}>
                <Form onSubmit={handleSubmit} className='my-form m-0 m-lg-3'>
                    <Card className="my-card card-bx mb-3">
                        <Card.Header>
                            <h3 className="title">Create Job</h3>
                        </Card.Header>
                        <Card.Body>
                            {/* <FormHeader title="Create Job" /> */}
                            <Row>
                                <Col sm={6} className="mb-3">
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
                                <Col sm={6} className="mb-3">
                                    <Form.Label className="form-label">Number of Vacancies</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Enter vacancies"
                                        name="vacancies"
                                        value={formData.vacancies}
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
                                        name="department_id"
                                        value={formData.department_id}
                                        onChange={handleChange}
                                        className="form-control form-select"
                                    >
                                        <option>Choose department...</option>
                                        {departments.map((dept, i) => (
                                            <option key={i} value={dept.department_id}>{dept.department_name}</option>
                                        ))}
                                    </Form.Control>
                                </Col>

                                <Col sm={6} className="mb-3">
                                    <Form.Label className="form-label">Employment Type</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="employment_type"
                                        value={formData.employment_type}
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
                                    <Form.Label className="form-label">Required Qualification</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="qualification"
                                        name="qualification"
                                        value={formData.qualification}
                                        onChange={handleChange}
                                        className="form-control form-input p-3"
                                    />
                                </Col>

                                <Col sm={6} className="mb-3">
                                    <Form.Label className="form-label">Experience (years)</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Experience required"
                                        name="experience_years"
                                        value={formData.experience_years}
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
                                        placeholder="Salary Range"
                                        name="salary_range"
                                        value={formData.salary_range}
                                        onChange={handleChange}
                                        className="form-control form-input p-3"
                                    />
                                </Col>

                                <Col sm={6} className="mb-3">
                                    <Form.Label className="form-label">Campus</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="campus"
                                        defaultValue={formData.campus}
                                        onChange={handleChange}
                                        className='form-control form-select'
                                    >
                                        <option>Choose campus...</option>
                                        <option value="isl_E8">Islamabad E-8 Campus</option>
                                        <option value="isl_H11">Islamabad H-11 Campus</option>
                                        <option value="health_sciences">Health Sciences Campus</option>
                                        <option value="karachi">Karachi Campus</option>
                                        <option value="lahore">Lahore Campus</option>
                                    </Form.Control>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12} className="my-3">
                                    <Form.Group>
                                        <div>
                                            <Form.Label className="form-label me-3">Publish now?</Form.Label>
                                            <Form.Check
                                                className='form-label'
                                                type="radio"
                                                inline
                                                label="Yes"
                                                name="is_published"
                                                value="y"
                                                checked={formData.is_published === 'y'}
                                                onChange={handleChange}
                                                id="publish"
                                            />
                                            <Form.Check
                                                className='form-label'
                                                type="radio"
                                                label="No"
                                                name="is_published"
                                                inline
                                                value="n"
                                                checked={formData.is_published === 'n'}
                                                onChange={handleChange}
                                                id="notPublish"
                                            />
                                        </div>
                                    </Form.Group>
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
