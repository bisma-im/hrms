import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Col, Form, Row, Button } from "react-bootstrap";
import { fetchDepartments } from 'features/department/departmentService';
import { fetchJobsByDepartment } from 'features/job/jobService';

const PersonalInfo = ({ nextStep, handleChange, values }) => {
    const dispatch = useDispatch();
    const { departments } = useSelector((state) => state.departments);
    const [jobs, setJobs] = useState([]);
    const [formErrors, setFormErrors] = useState({});

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
        const publishedJobs = fetchedJobs && fetchedJobs.filter(job => job.is_published === 'y');
        setJobs(publishedJobs);
    };

    const validateForm = () => {
        const errors = {};

        if (!values.campus) {
            errors.campus = "Campus is required.";
        }

        if (!values.department_id) {
            errors.department_id = "Department is required.";
        }

        if (!values.job_id) {
            errors.job_id = "Designation is required.";
        }

        if (!values.name || values.name.trim() === "") {
            errors.name = "Full Name is required.";
        }

        if (!values.father_name || values.father_name.trim() === "") {
            errors.father_name = "Father's Name is required.";
        }

        if (!values.photo) {
            errors.photo = "Passport Size Photograph is required.";
        }

        const cnicRegex = /^[0-9]{5}-[0-9]{7}-[0-9]$/;
        if (!values.cnic_no || !cnicRegex.test(values.cnic_no)) {
            errors.cnic_no = "CNIC should be in the format XXXXX-XXXXXXX-X";
        }

        if (!values.dob) {
            errors.dob = "Date of Birth is required.";
        }

        if (!values.marital_status) {
            errors.marital_status = "Marital Status is required.";
        }

        if (!values.gender) {
            errors.gender = "Gender is required.";
        }

        const cellRegex = /^[0-9]{4}-[0-9]{7}$/;
        if (!values.cell_no || !cellRegex.test(values.cell_no)) {
            errors.cell_no = "Phone no. required in format 03XX-XXXXXXX";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!values.email || !emailRegex.test(values.email)) {
            errors.email = "Valid Email is required.";
        }

        if (!values.nationality || values.nationality.trim() === "") {
            errors.nationality = "Nationality is required.";
        }

        if (!values.religion || values.religion.trim() === "") {
            errors.religion = "Religion is required.";
        }

        if (!values.sect || values.sect.trim() === "") {
            errors.sect = "Sect is required.";
        }

        if (!values.specialization || values.specialization.trim() === "") {
            errors.specialization = "Specialization is required.";
        }

        if (!values.postal_address || values.postal_address.trim() === "") {
            errors.postal_address = "Address is required.";
        }

        if (!values.how_hear) {
            errors.how_hear = "Please select how you heard about us.";
        }

        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm();
        setFormErrors(errors);
        if (Object.keys(errors).length === 0) {
            nextStep();
        }

    };

    const handleChangeWithErrorCheck = (input) => (e) => {
        handleChange(input)(e); // Call the original handleChangeWithErrorCheck function to update values

        // Clear the specific error related to the field being changed
        setFormErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            delete newErrors[input];
            return newErrors;
        });
    };


    return (
        <Card className="my-card card-bx">
            <Card.Header className="card-header">
                <h4 className="h3" style={{ color: "#004B87" }}>1. Personal Information</h4>
            </Card.Header>
            <Card.Body>
                <Row>
                    <Col sm={4} className="mb-3">
                        <Form.Label className="form-label">Campus</Form.Label>
                        <Form.Control
                            as="select"
                            name="campus"
                            defaultValue={values.campus}
                            onChange={handleChangeWithErrorCheck('campus')}
                            className={`form-control form-select ${formErrors.campus ? 'is-invalid' : ''}`}
                        >
                            <option>Choose campus...</option>
                            <option value="isl_E8">Islamabad E-8 Campus</option>
                            <option value="isl_H11">Islamabad H-11 Campus</option>
                            <option value="health_sciences">Health Sciences Campus</option>
                            <option value="karachi">Karachi Campus</option>
                            <option value="lahore">Lahore Campus</option>
                        </Form.Control>
                        {formErrors.campus && <div className="invalid-feedback">{formErrors.campus}</div>}
                    </Col>
                    <Col sm={4} className="mb-3">
                        <Form.Label className="form-label">Department</Form.Label>
                        <Form.Control
                            as="select"
                            name="department_id"
                            defaultValue={values.department_id}
                            onChange={handleChangeWithErrorCheck('department_id')}
                            className={`form-control form-select ${formErrors.department_id ? 'is-invalid' : ''}`}
                        >
                            <option>Choose department...</option>
                            {departments.map((dept, i) => (
                                <option key={i} value={dept.department_id}>{dept.department_name}</option>
                            ))}
                        </Form.Control>
                        {formErrors.department_id && <div className="invalid-feedback">{formErrors.department_id}</div>}
                    </Col>
                    <Col sm={4} className="mb-3">
                        <Form.Label className="form-label">Designation</Form.Label>
                        <Form.Control
                            as="select"
                            required
                            name="job_id"
                            defaultValue={values.job_id}
                            onChange={handleChangeWithErrorCheck('job_id')}
                            className={`form-control form-select ${formErrors.job_id ? 'is-invalid' : ''}`}
                        >
                            <option>Choose designation...</option>
                            {jobs && jobs.map((job, i) => (
                                <option key={i} value={job.job_id}>{job.title}</option>
                            ))}
                        </Form.Control>
                        {formErrors.job_id && <div className="invalid-feedback">{formErrors.job_id}</div>}
                    </Col>
                </Row>
                <Row>
                    <Col sm={4} className="mb-3">
                        <Form.Label className="form-label">Full Name</Form.Label>
                        <Form.Control
                            className={`form-control ${formErrors.name ? 'is-invalid' : ''}`}
                            type="text"
                            required
                            name="name"
                            placeholder="Full Name"
                            onChange={handleChangeWithErrorCheck('name')}
                            defaultValue={values.name}
                        />
                        {formErrors.name && <div className="invalid-feedback">{formErrors.name}</div>}
                    </Col>
                    <Col sm={4} className="mb-3">
                        <Form.Label className="form-label">Father's Name</Form.Label>
                        <Form.Control
                            className={`form-control ${formErrors.father_name ? 'is-invalid' : ''}`}
                            type="text"
                            name="father_name"
                            required
                            placeholder="Father's Name"
                            onChange={handleChangeWithErrorCheck('father_name')}
                            defaultValue={values.father_name}
                        />
                        {formErrors.father_name && <div className="invalid-feedback">{formErrors.father_name}</div>}
                    </Col>
                    <Col sm={4} className="mb-3">
                        <Form.Label className="form-label">Passport Size Photograph</Form.Label>
                        {values.photo !== "" ?
                            (
                                <a
                                    href={`${process.env.REACT_APP_API_URL}/uploads/${values.photo}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className='form-control  form-label'
                                    style={{
                                        width: '100%',
                                        textDecoration: 'none',  // Removes underline
                                        textAlign: 'center',  // Centers the text
                                        paddingTop: '11px'
                                    }}
                                >
                                    View Photo
                                </a>
                            ) : (
                                <>
                                    <Form.Control
                                        className={`form-control pt-3 ps-3 ${formErrors.photo ? 'is-invalid' : ''}`}
                                        type="file"
                                        name="photo"
                                        required
                                        placeholder="Select Image"
                                        onChange={handleChangeWithErrorCheck('photo')}
                                        accept="image/png, image/jpeg, image/jpg"
                                    />
                                    {formErrors.photo && <div className="invalid-feedback">{formErrors.photo}</div>}
                                </>
                            )}
                    </Col>
                </Row>
                <Row>
                    <Col sm={4} className="mb-3">
                        <Form.Label className="form-label">CNIC No.</Form.Label>
                        <Form.Control
                            className={`form-control ${formErrors.cnic_no ? 'is-invalid' : ''}`}
                            type="text"
                            required
                            name="cnic_no"
                            placeholder="xxxxx-xxxxxxx-x"
                            onChange={handleChangeWithErrorCheck('cnic_no')}
                            defaultValue={values.cnic_no}
                        />
                        {formErrors.cnic_no && <div className="invalid-feedback">{formErrors.cnic_no}</div>}
                    </Col>
                    <Col sm={4} className="mb-3">
                        <Form.Label className="form-label">Date of Birth</Form.Label>
                        <Form.Control
                            className={`form-control ${formErrors.dob ? 'is-invalid' : ''}`}
                            type="date"
                            name="dob"
                            required
                            placeholder="Date of Birth"
                            onChange={handleChangeWithErrorCheck('dob')}
                            defaultValue={values.dob}
                        />
                        {formErrors.dob && <div className="invalid-feedback">{formErrors.dob}</div>}
                    </Col>
                    <Col sm={4} className="mb-3">
                        <Form.Label className="form-label">Marital Status</Form.Label>
                        <Form.Control
                            as="select"
                            className={`form-control form-select ${formErrors.marital_status ? 'is-invalid' : ''}`}
                            type="text"
                            name="marital_status"
                            required
                            placeholder="Marital Status"
                            onChange={handleChangeWithErrorCheck('marital_status')}
                            defaultValue={values.marital_status}
                        >
                            <option>Choose...</option>
                            <option value="single">Single</option>
                            <option value="married">Married</option>
                            <option value="widowed">Widowed</option>
                            <option value="divorced">Divorced</option>
                            <option value="dk">Prefer not to say</option>
                        </Form.Control>
                        {formErrors.marital_status && <div className="invalid-feedback">{formErrors.marital_status}</div>}
                    </Col>
                </Row>
                <Row>
                    <Col sm={4} className="mb-3">
                        <Form.Label className="form-label">Gender</Form.Label>
                        <Form.Control
                            as="select"
                            className={`form-control form-select ${formErrors.gender ? 'is-invalid' : ''}`}
                            type="text"
                            name="gender"
                            required
                            placeholder="Select Gender"
                            onChange={handleChangeWithErrorCheck('gender')}
                            defaultValue={values.gender}
                        >
                            <option>Choose...</option>
                            <option value="female">Female</option>
                            <option value="male">Male</option>
                            <option value="dk">Prefer not to say</option>
                        </Form.Control>
                        {formErrors.gender && <div className="invalid-feedback">{formErrors.gender}</div>}
                    </Col>
                    <Col sm={4} className="mb-3">
                        <Form.Label className="form-label">Cell No.</Form.Label>
                        <Form.Control
                            className={`form-control ${formErrors.cell_no ? 'is-invalid' : ''}`}
                            type="text"
                            name="cell_no"
                            required
                            placeholder="03XX-XXXXXXX"
                            onChange={handleChangeWithErrorCheck('cell_no')}
                            defaultValue={values.cell_no}
                        />
                        {formErrors.cell_no && <div className="invalid-feedback">{formErrors.cell_no}</div>}
                    </Col>
                    <Col sm={4} className="mb-3">
                        <Form.Label className="form-label">Email</Form.Label>
                        <Form.Control
                            className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
                            type="email"
                            name="email"
                            required
                            placeholder="Email"
                            onChange={handleChangeWithErrorCheck('email')}
                            defaultValue={values.email}
                        />
                        {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
                    </Col>
                </Row>
                <Row>
                    <Col sm={4} className="mb-3">
                        <Form.Label className="form-label">Nationality</Form.Label>
                        <Form.Control
                            className={`form-control ${formErrors.nationality ? 'is-invalid' : ''}`}
                            type="text"
                            name="nationality"
                            required
                            placeholder="Nationality"
                            onChange={handleChangeWithErrorCheck('nationality')}
                            defaultValue={values.nationality}
                        />
                        {formErrors.nationality && <div className="invalid-feedback">{formErrors.nationality}</div>}
                    </Col>
                    <Col sm={4} className="mb-3">
                        <Form.Label className="form-label">Religion</Form.Label>
                        <Form.Control
                            className={`form-control ${formErrors.religion ? 'is-invalid' : ''}`}
                            type="text"
                            name="religion"
                            required
                            placeholder="Religion"
                            onChange={handleChangeWithErrorCheck('religion')}
                            defaultValue={values.religion}
                        />
                        {formErrors.religion && <div className="invalid-feedback">{formErrors.religion}</div>}
                    </Col>
                    <Col sm={4} className="mb-3">
                        <Form.Label className="form-label">Sect</Form.Label>
                        <Form.Control
                            className={`form-control ${formErrors.sect ? 'is-invalid' : ''}`}
                            type="text"
                            name="sect"
                            required
                            placeholder="Sect"
                            onChange={handleChangeWithErrorCheck('sect')}
                            defaultValue={values.sect}
                        />
                        {formErrors.sect && <div className="invalid-feedback">{formErrors.sect}</div>}
                    </Col>
                </Row>
                <Row>
                    <Col sm={4} className="mb-3">
                        <Form.Label className="form-label">Specialization</Form.Label>
                        <Form.Control
                            className={`form-control ${formErrors.specialization ? 'is-invalid' : ''}`}
                            type="text"
                            name="specialization"
                            required
                            placeholder="Specialization"
                            onChange={handleChangeWithErrorCheck('specialization')}
                            defaultValue={values.specialization}
                        />
                        {formErrors.specialization && <div className="invalid-feedback">{formErrors.specialization}</div>}
                    </Col>
                    <Col sm={8} className="mb-3">
                        <Form.Label className="form-label">Address</Form.Label>
                        <Form.Control
                            type="text"
                            className={`form-control ${formErrors.postal_address ? 'is-invalid' : ''}`}
                            name="postal_address"
                            required
                            placeholder="Address"
                            onChange={handleChangeWithErrorCheck('postal_address')}
                            defaultValue={values.postal_address}
                        />
                        {formErrors.postal_address && <div className="invalid-feedback">{formErrors.postal_address}</div>}
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} className="my-3">
                        <Form.Group>
                            <div>
                                <Form.Label className="form-label me-3">How did you hear about us? (Select one)</Form.Label>
                                <Form.Check
                                    className={`form-label ${formErrors.how_hear ? 'is-invalid' : ''}`}
                                    type="radio"
                                    inline
                                    label="Website"
                                    name="how_hear"
                                    value="website"
                                    checked={values.how_hear === 'website'}
                                    onChange={handleChangeWithErrorCheck('how_hear')}
                                    id="how_hear_website"
                                />
                                <Form.Check
                                    className={`form-label ${formErrors.how_hear ? 'is-invalid' : ''}`}
                                    inline
                                    type="radio"
                                    label="Social Media"
                                    name="how_hear"
                                    value="social_media"
                                    checked={values.how_hear === 'social_media'}
                                    onChange={handleChangeWithErrorCheck('how_hear')}
                                    id="how_hear_social_media"
                                />
                                <Form.Check
                                    className={`form-label ${formErrors.how_hear ? 'is-invalid' : ''}`}
                                    type="radio"
                                    inline
                                    label="News Paper"
                                    name="how_hear"
                                    value="news_paper"
                                    checked={values.how_hear === 'news_paper'}
                                    onChange={handleChangeWithErrorCheck('how_hear')}
                                    id="how_hear_news_paper"
                                />
                                <Form.Check
                                    className={`form-label ${formErrors.how_hear ? 'is-invalid' : ''}`}
                                    type="radio"
                                    inline
                                    label="Friend"
                                    name="how_hear"
                                    value="friend"
                                    checked={values.how_hear === 'friend'}
                                    onChange={handleChangeWithErrorCheck('how_hear')}
                                    id="how_hear_friend"
                                />
                            </div>
                            {formErrors.how_hear && <div className="invalid-feedback d-block">{formErrors.how_hear}</div>}
                        </Form.Group>
                    </Col>
                </Row>
            </Card.Body>
            <Card.Footer className="d-flex align-items-center justify-content-md-end">
                <Button type="submit" className="link-button" onClick={handleSubmit}>Next</Button>
            </Card.Footer>
        </Card>

    );
};

export default PersonalInfo;
