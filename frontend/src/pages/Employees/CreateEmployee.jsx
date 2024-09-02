import React, { useCallback, useEffect, useState } from 'react';
import { Form, Button, Row, Col, Container, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDepartments } from 'features/department/departmentService';
import { fetchJobs } from 'features/job/jobService';
import Divider from 'components/common/ui/Divider';
import QualificationRepeater from 'pages/Application/QualificationRepeater';
import ChildRepeater from './ChildrenRepeater';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchApplicantDetails } from 'features/applicants/applicantService';
import LoadingSpinner from 'components/common/ui/LoadingSpinner';
import { addEmployee } from 'features/employees/employeeService';
import Swal from 'sweetalert2';

const initialFormData = {
    department_id: '',
    name: '',
    job_id: '',
    father_name: '',
    mother_name: '',
    gender: '',
    cnic_no: '',
    marital_status: '',
    num_of_children: '',
    residential_no: '',
    email: '',
    photo: null,  // Keep as null if you expect a file input
    cell_no: '',
    date_of_promotion: null,
    reg_no: '',
    card_no: '',
    office_letter_no: '',
    dob: null,
    permanent_address: '',
    present_address: '',
    nok_name: '',
    nok_rs: '',
    nok_contact: '',
    salary: '',
    start_working_hr: null,
    end_working_hr: null,
    publications_count: '',
    total_fm_experience: '',
    total_field_experience: '',
    children: [{ name: '', age: '' }],
    education: [
        {
            degree_type: '',
            duration_years: '',
            specialization: '',
            passing_year: '',
            cgpa_percentage: '',
            institute_name: '',
            country: ''
        }
    ],
};


