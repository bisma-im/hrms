import React, { useState } from 'react';
import { submitApplicationForm } from 'features/applicants/applicantService';
import PersonalInfo from './PersonalInfo';
import { logo } from 'assets/images';
import { Col, Container, Row, Form } from 'react-bootstrap';
import EducationInfo from './EducationInfo';
import WorkInfo from './WorkInfo';
import ReferencesnResume from './ReferencesnResume';
import Swal from 'sweetalert2';

const ApplicationForm = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        campus: '',
        department: '',
        specialization: '',
        name: '',
        father_name: '',
        gender: '',
        cnic_no: '',
        marital_status: '',
        email: '',
        photo: null,
        resume: null,
        cell_no: '',
        religion: '',
        dob: '',
        sect: '',
        nationality: '',
        address: '',
        how_hear: '',
        total_qualification_years: '',
        publications_count: '',
        category_publication: '',
        consultancy_amount: '',
        ms_phd_produced: '',
        number_of_projects: '',
        total_fm_experience: '',
        total_field_experience: '',
        references: [
            { name: '', designation: '', contact: '' },
            { name: '', designation: '', contact: '' }
        ],
        education: [{ degree_type: '', duration_years: '', specialization: '', passing_year: '', cgpa_percentage: '', institute_name: '', country: '' }],
        experiences: [{ institution_name: '', position_title: '', from_date: '', to_date: '', total_period: '' }]
    });

    const resetFormData = () => {
        setFormData({
            campus: null,
            department: null,
            specialization: null,
            name: null,
            father_name: null,
            gender: null,
            cnic_no: null,
            marital_status: null,
            email: null,
            photo: null,
            resume: null,
            cell_no: null,
            religion: null,
            dob: null,
            sect: null,
            nationality: null,
            address: null,
            how_hear: null,
            total_qualification_years: null,
            publications_count: null,
            category_publication: null,
            consultancy_amount: null,
            ms_phd_produced: null,
            number_of_projects: null,
            total_fm_experience: null,
            total_field_experience: null,
            references: [
                { name: null, designation: null, contact: null },
                { name: null, designation: null, contact: null }
            ],
            education: [{ degree_type: null, duration_years: null, specialization: null, passing_year: null, cgpa_percentage: null, institute_name: null, country: null }],
            experiences: [{ institution_name: null, position_title: null, from_date: null, to_date: null, total_period: null }]
        });
    };


    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const handleReferenceChange = (index, field) => (e) => {
        const newReferences = [...formData.references];
        newReferences[index][field] = e.target.value;
        setFormData({ ...formData, references: newReferences });
    };

    const handleChange = (input) => (e) => {
        if (input === 'photo' || input === 'resume') {
            if (e.target.files.length > 0) { // Make sure the file is selected
                const file = e.target.files[0]; // Get the first file (if multiple are allowed, this needs adjustment)
                setFormData({ ...formData, [input]: file });
            }
        } else {
            setFormData({ ...formData, [input]: e.target.value });
        }
    };

    const handleEducationChange = (newEducationFields) => {
        setFormData({ ...formData, education: newEducationFields });
    };

    const handleExperienceChange = (newExperienceFields) => {
        setFormData({ ...formData, experiences: newExperienceFields });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        for (const key in formData) {
            if (key === 'photo' || key === 'resume') {
                // Check if the key is for files and that the file exists
                if (formData[key] && formData[key] instanceof File) {
                    data.append(key, formData[key]);
                }
            } else if (key === 'education' || key === 'experiences' || key === 'references') {
                // Stringify education and experiences arrays before appending
                data.append(key, JSON.stringify(formData[key]));
            } else {
                // Append all other data as is
                data.append(key, formData[key]);
            }
        }
        console.log('Form Data:', formData);
        try {
            const result = await submitApplicationForm(data)
                .then(response => {
                    if (response && response.success) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: response.message,
                            showConfirmButton: true,
                            confirmButtonText: 'OK'
                        }).then(result => {
                            if (result.isConfirmed){ resetFormData(); }  // Call your reset function if the user confirms
                        });
                    } else {
                        // Handle non-successful responses if needed
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Something went wrong!'
                        });
                    }
                })
                .catch(error => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: error.message
                    });
                })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error
            });
            console.error('Submission Failed:', error);
        }
    };

    return (
        <Container fluid className='main-content' style={{ backgroundColor: "#ddebf7", height: "100vh" }} >
            <Row className="align-items-center m-3">
                <Col xs={2} md={1} className="p-0">
                    <img src={logo} alt="Logo" className="navbar-logo" style={{ width: "70%" }} />
                </Col>
                <Col xs={10} md={11} className="p-0">
                    <h3 className="m-0" style={{ fontWeight: "bold", color: "#004B87" }}>BAHRIA UNIVERSITY - EMPLOYMENT FORM FOR FACULTY</h3>
                </Col>
            </Row>
            <Form onSubmit={handleSubmit} className='my-form m-3' encType='multipart/form-data'>
                {
                    step === 1 ? <PersonalInfo nextStep={nextStep} handleChange={handleChange} values={formData} /> :
                    step === 2 ? <EducationInfo nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} handleEducationChange={handleEducationChange} values={formData} /> :
                    step === 3 ? <WorkInfo nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} handleExperienceChange={handleExperienceChange} values={formData} /> :
                    <ReferencesnResume prevStep={prevStep} handleReferenceChange={handleReferenceChange} handleChange={handleChange} handleSubmit={handleSubmit} values={formData} />
                }
            </Form>

        </Container>
    );
};

export default ApplicationForm;
