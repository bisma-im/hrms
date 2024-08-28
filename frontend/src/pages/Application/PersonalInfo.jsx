import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Col, Form, Row, Button } from "react-bootstrap";
import { fetchDepartments } from 'features/department/departmentService';
import { fetchJobsByDepartment } from 'features/job/jobService';

const PersonalInfo = ({ nextStep, handleChange, values }) => {
    const dispatch = useDispatch();
    const { departments } = useSelector((state) => state.departments);
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        dispatch(fetchDepartments());
    }, [dispatch]);

    useEffect(() => {
        if (values.department_id) {
            fetchJobsForDepartment(values.department_id);
        }
    }, [values.department_id]);

    const fetchJobsForDepartment = async (departmentId) => {
        const fetchedJobs = await fetchJobsByDepartment(departmentId); // Implement this function
        setJobs(fetchedJobs);
    };


    return (
        <Card className="my-card card-bx">
            <Card.Header className="card-header"><h4 className="h3" style={{ color: "#004B87" }}>1. Personal Information</h4></Card.Header>
            <Card.Body>
                <Row>
                    <Col sm={4} className="mb-3">
                        <Form.Label className="form-label">Campus</Form.Label>
                        <Form.Control
                            as="select"
                            name="campus"
                            defaultValue={values.campus}
                            onChange={handleChange('campus')}
                            className="form-control form-select"
                        >
                            <option>Choose campus...</option>
                            <option value="isl_E8">Islamabad E-8 Campus</option>
                            <option value="isl_H11">Islamabad H-11 Campus</option>
                            <option value="health_sciences">Health Sciences Campus</option>
                            <option value="karachi">Karachi Campus</option>
                            <option value="lahore">Lahore Campus</option>
                        </Form.Control>
                    </Col>
                    <Col sm={4} className="mb-3">
                        <Form.Label className="form-label">Department</Form.Label>
                        <Form.Control
                            as="select"
                            name="department_id"
                            defaultValue={values.department_id}
                            onChange={handleChange('department_id')}
                            className="form-control form-select"
                        >
                            <option>Choose department...</option>
                            {departments.map((dept, i) => (
                                <option key={i} value={dept.department_id}>{dept.department_name}</option>
                            ))}
                        </Form.Control>
                    </Col>
                    <Col sm={4} className="mb-3">
                        <Form.Label className="form-label">Specialization</Form.Label>
                        <Form.Control
                            className="form-control"
                            type="text"
                            name="specialization"
                            required
                            placeholder="Specialization"
                            onChange={handleChange('specialization')}
                            defaultValue={values.specialization}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col sm={4} className="mb-3">
                        <Form.Label className="form-label">Full Name</Form.Label>
                        <Form.Control
                            className="form-control"
                            type="text"
                            required
                            name="name"
                            placeholder="Full Name"
                            onChange={handleChange('name')}
                            defaultValue={values.name}
                        />
                    </Col>
                    <Col sm={4} className="mb-3">
                        <Form.Label className="form-label">Father's Name</Form.Label>
                        <Form.Control
                            className="form-control"
                            type="text"
                            name="father_name"
                            required
                            placeholder="Father's Name"
                            onChange={handleChange('father_name')}
                            defaultValue={values.father_name}
                        />
                    </Col>
                    <Col sm={4} className="mb-3">
                        <Form.Label className="form-label">Passport Size Photograph</Form.Label>
                        <Form.Control
                            className="form-control pt-3 ps-3"
                            type="file"
                            name="photo"
                            required
                            placeholder="Select Image"
                            onChange={handleChange('photo')}
                            accept="image/png, image/jpeg, image/jpg" />
                    </Col>
                </Row>
                <Row>
                    <Col sm={4} className="mb-3">
                        <Form.Label className="form-label">CNIC No.</Form.Label>
                        <Form.Control
                            className="form-control"
                            type="text"
                            required
                            name="cnic_no"
                            placeholder="xxxxx-xxxxxxx-x"
                            onChange={handleChange('cnic_no')}
                            defaultValue={values.cnic_no}
                        />
                    </Col>
                    <Col sm={4} className="mb-3">
                        <Form.Label className="form-label">Date of Birth</Form.Label>
                        <Form.Control
                            className="form-control"
                            type="date"
                            name="dob"
                            required
                            placeholder="Date of Birth"
                            onChange={handleChange('dob')}
                            defaultValue={values.dob}
                        />
                    </Col>
                    <Col sm={4} className="mb-3">
                        <Form.Label className="form-label">Marital Status</Form.Label>
                        <Form.Control
                            as="select"
                            className="form-control form-select"
                            type="text"
                            name="marital_status"
                            required
                            placeholder="Marital Status"
                            onChange={handleChange('marital_status')}
                            defaultValue={values.marital_status}
                        >
                            <option>Choose...</option>
                            <option value="single">Single</option>
                            <option value="married">Married</option>
                            <option value="widowed">Widowed</option>
                            <option value="divorced">Divorced</option>
                            <option value="dk">Prefer not to say</option>
                        </Form.Control>
                    </Col>
                </Row>
                <Row>
                    <Col sm={4} className="mb-3">
                        <Form.Label className="form-label">Gender</Form.Label>
                        <Form.Control
                            as="select"
                            className="form-control form-select"
                            type="text"
                            name="gender"
                            required
                            placeholder="Select Gender"
                            onChange={handleChange('gender')}
                            defaultValue={values.gender}
                        >
                            <option>Choose...</option>
                            <option value="female">Female</option>
                            <option value="male">Male</option>
                            <option value="dk">Prefer not to say</option>
                        </Form.Control>
                    </Col>
                    <Col sm={4} className="mb-3">
                        <Form.Label className="form-label">Cell No.</Form.Label>
                        <Form.Control
                            className="form-control"
                            type="text"
                            name="cell_no"
                            required
                            placeholder="Cell No."
                            onChange={handleChange('cell_no')}
                            defaultValue={values.cell_no}
                        />
                    </Col>
                    <Col sm={4} className="mb-3">
                        <Form.Label className="form-label">Email</Form.Label>
                        <Form.Control
                            className="form-control"
                            type="email"
                            name="email"
                            required
                            placeholder="Email"
                            onChange={handleChange('email')}
                            defaultValue={values.email} />
                    </Col>
                </Row>
                <Row>
                    <Col sm={4} className="mb-3">
                        <Form.Label className="form-label">Nationality</Form.Label>
                        <Form.Control
                            className="form-control"
                            type="text"
                            name="nationality"
                            required
                            placeholder="Nationality"
                            onChange={handleChange('nationality')}
                            defaultValue={values.nationality}
                        />
                    </Col>
                    <Col sm={4} className="mb-3">
                        <Form.Label className="form-label">Religion</Form.Label>
                        <Form.Control
                            className="form-control"
                            type="text"
                            name="religion"
                            required
                            placeholder="Religion"
                            onChange={handleChange('religion')}
                            defaultValue={values.religion} />
                    </Col>
                    <Col sm={4} className="mb-3">
                        <Form.Label className="form-label">Sect</Form.Label>
                        <Form.Control
                            className="form-control"
                            type="text"
                            name="sect"
                            required
                            placeholder="Sect"
                            onChange={handleChange('sect')}
                            defaultValue={values.sect}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} className="my-3">
                        <Form.Group>
                            <div>
                                <Form.Label className="form-label  me-3">How did you hear about us? (Select one)</Form.Label>
                                <Form.Check
                                    className='form-label'
                                    type="radio"
                                    inline
                                    label="Website"
                                    name="how_hear"
                                    value="website"
                                    checked={values.how_hear === 'website'}
                                    onChange={handleChange('how_hear')}
                                    id="how_hear"
                                />
                                <Form.Check
                                    className='form-label'
                                    inline
                                    type="radio"
                                    label="Social Media"
                                    name="how_hear"
                                    value="social_media"
                                    checked={values.how_hear === 'social_media'}
                                    onChange={handleChange('how_hear')}
                                    id="how_hear"
                                />
                                <Form.Check
                                    className='form-label'
                                    type="radio"
                                    inline
                                    label="News Paper"
                                    name="how_hear"
                                    value="news_paper"
                                    checked={values.how_hear === 'news_paper'}
                                    onChange={handleChange('how_hear')}
                                    id="how_hear"
                                />
                                <Form.Check
                                    className='form-label'
                                    type="radio"
                                    inline
                                    label="From a Friend"
                                    name="how_hear"
                                    value="friend"
                                    checked={values.how_hear === 'friend'}
                                    onChange={handleChange('how_hear')}
                                    id="friend"
                                />
                            </div>
                        </Form.Group>
                    </Col>
                </Row>
                <Col sm={12} className="mb-3">
                    <Form.Label className="form-label">Address</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        className="form-control form-textarea p-3"
                        name="postal_address"
                        required
                        placeholder="Address"
                        onChange={handleChange('postal_address')}
                        defaultValue={values.postal_address}
                        style={{ height: "100px" }}
                    />
                </Col>
            </Card.Body>
            <Card.Footer className="d-flex align-items-center justify-content-md-end">
                <Button className="link-button" onClick={nextStep}>Next</Button>
            </Card.Footer>
        </Card>
    );
};

export default PersonalInfo;
