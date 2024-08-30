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
    photo: null,
    cell_no: '',
    date_of_promotion: '',
    reg_no: '',
    card_no: '',
    office_letter_no: '',
    dob: '',
    permanent_address: '',
    present_address: '',
    nok_name: '',
    nok_rs: '',
    nok_contact: '',
    total_qualification_years: '',
    publications_count: '',
    total_fm_experience: '',
    total_field_experience: '',
    children: [{ name: '', age: '' }],
    education: [{ degree_type: '', duration_years: '', specialization: '', passing_year: '', cgpa_percentage: '', institute_name: '', country: '' }],
};

const CreateEmployee = () => {
    const { applicantId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const { departments } = useSelector((state) => state.departments);
    const [jobs, setJobs] = useState([]);

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


    const handleChange = useCallback((input) => (e) => {
        const value = input === 'photo' || input === 'resume' ? e.target.files[0] : e.target.value;
        setFormData((prevFormData) => ({ ...prevFormData, [input]: value }));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
    
        const data = new FormData();
        data.append('applicantId', applicantId);
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
                const actionResult = await dispatch(addEmployee(data));
                const response = actionResult.payload;  // Access the payload directly
                console.log(response)
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
        return <LoadingSpinner/>;
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
                                        defaultValue={formData.name}
                                    />
                                </Col>
                                <Col sm={3} className="mb-3">
                                    <Form.Label className="form-label  me-3">Designation</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="job_id"
                                        defaultValue={formData.job_id}
                                        onChange={handleChange('job_id')}
                                        className="form-control form-select"
                                    // disabled={!jobs.length}
                                    >
                                        <option>Choose job...</option>
                                        {jobs && jobs.map((job, i) => (
                                            <option key={i} value={job.job_id}>{job.title}</option>
                                        ))}
                                    </Form.Control>
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
                                        defaultValue={formData.cnic_no}
                                    />
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
                                        defaultValue={formData.dob}
                                    />
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
                                        defaultValue={formData.marital_status}
                                    >
                                        <option>Choose...</option>
                                        <option value="single">Single</option>
                                        <option value="married">Married</option>
                                        <option value="widowed">Widowed</option>
                                        <option value="divorced">Divorced</option>
                                        <option value="dk">Prefer not to say</option>
                                    </Form.Control>
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
                                        defaultValue={formData.num_of_children}
                                    />
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
                                        defaultValue={formData.cell_no}
                                    />
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
                                        defaultValue={formData.residential_no}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={3} className="mb-3">
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
                                <Col sm={3} className="mb-3">
                                    <Form.Label className="form-label">Email</Form.Label>
                                    <Form.Control
                                        className="form-control"
                                        type="email"
                                        name="email"
                                        required
                                        placeholder="Email"
                                        onChange={handleChange('email')}
                                        defaultValue={formData.email} />
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
                                        defaultValue={formData.gender}
                                    >
                                        <option>Choose...</option>
                                        <option value="female">Female</option>
                                        <option value="male">Male</option>
                                        <option value="dk">Prefer not to say</option>
                                    </Form.Control>
                                </Col>
                                <Col sm={3} className="mb-3">
                                    <Form.Label className="form-label  me-3">Date of Promotion</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="date_of_promotion"
                                        defaultValue={formData.date_of_promotion}
                                        onChange={handleChange('date_of_promotion')}
                                        className="form-control" />
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
                                        defaultValue={formData.reg_no}
                                    />
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
                                        defaultValue={formData.card_no}
                                    />
                                </Col>
                            </Row>
                            <Divider />
                            <QualificationRepeater className="mb-3" fields={formData.education} setFields={handleEducationChange} />
                            <Row className="mb-3">
                                <Col sm={9} className=" pt-3">
                                    <Form.Label><b>i.</b> No. of Publications (HEC Recognized only): </Form.Label>
                                </Col>
                                <Col sm={2} className="mb-3">
                                    <Form.Control
                                        className="form-control"
                                        type="number"
                                        required
                                        name="publications_count"
                                        placeholder="Total Publications"
                                        onChange={handleChange('publications_count')}
                                        defaultValue={formData.publications_count}
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col sm={9} className=" pt-3">
                                    <Form.Label><b>ii.</b> Total Experience (as Permanent FM from HEC Recognized Institutions) after 18 years of education in Years/Months:</Form.Label>
                                </Col>
                                <Col sm={2}>
                                    <Form.Control
                                        className="form-control"
                                        type="text"
                                        name="total_fm_experience"
                                        required
                                        placeholder="Total Experience"
                                        onChange={handleChange('total_fm_experience')}
                                        defaultValue={formData.total_fm_experience}
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col sm={9} className=" pt-3">
                                    <Form.Label><b>iii.</b> Total Field Experience after 16 years of education (as Full Time/Permanent Job) in Years/Month:</Form.Label>
                                </Col>
                                <Col sm={2}>
                                    <Form.Control
                                        className="form-control"
                                        type="text"
                                        name="total_field_experience"
                                        required
                                        placeholder="Total Experience"
                                        onChange={handleChange('total_field_experience')}
                                        defaultValue={formData.total_field_experience}
                                    />
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
                                        defaultValue={formData.office_letter_no}
                                    />
                                </Col>
                                <Col sm={3} className="mb-3">
                                    <Form.Label className="form-label">Department</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="department_id"
                                        defaultValue={formData.department_id}
                                        onChange={handleChange('department_id')}
                                        className="form-control form-select"
                                    >
                                        <option>Choose department...</option>
                                        {departments.map((dept, i) => (
                                            <option key={i} value={dept.department_id}>{dept.department_name}</option>
                                        ))}
                                    </Form.Control>
                                </Col>
                                <Col sm={3} className="mb-3">
                                    <Form.Label className="form-label  me-3">Date of Joining</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="doj"
                                        defaultValue={formData.doj}
                                        onChange={handleChange('doj')}
                                        className="form-control" />
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
                                        defaultValue={formData.salary}
                                    />
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
                                        defaultValue={formData.pay_group}
                                    />
                                </Col>
                                <Col sm={3} className="mb-3">
                                    <Form.Label className="form-label">Working Hours (From)</Form.Label>
                                    <Form.Control
                                        className="form-control"
                                        type="time"
                                        required
                                        name="start_working_hr"
                                        placeholder="Pay Group"
                                        onChange={handleChange('start_working_hr')}
                                        defaultValue={formData.start_working_hr}
                                    />
                                </Col>
                                <Col sm={3} className="mb-3">
                                    <Form.Label className="form-label">Working Hours (To)</Form.Label>
                                    <Form.Control
                                        className="form-control"
                                        type="time"
                                        required
                                        name="end_working_hr"
                                        placeholder="Pay Group"
                                        onChange={handleChange('end_working_hr')}
                                        defaultValue={formData.end_working_hr}
                                    />
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
                                        defaultValue={formData.nok_name}
                                    />
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
                                        defaultValue={formData.nok_rs}
                                    />
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
                                        defaultValue={formData.nok_contact}
                                    />
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
                                    defaultValue={formData.present_address}
                                />
                            </Col>
                            <Col sm={12} className="mb-3">
                                <Form.Label className="form-label">Permanent Address</Form.Label>
                                <Form.Control
                                    className="form-control"
                                    name="permanent_address"
                                    required
                                    placeholder="Permanent Address"
                                    onChange={handleChange('permanent_address')}
                                    defaultValue={formData.permanent_address}
                                />
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
                                        defaultValue={formData.father_name}
                                    />
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
                                        defaultValue={formData.mother_name}
                                    />
                                </Col>
                                <Col sm={6} className="mb-3">
                                    <ChildRepeater fields={formData.children} setFields={handleChildrenChange} />
                                </Col>
                            </Row>


                        </Card.Body>
                        <Card.Footer className="d-flex align-items-center justify-content-md-end">
                            <Button className="link-button" onClick={handleSubmit}>Submit</Button>
                        </Card.Footer>
                    </Card>
                </Form>
            </Col>
        </Container>
    );
};

export default CreateEmployee;
