import { Card, Col, Form, Row, Button } from "react-bootstrap";

const ReferencesnResume = ({ prevStep, handleChange, handleSubmit, values }) => {
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
                    <Row>
                        <Col sm={4} className="mb-3">
                            <Form.Control
                                className="form-control"
                                type="text"
                                name="reference1_name"
                                required
                                placeholder="Reference Name"
                                onChange={handleChange('reference1_name')}
                                defaultValue={values.reference1_name}
                            />
                        </Col>
                        <Col sm={4} className="mb-3">
                            <Form.Control
                                className="form-control"
                                type="text"
                                name="reference1_designation"
                                required
                                placeholder="Reference Designation"
                                onChange={handleChange('reference1_designation')}
                                defaultValue={values.reference1_designation}
                            />
                        </Col>
                        <Col sm={4} className="mb-3">
                            <Form.Control
                                className="form-control"
                                type="text"
                                name="reference1_contact"
                                required
                                placeholder="Reference Contact"
                                onChange={handleChange('reference1_contact')}
                                defaultValue={values.reference1_contact}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={4} className="mb-3">
                            <Form.Control
                                className="form-control"
                                type="text"
                                name="reference2_name"
                                required
                                placeholder="Reference Name"
                                onChange={handleChange('reference2_name')}
                                defaultValue={values.reference2_name}
                            />
                        </Col>
                        <Col sm={4} className="mb-3">
                            <Form.Control
                                className="form-control"
                                type="text"
                                name="reference2_designation"
                                required
                                placeholder="Reference Designation"
                                onChange={handleChange('reference2_designation')}
                                defaultValue={values.reference2_designation}
                            />
                        </Col>
                        <Col sm={4} className="mb-3">
                            <Form.Control
                                className="form-control"
                                type="text"
                                name="reference2_contact"
                                required
                                placeholder="Reference Contact"
                                onChange={handleChange('reference2_contact')}
                                defaultValue={values.reference2_contact}
                            />
                        </Col>
                    </Row>
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