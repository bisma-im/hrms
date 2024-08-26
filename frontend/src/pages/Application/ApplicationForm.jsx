import React, { useState } from 'react';
import PersonalInfo from './PersonalInfo';
// import EducationDetails from './EducationDetails';
// import WorkExperience from './WorkExperience';
// import ReviewSubmit from './ReviewSubmit';
import { logo } from 'assets/images';
import { Col, Container, Row, Form } from 'react-bootstrap';
import EducationInfo from './EducationInfo';
import WorkInfo from './WorkInfo';
import ReferencesnResume from './ReferencesnResume';

const ApplicationForm = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        campus: '',
        department: '',
        specialization: '',
        name: '',
        fatherName: '',
        gender: '',
        cnic: '',
        marital_status: '',
        email: '',
        photo: '',
        cell_no: '',
        religion: '',
        dob: '',
        sect: '',
        nationality: '',
        address: '',
        how_hear: '',
        total_qualification: '',
        no_of_publications: '',
        category_publications: '',
        consultancy_amount: '',
        no_phd_produced: '',
        no_of_funded_projects: '',
        total_experience: '',
        reference1_name: '',
        reference1_designation: '',
        reference1_contact: '',
        reference2_name: '',
        reference2_designation: '',
        reference2_contact: '',
        education: [{ degree: '', duration: '', specialization: '', passing_year: '', cgpa_percentage_grade: '', institute: '', country: '' }],
        experiences: [{ institution: '', position: '', from: '', to: '', total_period: '' }]
    });

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);


    const handleChange = input => e => {
        setFormData({ ...formData, [input]: e.target.value });
    };

    const handleEducationChange = (newEducationFields) => {
        setFormData({ ...formData, education: newEducationFields });
    };

    const handleExperienceChange = (newExperienceFields) => {
        setFormData({ ...formData, experiences: newExperienceFields });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        // Add logic to handle form submission
    };
    return (
        <Container fluid className='main-content' style={{ backgroundColor: "#ddebf7",height: "100vh" }} >
            <Row className="align-items-center m-3">
                <Col xs={2} md={1} className="p-0">
                    <img src={logo} alt="Logo" className="navbar-logo" style={{ width: "70%"}}/>
                </Col>
                <Col xs={10} md={11} className="p-0">
                    <h3 className="m-0" style={{ fontWeight: "bold", color: "#004B87" }}>BAHRIA UNIVERSITY - EMPLOYMENT FORM FOR FACULTY</h3>
                </Col>
            </Row>
            <Form onSubmit={handleSubmit} className='my-form m-3'>
                {
                step === 1 ? <PersonalInfo nextStep={nextStep} handleChange={handleChange} values={formData} /> :
                step === 2 ? <EducationInfo nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} handleEducationChange={handleEducationChange} values={formData} /> :
                step === 3 ? <WorkInfo nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} handleExperienceChange={handleExperienceChange} values={formData} /> :
                <ReferencesnResume prevStep={prevStep} handleChange={handleChange} handleSubmit={handleSubmit} values={formData} /> 
                }
            </Form>
            
        </Container>
    );
};

export default ApplicationForm;
