import React, { useCallback, useEffect, useState } from 'react';
import { addApplicant, fetchApplicantDetails } from 'features/applicants/applicantService';
import PersonalInfo from './PersonalInfo';
import { logo } from 'assets/images';
import { Col, Container, Row, Form } from 'react-bootstrap';
import EducationInfo from './EducationInfo';
import WorkInfo from './WorkInfo';
import ReferencesnResume from './ReferencesnResume';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import LoadingSpinner from 'components/common/ui/LoadingSpinner';

const initialFormData = {
    campus: '',
    department_id: '',
    specialization: '',
    name: '',
    job_id: '',
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
    postal_address: '',
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
        { reference_name: '', reference_designation: '', reference_contact: '' },
        { reference_name: '', reference_designation: '', reference_contact: '' }
    ],
    education: [{ degree_type: '', duration_years: '', specialization: '', passing_year: '', cgpa_percentage: '', institute_name: '', country: '' }],
    experiences: [{ institution_name: '', position_title: '', from_date: '', to_date: '', total_period: '' }]
};

const ApplicationForm = () => {
    const { applicantId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState(initialFormData);

    const resetFormData = useCallback(() => {
        setFormData(initialFormData);
    }, []);

    const nextStep = useCallback(() => setStep((prevStep) => prevStep + 1), []);
    const prevStep = useCallback(() => setStep((prevStep) => prevStep - 1), []);

    const handleChange = useCallback((input) => (e) => {
        const value = input === 'photo' || input === 'resume' ? e.target.files[0] : e.target.value;
        setFormData((prevFormData) => ({ ...prevFormData, [input]: value }));
    }, []);

    const handleReferenceChange = useCallback((index, field) => (e) => {
        setFormData(prevFormData => {
            const newReferences = [...prevFormData.references];
            newReferences[index][field] = e.target.value;
            return { ...prevFormData, references: newReferences };
        });
    }, []);

    const handleEducationChange = useCallback((newEducationFields) => {
        setFormData((prevFormData) => ({ ...prevFormData, education: newEducationFields }));
    }, []);

    const handleExperienceChange = useCallback((newExperienceFields) => {
        setFormData((prevFormData) => ({ ...prevFormData, experiences: newExperienceFields }));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        Swal.fire({
            icon: 'warning',
            title: 'Warning',
            text: 'Are you sure you want to submit the form?',
            showConfirmButton: true,
            confirmButtonText: 'OK'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const data = new FormData();
                Object.entries(formData).forEach(([key, value]) => {
                    if (['photo', 'resume'].includes(key) && value instanceof File) {
                        data.append(key, value);
                    } else if (['education', 'experiences', 'references'].includes(key)) {
                        data.append(key, JSON.stringify(value));
                    } else {
                        data.append(key, value);
                    }
                });
                data.append('user_type', 'applicant');

                // Log FormData to inspect it
                for (let pair of data.entries()) {
                    console.log(pair[0], pair[1]);
                }
                const actionResult = await dispatch(addApplicant(data));
                const response = actionResult.payload;  // Access the payload directly

                if (actionResult.meta.requestStatus === 'fulfilled') {
                    // Successful server response handling
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Your application has been submitted successfully!',
                        confirmButtonText: 'OK'
                    }).then(resetResult => {
                        if (resetResult.isConfirmed) resetFormData();
                    });
                } else {
                    // Error handling
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
        return <LoadingSpinner />;
    }

    const dynamicStyle = applicantId ? {} : { backgroundColor: "#F3F0EC", height: "100vh" };
    return (
        <Container fluid className={applicantId ? '' : 'main-content'} style={dynamicStyle}>
            <Row className="align-items-center m-3">
                <Col xs={2} md={1} className="p-0">
                    <img src={logo} alt="Logo" className="navbar-logo" style={{ width: "70%" }} />
                </Col>
                <Col xs={10} md={11} className="p-0">
                    <h3 className="m-0" style={{ fontWeight: "bold", color: "#004B87" }}>BAHRIA UNIVERSITY - EMPLOYMENT FORM FOR FACULTY</h3>
                </Col>
            </Row>
            <Form onSubmit={handleSubmit} className='my-form m-3' encType='multipart/form-data'>
                {step === 1 && <PersonalInfo nextStep={nextStep} handleChange={handleChange} values={formData} applicantId={applicantId}/>}
                {step === 2 && <EducationInfo nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} handleEducationChange={handleEducationChange} values={formData} />}
                {step === 3 && <WorkInfo nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} handleExperienceChange={handleExperienceChange} values={formData} />}
                {step === 4 && <ReferencesnResume prevStep={prevStep} handleReferenceChange={handleReferenceChange} handleChange={handleChange} handleSubmit={handleSubmit} values={formData} />}
            </Form>
        </Container>
    );
};

export default ApplicationForm;