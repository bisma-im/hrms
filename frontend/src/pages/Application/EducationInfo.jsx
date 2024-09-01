import { Card, Col, Form, Row, Button } from "react-bootstrap";
import QualificationRepeater from "./QualificationRepeater";
import Divider from "components/common/ui/Divider";
import { useState } from "react";

const EducationInfo = ({ nextStep, prevStep, handleChange, handleEducationChange, values }) => {
    const [formErrors, setFormErrors] = useState({});

    const validateForm = () => {
        const errors = {};

        // Validate qualifications
        const qualification = values.education.every(item => item.degree_type && item.duration_years !== '' 
            && item.specialization !== '' && item.passing_year !== '' && item.cgpa_percentage
            && item.institute_name !== '' && item.country !== ''
        );

        if (!qualification) {
            errors.education = "At least one qualification must be filled with all details.";
        }

        if ( values.education.length === 0 || values.education.every(field => Object.values(field).every(value => value === ''))) {
            errors.education = "At least one qualification must be filled.";
        }

        if (!values.total_qualification_years || values.total_qualification_years <= 0) {
            errors.total_qualification_years = "Total qualification years must be greater than zero.";
        }

        if (!values.publications_count || values.publications_count < 0) {
            errors.publications_count = "Number of publications must be greater than zero.";
        }

        if (values.consultancy_amount !== undefined && values.consultancy_amount < 0) {
            errors.consultancy_amount = "Consultancy amount must be greater than zero.";
        }

        if (!values.ms_phd_produced || values.ms_phd_produced < 0) {
            errors.ms_phd_produced = "Number of MS/MPhil/PhD must be greater than zero.";
        }

        if (!values.number_of_projects || values.number_of_projects < 0) {
            errors.number_of_projects = "Number of projects must be greater than zero.";
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
        <Card className="my-card">
            <Card.Header className="card-header"><h4 className="h3" style={{ color: "#004B87" }}>2. Qualification</h4></Card.Header>
            <Card.Body>
                <QualificationRepeater className="m-3" fields={values.education} setFields={handleEducationChange} />
                {formErrors.education && <div className="invalid-feedback d-block">{formErrors.education}</div>}
                <Divider />
                <Row className="mb-3">
                    <Col sm="auto" className="mb-3">
                        <Form.Label className="form-label">Total Qualification (in Years)</Form.Label>
                        <Form.Control
                            className={`form-control ${formErrors.total_qualification_years ? 'is-invalid' : ''}`}
                            type="number"
                            required
                            name="total_qualification_years"
                            placeholder="Total Qualification"
                            onChange={handleChangeWithErrorCheck('total_qualification_years')}
                            defaultValue={values.total_qualification_years}
                        />
                        {formErrors.total_qualification_years && <div className="invalid-feedback">{formErrors.total_qualification_years}</div>}
                    </Col>
                    <Col sm={4} className="mb-3">
                        <Form.Label className="form-label">No. of Publications (HEC Recognized only)</Form.Label>
                        <Form.Control
                            className={`form-control ${formErrors.publications_count ? 'is-invalid' : ''}`}
                            type="number"
                            required
                            name="publications_count"
                            placeholder="Total Publications"
                            onChange={handleChangeWithErrorCheck('publications_count')}
                            defaultValue={values.publications_count}
                        />
                        {formErrors.publications_count && <div className="invalid-feedback">{formErrors.publications_count}</div>}
                    </Col>
                    <Col sm={3} className="mb-3">
                        <Form.Label className="form-label">Category of Publications</Form.Label>
                        <Form.Control
                            as="select"
                            className={`form-control form-select ${formErrors.category_publication ? 'is-invalid' : ''}`}
                            type="text"
                            name="category_publication"
                            required
                            placeholder="Category of Publications"
                            onChange={handleChangeWithErrorCheck('category_publication')}
                            defaultValue={values.category_publication}
                        >
                            <option>Choose Category of Publications...</option>
                            <option value="w">W</option>
                            <option value="x">X</option>
                            <option value="y">Y</option>
                        </Form.Control>
                        {formErrors.category_publication && <div className="invalid-feedback">{formErrors.category_publication}</div>}
                    </Col>
                    <Col sm="auto" className="mb-3">
                        <Form.Label className="form-label">Consultancy Amount (if any)</Form.Label>
                        <Form.Control
                            className={`form-control ${formErrors.consultancy_amount ? 'is-invalid' : ''}`}
                            type="number"
                            required
                            name="consultancy_amount"
                            placeholder="Consultancy Amount"
                            onChange={handleChangeWithErrorCheck('consultancy_amount')}
                            defaultValue={values.consultancy_amount}
                        />
                        {formErrors.consultancy_amount && <div className="invalid-feedback">{formErrors.consultancy_amount}</div>}
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col sm={6} className="mb-3">
                        <Form.Label className="form-label">No. of MS/MPhil/PhD Produced (for PhD Candidates)</Form.Label>
                        <Form.Control
                            className={`form-control ${formErrors.ms_phd_produced ? 'is-invalid' : ''}`}
                            type="number"
                            required
                            name="ms_phd_produced"
                            placeholder="Number"
                            onChange={handleChangeWithErrorCheck('ms_phd_produced')}
                            defaultValue={values.ms_phd_produced}
                        />
                        {formErrors.ms_phd_produced && <div className="invalid-feedback">{formErrors.ms_phd_produced}</div>}
                    </Col>
                    <Col sm={6} className="mb-3">
                        <Form.Label className="form-label">No. of Funded/Foreign Projects as Principal Investigators/Co PI</Form.Label>
                        <Form.Control
                            className={`form-control ${formErrors.number_of_projects ? 'is-invalid' : ''}`}
                            type="number"
                            required
                            name="number_of_projects"
                            placeholder="Number"
                            onChange={handleChangeWithErrorCheck('number_of_projects')}
                            defaultValue={values.number_of_projects}
                        />
                        {formErrors.number_of_projects && <div className="invalid-feedback">{formErrors.number_of_projects}</div>}
                    </Col>
                </Row>
            </Card.Body>
            <Card.Footer>
                <Button className="link-button" onClick={prevStep}>Prev</Button>
                <Button className="link-button" onClick={handleSubmit}>Next</Button>
            </Card.Footer>
        </Card>
    );
};

export default EducationInfo;