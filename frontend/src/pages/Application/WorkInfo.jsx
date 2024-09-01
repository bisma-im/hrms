import { Card, Col, Form, Row, Button } from "react-bootstrap";
import Divider from "components/common/ui/Divider";
import ExperienceRepeater from "./ExperienceRepeater";
import { useState } from "react";

const WorkInfo = ({ nextStep, prevStep, handleChange, handleExperienceChange, values }) => {
    const [formErrors, setFormErrors] = useState({});

    const validateForm = () => {
        const errors = {};

        // Validate experiences in ExperienceRepeater
        const experienceFilled = values.experiences.every(item =>
            item.institution_name !== '' &&
            item.position_title !== '' &&
            item.from_date !== '' &&
            item.to_date !== '' &&
            item.total_period !== ''
        );

        if (!experienceFilled) {
            errors.experiences = "At least one experience must be fully filled out.";
        }

        // Validate total_fm_experience
        if (!values.total_fm_experience || values.total_fm_experience.trim() === '') {
            errors.total_fm_experience = "Total FM experience is required.";
        } 

        // Validate total_field_experience
        if (!values.total_field_experience || values.total_field_experience.trim() === '') {
            errors.total_field_experience = "Total field experience is required.";
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

    return (
        <Card className="my-card">
            <Card.Header className="card-header"><h4 className="h3" style={{ color: "#004B87" }}>3. Experience (Starting from the Current Position)</h4></Card.Header>
            <Card.Body>
                <ExperienceRepeater className="m-3" fields={values.experiences} setFields={handleExperienceChange} />
                {formErrors.experiences && <div className="invalid-feedback d-block">{formErrors.experiences}</div>}
                <div className="mt-4"><span><b>Note:</b> Experience as part-time job or Adhoc employment will not be considered.</span></div>
                <Divider />
                <Row className="mb-3">
                    <Col sm={9} className="pt-3">
                        <Form.Label><b>i.</b> Total Experience (as Permanent FM from HEC Recognized Institutions) after 18 years of education in Years/Months:</Form.Label>
                    </Col>
                    <Col sm={2}>
                        <Form.Control
                            className={`form-control ${formErrors.total_fm_experience ? 'is-invalid' : ''}`}
                            type="text"
                            name="total_fm_experience"
                            required
                            placeholder="Total Experience"
                            onChange={handleChange('total_fm_experience')}
                            defaultValue={values.total_fm_experience}
                        />
                        {formErrors.total_fm_experience && <div className="invalid-feedback">{formErrors.total_fm_experience}</div>}
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col sm={9} className="pt-3">
                        <Form.Label><b>ii.</b> Total Field Experience after 16 years of education (as Full Time/Permanent Job) in Years/Month:</Form.Label>
                    </Col>
                    <Col sm={2}>
                        <Form.Control
                            className={`form-control ${formErrors.total_field_experience ? 'is-invalid' : ''}`}
                            type="text"
                            name="total_field_experience"
                            required
                            placeholder="Total Experience"
                            onChange={handleChange('total_field_experience')}
                            defaultValue={values.total_field_experience}
                        />
                        {formErrors.total_field_experience && <div className="invalid-feedback">{formErrors.total_field_experience}</div>}
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

export default WorkInfo;