import React, { useState } from "react";
import { Card, Col, Form, Row, Button } from "react-bootstrap";

const ReferencesnResume = ({ prevStep, handleReferenceChange, handleChange, handleSubmit, values }) => {
    const [formErrors, setFormErrors] = useState({});

    const validateReferencesAndResume = () => {
        const errors = {};
        const phoneRegex = /^03\d{2}-\d{7}$/; // Regex to match the format 03XX-XXXXXXX
    
        // Validate references
        const referencesValid = values.references.every(reference => {
            const isNameValid = reference.reference_name.trim() !== '';
            const isDesignationValid = reference.reference_designation.trim() !== '';
            const isContactValid = phoneRegex.test(reference.reference_contact.trim());
    
            return isNameValid && isDesignationValid && isContactValid;
        });
    
        if (!referencesValid) {
            errors.references = "All reference fields (Name, Designation, Contact) must be filled out and contact number must be in the format 03XX-XXXXXXX.";
        }
    
        // Validate resume upload
        if (!values.resume) {
            errors.resume = "Resume upload is required.";
        }
    
        return errors;
    };
    

    const handleNext = (e) => {
        e.preventDefault();
        const errors = validateReferencesAndResume();
        setFormErrors(errors);
    
        if (Object.keys(errors).length === 0) {
            handleSubmit();
        }
    };
    
    return (
        <>
            <Card className="my-card card-bx">
                <Card.Header className="card-header"><h4 className="h3" style={{ color: "#004B87" }}>4. References</h4></Card.Header>
                <Card.Body>
                    <div className='row'>
                        <div className="col-sm-4"><Form.Label className="form-label">Name</Form.Label></div>
                        <div className="col-sm-4"><Form.Label className="form-label">Designation</Form.Label></div>
                        <div className="col-sm-4"><Form.Label className="form-label">Contact</Form.Label></div>
                    </div>
                    {
                        values.references.map((reference, index) => (
                            <Row key={index}>
                                <Col sm={4} className="mb-3">
                                    <Form.Control
                                        type="text"
                                        required
                                        name="reference_name"
                                        placeholder="Reference Name"
                                        onChange={handleReferenceChange(index, 'reference_name')}
                                        value={reference.reference_}
                                    />
                                </Col>
                                <Col sm={4} className="mb-3">
                                    <Form.Control
                                        type="text"
                                        name="reference_designation"
                                        required
                                        placeholder="Reference Designation"
                                        onChange={handleReferenceChange(index, 'reference_designation')}
                                        value={reference.reference_designation}
                                    />
                                </Col>
                                <Col sm={4} className="mb-3">
                                    <Form.Control
                                        name="reference_contact"
                                        type="text"
                                        required
                                        placeholder="03XX-XXXXXXX"
                                        onChange={handleReferenceChange(index, 'reference_contact')}
                                        value={reference.reference_contact}
                                    />
                                </Col>
                            </Row>
                        ))
                    }
                    {formErrors.references && <div className="invalid-feedback d-block">{formErrors.references}</div>}
                    <div className="my-4"><span><b>Note:</b> The references should NOT be a family member/relative of the applicant</span></div>

                </Card.Body>
            </Card>
            <Card className="my-card card-bx my-5">
                <Card.Header className="card-header"><h4 className="h3" style={{ color: "#004B87" }}>5. Resume</h4></Card.Header>
                <Card.Body>
                    <Row className="mb-3">
                        <Col sm={2}>
                            <Form.Label className="form-label pt-3 "><b>Upload your resume:</b></Form.Label>
                        </Col>
                        <Col sm={10}>
                            <Form.Control
                                className="form-control pt-3 ps-3"
                                type="file"
                                name="resume"
                                required
                                placeholder="Select File"
                                onChange={handleChange('resume')}
                                defaultValue={values.resume} />
                        </Col>
                        {formErrors.resume && <div className="invalid-feedback">{formErrors.resume}</div>}
                    </Row>
                </Card.Body>
                <Card.Footer className="">
                    <Button className="link-button" onClick={prevStep}>Prev</Button>
                    <Button className="link-button" onClick={handleNext}>Submit</Button>
                </Card.Footer>
            </Card>
        </>
    );
};

export default ReferencesnResume;