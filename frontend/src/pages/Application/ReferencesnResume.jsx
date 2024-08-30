import { Card, Col, Form, Row, Button } from "react-bootstrap";

const ReferencesnResume = ({ prevStep, handleReferenceChange, handleChange, handleSubmit, values }) => {
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
                                        placeholder="Reference Contact"
                                        onChange={handleReferenceChange(index, 'reference_contact')}
                                        value={reference.reference_contact}
                                    />
                                </Col>
                            </Row>
                        ))
                    }
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
                    </Row>
                </Card.Body>
                <Card.Footer className="">
                    <Button className="link-button" onClick={prevStep}>Prev</Button>
                    <Button className="link-button" onClick={handleSubmit}>Submit</Button>
                </Card.Footer>
            </Card>
        </>
    );
};

export default ReferencesnResume;