const CreateEmployee = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { applicantId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const { departments } = useSelector((state) => state.departments);
    const [jobs, setJobs] = useState([]);
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchDepartments());
        getJobs();
    }, [dispatch]);

    const getJobs = async () => {
        const fetchedJobs = await fetchJobs(); // Implement this function
        setJobs(fetchedJobs);
    }

    const validateForm = (formData) => {
        const validationErrors = {};
        // Check required fields are not null or empty
        const requiredFields = [
            'name', 'job_id', 'cnic_no', 'dob', 'marital_status', 'num_of_children',
            'cell_no', 'residential_no', 'email', 'gender', 'reg_no', 'card_no',
            'salary', 'start_working_hr', 'end_working_hr', 'nok_name', 'nok_rs',
            'nok_contact', 'present_address', 'permanent_address', 'father_name',
            'mother_name'
        ];

        requiredFields.forEach(field => {
            if (!formData[field] || formData[field] === '') {
                validationErrors[field] = `${field} is required`;
            }
        });

        // Validate CNIC pattern
        const cnicPattern = /^[0-9]{5}-[0-9]{7}-[0-9]{1}$/;
        if (formData.cnic_no && !cnicPattern.test(formData.cnic_no)) {
            validationErrors.cnic_no = 'CNIC number must be in the format XXXXX-XXXXXXX-X';
        }

        // Validate email pattern
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (formData.email && !emailPattern.test(formData.email)) {
            validationErrors.email = 'Invalid email format';
        }

        // Validate mobile number pattern
        const phonePattern = /^[0-9]{4}-[0-9]{7}$/;
        if (formData.cell_no && !phonePattern.test(formData.cell_no)) {
            validationErrors.cell_no = 'Cell number must be in the format XXXX-XXXXXXX';
        }
        if (formData.residential_no && !phonePattern.test(formData.residential_no)) {
            validationErrors.residential_no = 'Residential number must be in the format XXXX-XXXXXXX';
        }

        // Validate start and end working hours
        if (formData.start_working_hr && !/^[0-9]{2}:[0-9]{2}$/.test(formData.start_working_hr)) {
            validationErrors.start_working_hr = 'Invalid time format for start working hour';
        }
        if (formData.end_working_hr && !/^[0-9]{2}:[0-9]{2}$/.test(formData.end_working_hr)) {
            validationErrors.end_working_hr = 'Invalid time format for end working hour';
        }

        // Validate number of children
        if (formData.num_of_children < 0) {
            validationErrors.num_of_children = 'Number of children cannot be negative';
        }

        // Validate salary
        if (formData.salary < 0) {
            validationErrors.salary = 'Salary cannot be negative';
        }

        // Validate children fields
        // formData.children.forEach((child, index) => {
        //     if (!child.name || child.name === '') {
        //         validationErrors[`children_${index}_name`] = `Child ${index + 1} name is required`;
        //     }
        //     if (!child.age || child.age === '') {
        //         validationErrors[`children_${index}_age`] = `Child ${index + 1} age is required`;
        //     }
        // });

        // // Validate education fields
        // formData.education.forEach((edu, index) => {
        //     if (!edu.degree_type || edu.degree_type === '') {
        //         validationErrors[`education_${index}_degree_type`] = `Education ${index + 1} degree type is required`;
        //     }
        //     if (!edu.institute_name || edu.institute_name === '') {
        //         validationErrors[`education_${index}_institute_name`] = `Education ${index + 1} institute name is required`;
        //     }
        //     if (!edu.passing_year || edu.passing_year === '') {
        //         validationErrors[`education_${index}_passing_year`] = `Education ${index + 1} passing year is required`;
        //     }
        // });
        return validationErrors;
    };


    const handleChange = useCallback((input) => (e) => {
        const value = input === 'photo' || input === 'resume' ? e.target.files[0] : e.target.value;
        setFormData((prevFormData) => ({ ...prevFormData, [input]: value }));
        // Clear the error for this field when the user starts typing
        setErrors((prevErrors) => ({ ...prevErrors, [input]: '' }));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        setErrors({}); // Clear previous errors

        const validationErrors = validateForm(formData); // Validate the form data

        // Set errors only if there are any validation errors
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors); // Update the errors state
            Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                text: 'Please correct the errors before submitting the form.'
            });
            return;
        }

        const data = new FormData();
        if (applicantId) data.append('applicantId', applicantId);
        Object.entries(formData).forEach(([key, value]) => {
            if (key === 'photo' && value instanceof File) {
                data.append(key, value);
            } else if (['education', 'children'].includes(key)) {
                data.append(key, JSON.stringify(value));
            } else {
                data.append(key, value);
            }
        });

        // Log FormData to inspect it
        for (let pair of data.entries()) {
            console.log(pair[0], pair[1]);
        }

        Swal.fire({
            icon: 'warning',
            title: 'Warning',
            text: 'Are you sure you want to submit the form?',
            showConfirmButton: true,
            confirmButtonText: 'OK'
        }).then(async (result) => {
            if (result.isConfirmed) {
                setIsSubmitting(true);
                const actionResult = await dispatch(addEmployee(data));
                const response = actionResult.payload;  // Access the payload directly
                if (actionResult.meta.requestStatus === 'fulfilled') {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Your application has been submitted successfully!',
                        confirmButtonText: 'OK'
                    }).then(resetResult => {
                        if (resetResult.isConfirmed) navigate('/employees-list');
                    });
                } else {
                    const message = actionResult.error?.message || "An error occurred while submitting the application.";
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: message
                    });
                }
            }
        });
    };


    const handleEducationChange = useCallback((newEducationFields) => {
        setFormData((prevFormData) => ({ ...prevFormData, education: newEducationFields }));
    }, []);

    const handleChildrenChange = useCallback((newChildrenFields) => {
        setFormData((prevFormData) => ({ ...prevFormData, children: newChildrenFields }));
    }, []);

    useEffect(() => {
        if (applicantId) {
            setIsLoading(true);
            dispatch(fetchApplicantDetails(applicantId))
                .unwrap()
                .then(data => {
                    console.log(data);
                    setFormData(data);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error('Failed to fetch applicant details:', error);
                    setIsLoading(false);
                });
        }
    }, [applicantId, dispatch]);

    if (isLoading) {
        return <LoadingSpinner />;
    }
    return (
        <Container fluid>
            <Row className="align-items-center m-3">
                <Col xs={10} md={11} className="p-0">
                    <h3 className="title">BAHRIA UNIVERSITY - JOINING REPORT FOR FACULTY AND STAFF</h3>
                </Col>
            </Row>
            <Col lg={12}>
                <Form onSubmit={handleSubmit} className='my-form m-0 m-lg-3'>
                    <Card className="my-card card-bx">
                        <Card.Header className="card-header"><h4 className="title">Employee Details</h4></Card.Header>
                        <Card.Body>
                            <Row>
                                <Col sm={3} className="mb-3">
                                    <Form.Label className="form-label">Full Name</Form.Label>
                                    <Form.Control
                                        className="form-control"
                                        type="text"
                                        required
                                        name="name"
                                        placeholder="Full Name"
                                        onChange={handleChange('name')}
                                        value={formData.name || ''}
                                        isInvalid={!!errors.name}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.name}
                                    </Form.Control.Feedback>
                                </Col>
                                <Col sm={3} className="mb-3">
                                    <Form.Label className="form-label  me-3">Designation</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="job_id"
                                        value={formData.job_id || ''}
                                        onChange={handleChange('job_id')}
                                        isInvalid={!!errors.job_id}
                                        className="form-control form-select"
                                    >
                                        <option>Choose job...</option>
                                        {jobs && jobs.map((job, i) => (
                                            <option key={i} value={job.job_id}>{job.title}</option>
                                        ))}
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.job_id}
                                    </Form.Control.Feedback>
                                </Col>
                                <Col sm={3} className="mb-3">
                                    <Form.Label className="form-label">CNIC No.</Form.Label>
                                    <Form.Control
                                        className="form-control"
                                        type="text"
                                        required
                                        name="cnic_no"
                                        placeholder="XXXXX-XXXXXXX-X"
                                        onChange={handleChange('cnic_no')}
                                        value={formData.cnic_no || ''}
                                        isInvalid={!!errors.cnic_no}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.cnic_no}
                                    </Form.Control.Feedback>
                                </Col>
                                <Col sm={3} className="mb-3">
                                    <Form.Label className="form-label">Date of Birth</Form.Label>
                                    <Form.Control
                                        className="form-control"
                                        type="date"
                                        name="dob"
                                        required
                                        placeholder="Date of Birth"
                                        onChange={handleChange('dob')}
                                        value={formData.dob || ''}
                                        isInvalid={!!errors.dob}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.dob}
                                    </Form.Control.Feedback>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={3} className="mb-3">
                                    <Form.Label className="form-label">Marital Status</Form.Label>
                                    <Form.Control
                                        as="select"
                                        className="form-control form-select"
                                        type="text"
                                        name="marital_status"
                                        required
                                        placeholder="Marital Status"
                                        onChange={handleChange('marital_status')}
                                        value={formData.marital_status || ''}
                                        isInvalid={!!errors.marital_status}
                                    >
                                        <option>Choose...</option>
                                        <option value="single">Single</option>
                                        <option value="married">Married</option>
                                        <option value="widowed">Widowed</option>
                                        <option value="divorced">Divorced</option>
                                        <option value="dk">Prefer not to say</option>
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.marital_status}
                                    </Form.Control.Feedback>
                                </Col>
                                <Col sm={3} className="mb-3">
                                    <Form.Label className="form-label">No. of Children</Form.Label>
                                    <Form.Control
                                        className="form-control"
                                        type="number"
                                        name="num_of_children"
                                        required
                                        placeholder="Number of Children"
                                        onChange={handleChange('num_of_children')}
                                        value={formData.num_of_children || ''}
                                        isInvalid={!!errors.num_of_children}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.num_of_children}
                                    </Form.Control.Feedback>
                                </Col>
                                <Col sm={3} className="mb-3">
                                    <Form.Label className="form-label">Mobile No.</Form.Label>
                                    <Form.Control
                                        className="form-control"
                                        type="text"
                                        name="cell_no"
                                        required
                                        placeholder="Cell No."
                                        onChange={handleChange('cell_no')}
                                        value={formData.cell_no || ''}
                                        isInvalid={!!errors.cell_no}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.cell_no}
                                    </Form.Control.Feedback>
                                </Col>
                                <Col sm={3} className="mb-3">
                                    <Form.Label className="form-label">Phone No. (Res)</Form.Label>
                                    <Form.Control
                                        className="form-control"
                                        type="text"
                                        name="residential_no"
                                        required
                                        placeholder="Residential Phone No."
                                        onChange={handleChange('residential_no')}
                                        value={formData.residential_no || ''}
                                        isInvalid={!!errors.residential_no}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.residential_no}
                                    </Form.Control.Feedback>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={3} className="mb-3">
                                    <Form.Label className="form-label">Passport Size Photograph</Form.Label>
                                    {applicantId ?
                                        <a
                                            href={`${process.env.REACT_APP_API_URL}/uploads/${formData.photo}`}
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
                                        </a> :
                                        (
                                            <>
                                                <Form.Control
                                                    className="form-control pt-3 ps-3"
                                                    type="file"
                                                    name="photo"
                                                    required
                                                    placeholder="Select Image"
                                                    onChange={handleChange('photo')}
                                                    accept="image/png, image/jpeg, image/jpg"
                                                    isInvalid={!!errors.photo}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.photo}
                                                </Form.Control.Feedback>
                                            </>
                                        )}
                                </Col>
                                <Col sm={3} className="mb-3">
                                    <Form.Label className="form-label">Email</Form.Label>
                                    <Form.Control
                                        className="form-control"
                                        type="email"
                                        name="email"
                                        required
                                        placeholder="Email"
                                        onChange={handleChange('email')}
                                        value={formData.email || ''}
                                        isInvalid={!!errors.email}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </Col>
                                <Col sm={3} className="mb-3">
                                    <Form.Label className="form-label">Gender</Form.Label>
                                    <Form.Control
                                        as="select"
                                        className="form-control form-select"
                                        type="text"
                                        name="gender"
                                        required
                                        placeholder="Select Gender"
                                        onChange={handleChange('gender')}
                                        value={formData.gender || ''}
                                        isInvalid={!!errors.gender}
                                    >
                                        <option>Choose...</option>
                                        <option value="female">Female</option>
                                        <option value="male">Male</option>
                                        <option value="dk">Prefer not to say</option>
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.gender}
                                    </Form.Control.Feedback>
                                </Col>
                                <Col sm={3} className="mb-3">
                                    <Form.Label className="form-label  me-3">Date of Promotion</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="date_of_promotion"
                                        value={formData.date_of_promotion || ''}
                                        onChange={handleChange('date_of_promotion')}
                                        className="form-control"
                                        isInvalid={!!errors.date_of_promotion}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.date_of_promotion}
                                    </Form.Control.Feedback>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={3} className="mb-3">
                                    <Form.Label className="form-label">Reg No.</Form.Label>
                                    <Form.Control
                                        className="form-control"
                                        type="text"
                                        required
                                        name="reg_no"
                                        placeholder="Registration Number"
                                        onChange={handleChange('reg_no')}
                                        value={formData.reg_no || ''}
                                        isInvalid={!!errors.reg_no}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.reg_no}
                                    </Form.Control.Feedback>
                                </Col>
                                <Col sm={3} className="mb-3">
                                    <Form.Label className="form-label">Card No.</Form.Label>
                                    <Form.Control
                                        className="form-control"
                                        type="text"
                                        required
                                        name="card_no"
                                        placeholder="Card No."
                                        onChange={handleChange('card_no')}
                                        value={formData.card_no || ''}
                                        isInvalid={!!errors.card_no}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.card_no}
                                    </Form.Control.Feedback>
                                </Col>
                            </Row>
                            <Divider />
                            <QualificationRepeater
                                className="mb-3"
                                fields={formData.education}
                                setFields={handleEducationChange}
                            />
                            <Row className="mb-3">
                                <Col sm={9} className=" pt-3">
                                    <Form.Label>
                                        <b>i.</b> No. of Publications (HEC Recognized only):
                                    </Form.Label>
                                </Col>
                                <Col sm={2} className="mb-3">
                                    <Form.Control
                                        className="form-control"
                                        type="number"
                                        required
                                        name="publications_count"
                                        placeholder="Total Publications"
                                        onChange={handleChange('publications_count')}
                                        value={formData.publications_count || ''}
                                        isInvalid={!!errors.publications_count}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.publications_count}
                                    </Form.Control.Feedback>
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col sm={9} className=" pt-3">
                                    <Form.Label>
                                        <b>ii.</b> Total Experience (as Permanent FM from HEC Recognized Institutions) after 18 years of education in Years/Months:
                                    </Form.Label>
                                </Col>
                                <Col sm={2}>
                                    <Form.Control
                                        className="form-control"
                                        type="text"
                                        name="total_fm_experience"
                                        required
                                        placeholder="Total Experience"
                                        onChange={handleChange('total_fm_experience')}
                                        value={formData.total_fm_experience || ''}
                                        isInvalid={!!errors.total_fm_experience}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.total_fm_experience}
                                    </Form.Control.Feedback>
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col sm={9} className=" pt-3">
                                    <Form.Label>
                                        <b>iii.</b> Total Field Experience after 16 years of education (as Full Time/Permanent Job) in Years/Month:
                                    </Form.Label>
                                </Col>
                                <Col sm={2}>
                                    <Form.Control
                                        className="form-control"
                                        type="text"
                                        name="total_field_experience"
                                        required
                                        placeholder="Total Experience"
                                        onChange={handleChange('total_field_experience')}
                                        value={formData.total_field_experience || ''}
                                        isInvalid={!!errors.total_field_experience}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.total_field_experience}
                                    </Form.Control.Feedback>
                                </Col>
                            </Row>
                            <Divider />
                            <Row>
                                <Col sm={3} className="mb-3">
                                    <Form.Label className="form-label">Office Letter No.</Form.Label>
                                    <Form.Control
                                        className="form-control"
                                        type="text"
                                        required
                                        name="office_letter_no"
                                        placeholder="Office Letter No."
                                        onChange={handleChange('office_letter_no')}
                                        value={formData.office_letter_no || ''}
                                        isInvalid={!!errors.office_letter_no}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.office_letter_no}
                                    </Form.Control.Feedback>
                                </Col>
                                <Col sm={3} className="mb-3">
                                    <Form.Label className="form-label">Department</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="department_id"
                                        value={formData.department_id || ''}
                                        onChange={handleChange('department_id')}
                                        className="form-control form-select"
                                        isInvalid={!!errors.department_id}
                                    >
                                        <option>Choose department...</option>
                                        {departments.map((dept, i) => (
                                            <option key={i} value={dept.department_id}>
                                                {dept.department_name}
                                            </option>
                                        ))}
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.department_id}
                                    </Form.Control.Feedback>
                                </Col>
                                <Col sm={3} className="mb-3">
                                    <Form.Label className="form-label  me-3">Date of Joining</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="doj"
                                        value={formData.doj || ''}
                                        onChange={handleChange('doj')}
                                        className="form-control"
                                        isInvalid={!!errors.doj}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.doj}
                                    </Form.Control.Feedback>
                                </Col>
                                <Col sm={3} className="mb-3">
                                    <Form.Label className="form-label">Salary</Form.Label>
                                    <Form.Control
                                        className="form-control"
                                        type="number"
                                        required
                                        name="salary"
                                        placeholder="Salary"
                                        onChange={handleChange('salary')}
                                        value={formData.salary || ''}
                                        isInvalid={!!errors.salary}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.salary}
                                    </Form.Control.Feedback>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={3} className="mb-3">
                                    <Form.Label className="form-label">Pay Group</Form.Label>
                                    <Form.Control
                                        className="form-control"
                                        type="text"
                                        required
                                        name="pay_group"
                                        placeholder="Pay Group"
                                        onChange={handleChange('pay_group')}
                                        value={formData.pay_group || ''}
                                        isInvalid={!!errors.pay_group}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.pay_group}
                                    </Form.Control.Feedback>
                                </Col>
                                <Col sm={3} className="mb-3">
                                    <Form.Label className="form-label">Working Hours (From)</Form.Label>
                                    <Form.Control
                                        className="form-control"
                                        type="time"
                                        required
                                        name="start_working_hr"
                                        placeholder="Working Hours (From)"
                                        onChange={handleChange('start_working_hr')}
                                        value={formData.start_working_hr || ''}
                                        isInvalid={!!errors.start_working_hr}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.start_working_hr}
                                    </Form.Control.Feedback>
                                </Col>
                                <Col sm={3} className="mb-3">
                                    <Form.Label className="form-label">Working Hours (To)</Form.Label>
                                    <Form.Control
                                        className="form-control"
                                        type="time"
                                        required
                                        name="end_working_hr"
                                        placeholder="Working Hours (To)"
                                        onChange={handleChange('end_working_hr')}
                                        value={formData.end_working_hr || ''}
                                        isInvalid={!!errors.end_working_hr}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.end_working_hr}
                                    </Form.Control.Feedback>
                                </Col>
                            </Row>
                            <Divider />
                            <Row>
                                <Col sm={3} className="mb-3">
                                    <Form.Label className="form-label">Name of Next of Kin</Form.Label>
                                    <Form.Control
                                        className="form-control"
                                        type="text"
                                        required
                                        name="nok_name"
                                        placeholder="Full Name"
                                        onChange={handleChange('nok_name')}
                                        value={formData.nok_name || ''}
                                        isInvalid={!!errors.nok_name}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.nok_name}
                                    </Form.Control.Feedback>
                                </Col>
                                <Col sm={3} className="mb-3">
                                    <Form.Label className="form-label">Relationship with NOK</Form.Label>
                                    <Form.Control
                                        className="form-control"
                                        type="text"
                                        required
                                        name="nok_rs"
                                        placeholder="Relationship with NOK"
                                        onChange={handleChange('nok_rs')}
                                        value={formData.nok_rs || ''}
                                        isInvalid={!!errors.nok_rs}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.nok_rs}
                                    </Form.Control.Feedback>
                                </Col>
                                <Col sm={3} className="mb-3">
                                    <Form.Label className="form-label">Contact NOK</Form.Label>
                                    <Form.Control
                                        className="form-control"
                                        type="text"
                                        required
                                        name="nok_contact"
                                        placeholder="NOK Contact Number"
                                        onChange={handleChange('nok_contact')}
                                        value={formData.nok_contact || ''}
                                        isInvalid={!!errors.nok_contact}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.nok_contact}
                                    </Form.Control.Feedback>
                                </Col>
                            </Row>
                            <Col sm={12} className="mb-3">
                                <Form.Label className="form-label">Present Address</Form.Label>
                                <Form.Control
                                    className="form-control"
                                    name="present_address"
                                    required
                                    placeholder="Present Address"
                                    onChange={handleChange('present_address')}
                                    value={formData.present_address || ''}
                                    isInvalid={!!errors.present_address}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.present_address}
                                </Form.Control.Feedback>
                            </Col>
                            <Col sm={12} className="mb-3">
                                <Form.Label className="form-label">Permanent Address</Form.Label>
                                <Form.Control
                                    className="form-control"
                                    name="permanent_address"
                                    required
                                    placeholder="Permanent Address"
                                    onChange={handleChange('permanent_address')}
                                    value={formData.permanent_address || ''}
                                    isInvalid={!!errors.permanent_address}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.permanent_address}
                                </Form.Control.Feedback>
                            </Col>
                            <Row>
                                <Col sm={3} className="mb-3">
                                    <Form.Label className="form-label">Father's Name</Form.Label>
                                    <Form.Control
                                        className="form-control"
                                        type="text"
                                        name="father_name"
                                        required
                                        placeholder="Father's Name"
                                        onChange={handleChange('father_name')}
                                        value={formData.father_name || ''}
                                        isInvalid={!!errors.father_name}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.father_name}
                                    </Form.Control.Feedback>
                                </Col>
                                <Col sm={3} className="mb-3">
                                    <Form.Label className="form-label">Mother's Name</Form.Label>
                                    <Form.Control
                                        className="form-control"
                                        type="text"
                                        name="mother_name"
                                        required
                                        placeholder="Mother's Name"
                                        onChange={handleChange('mother_name')}
                                        value={formData.mother_name || ''}
                                    // isInvalid={!!errors.mother_name}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.mother_name}
                                    </Form.Control.Feedback>
                                </Col>
                                <Col sm={6} className="mb-3">
                                    <ChildRepeater fields={formData.children} setFields={handleChildrenChange} />
                                </Col>
                            </Row>
                        </Card.Body>
                        <Card.Footer className="d-flex align-items-center justify-content-md-end">
                            <Button className="link-button" onClick={handleSubmit} disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <LoadingSpinner size={20} color={"white"} />
                                        <span style={{ marginLeft: '10px' }}>Submitting form...</span>
                                    </div>
                                ) : 'Submit'}</Button>
                        </Card.Footer>
                    </Card>
                </Form>

            </Col>
        </Container>
    );
};

export default CreateEmployee;
