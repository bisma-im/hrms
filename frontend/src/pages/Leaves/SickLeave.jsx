import React, { useState } from 'react';
import { Form, Button, Row, Col, Container, Card } from 'react-bootstrap';
import FormRepeater from './FormRepeater';

const SickLeave = () => {
    const [formData, setFormData] = useState({
        campus: '',
        designation: '',
        department: '',
        name: '',
        startDate: '',
        endDate: '',
        duration: '',
        reason: '',
        address: '',
        phone: '',
        hod_approval_date: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        // Add logic to handle form submission
    };

    // Single state object for all repeater fields
    const [repeaterFields, setRepeaterFields] = useState([{ date: '', time: '', subject: '', class: '', swapped_with: '', sign: '' }]);

    return (
        <Container fluid>
            <Row className="d-flex align-items-center">
                <Col className='m-3'>
                    <h3 className='heading'>FMS SICK LEAVE APPLICATION FORM</h3>
                </Col>
            </Row>
            <Form onSubmit={handleSubmit} className='my-form m-0 m-lg-3'>

                {/* -----------------------Employee Details Card------------------ */}
                <Card className="my-card card-bx mb-3">
                    <Card.Header>
                        <h4 className="title">Employee Details</h4>
                    </Card.Header>
                    <Card.Body>
                        <Row>
                            <Col sm={6} className="mb-3">
                                <Form.Label className="form-label">Campus</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="campus"
                                    value={formData.campus}
                                    onChange={handleChange}
                                    className="form-control form-select"
                                >
                                    <option>Choose campus...</option>
                                    <option value="Full-time">Islamabad E-8 Campus</option>
                                    <option value="Full-time">Islamabad H-11 Campus</option>
                                    <option value="Part-time">Health Sciences Campus</option>
                                    <option value="Contract">Karachi Campus</option>
                                    <option value="Temporary">Lahore Campus</option>
                                </Form.Control>
                            </Col>
                            <Col sm={6} className="mb-3">
                                <Form.Label className="form-label">Department</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="department"
                                    value={formData.department}
                                    onChange={handleChange}
                                    className="form-control form-select"
                                >
                                    <option>Choose department...</option>
                                    <option value="HR">Human Resources</option>
                                    <option value="IT">Information Technology</option>
                                    <option value="Finance">Finance</option>
                                </Form.Control>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={4} className="mb-3">
                                <Form.Label className="form-label">Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="form-control form-input p-3"
                                />
                            </Col>
                            <Col sm={4} className="mb-3">
                                <Form.Label className="form-label">Designation</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Designation"
                                    name="designation"
                                    value={formData.designation}
                                    onChange={handleChange}
                                    className="form-control form-input p-3"
                                />
                            </Col>
                            <Col sm={4} className="mb-3">
                                <Form.Label className="form-label">Tel</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Contact Number"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="form-control form-input p-3"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={4} className="mb-3">
                                <Form.Label className="form-label">Leave Period</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Leave Period"
                                    name="duration"
                                    value={formData.duration}
                                    onChange={handleChange}
                                    className="form-control form-input p-3"
                                />
                            </Col>
                            <Col sm={4} className="mb-3">
                                <Form.Label className="form-label">From</Form.Label>
                                <Form.Control
                                    type="date"
                                    placeholder="Start date"
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleChange}
                                    className="form-input p-3"
                                />
                            </Col>
                            <Col sm={4} className="mb-3">
                                <Form.Label className="form-label">To</Form.Label>
                                <Form.Control
                                    type="date"
                                    placeholder="End Date"
                                    name="endDate"
                                    value={formData.endDate}
                                    onChange={handleChange}
                                    className="form-input p-3"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={12} className="mb-3">
                                <Form.Label>Address during Leave</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="address"
                                    placeholder="Address during Leave"
                                    style={{ height: "100px" }}
                                    value={formData.address}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6} className="mb-3">
                                <Form.Label className="form-label">Application Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="application_date"
                                    value={formData.application_date}
                                    onChange={handleChange}
                                    className="form-control form-input p-3"
                                />
                            </Col>
                            <Col sm={6} className="mb-3">
                                <Form.Label className="form-label">Signature of Applicant</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Applicant Signature"
                                    name="applicant_sign"
                                    value={formData.applicant_sign}
                                    onChange={handleChange}
                                    className="form-control form-input p-3"
                                />
                            </Col>
                        </Row>
                    </Card.Body>
                    <Card.Footer className='card-footer'>
                        <div className='btn-right'>
                            <Button variant="danger" type="submit" className='m-1'>
                                Cancel
                            </Button>
                            <Button variant="primary" type="submit" className='m-1'>
                                Save Changes
                            </Button>
                        </div>
                    </Card.Footer>
                </Card>

                {/*-------------------- HOD CARD---------------------------- */}
                <Card className="my-card card-bx my-3">
                    <Card.Header>
                        <h4 className="title">Remarks of HOD regarding adjustment of Courses & other duties of above mentioned</h4>
                    </Card.Header>
                    <Card.Body>
                        <Row>
                            <Col sm={12} className="mb-3">
                                <FormRepeater fields={repeaterFields} setFields={setRepeaterFields}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12} className="mb-3">
                                <Form.Group>
                                <div>
                                    <Form.Check
                                    className='form-label'
                                        type="radio"
                                        inline  
                                        label="Recommended"
                                        name="recommendation"
                                        value="recommended"
                                        // checked={recommendation === 'recommended'}
                                        onChange={handleChange}
                                        id="recommended"
                                    />
                                    <Form.Check
                                    className='form-label'
                                    inline  
                                        type="radio"
                                        label="Not Recommended"
                                        name="recommendation"
                                        value="not_recommended"
                                        // checked={recommendation === 'not_recommended'}
                                        onChange={handleChange}
                                        id="not_recommended"
                                    />
                                    </div>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6} className="mb-3">
                                <Form.Label className="form-label">Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="hod_approval_date"
                                    value={formData.hod_approval_date}
                                    onChange={handleChange}
                                    className="form-control form-input p-3"
                                />
                            </Col>
                            <Col sm={6} className="mb-3">
                                <Form.Label className="form-label">Signature of HOD</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="HOD Signature"
                                    name="hod_sign"
                                    value={formData.hod_sign}
                                    onChange={handleChange}
                                    className="form-control form-input p-3"
                                />
                            </Col>
                        </Row>
                    </Card.Body>
                    <Card.Footer className='card-footer'>
                        <div className='btn-right'>
                            <Button variant="danger" type="submit" className='m-1'>
                                Cancel
                            </Button>
                            <Button variant="primary" type="submit" className='m-1'>
                            Save Changes
                            </Button>
                        </div>
                    </Card.Footer>
                </Card>

                {/*-------------------- HR VERIFICATION----------------------- */}
                <Card className="my-card card-bx my-3">
                    <Card.Header>
                        <h4 className="title">Remarks of HR</h4>
                    </Card.Header>
                    <Card.Body>
                        <Row>
                            <Col sm={2} className="mb-3">
                                <Form.Label className="form-label">Applied Leave</Form.Label>
                                <Form.Control
                                    type="text"
                                    disabled
                                    name="leaveType"
                                    value={"Sick Leave"}
                                    className="form-control form-input p-3"
                                />
                            </Col>
                            <Col sm={2} className="mb-3">
                                <Form.Label className="form-label">No. of Days</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="No. of Days"
                                    name="duration"
                                    value={formData.duration}
                                    onChange={handleChange}
                                    className="form-control form-input p-3"
                                />
                            </Col>
                            <Col sm={2} className="mb-3">
                                <Form.Label className="form-label">Entitlement</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Entitlement"
                                    name="entitlement"
                                    value={formData.entitlement}
                                    onChange={handleChange}
                                    className="form-control form-input p-3"
                                />
                            </Col>
                            <Col sm={2} className="mb-3">
                                <Form.Label className="form-label">Already Availed</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="already_availed"
                                    value={formData.already_availed}
                                    onChange={handleChange}
                                    className="form-control form-select"
                                >
                                    <option>Choose...</option>
                                    <option value="y">Yes</option>
                                    <option value="n">No</option>
                                </Form.Control>
                            </Col>
                            <Col sm={2} className="mb-3">
                                <Form.Label className="form-label">Balance</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Balance"
                                    name="balance"
                                    value={formData.balance}
                                    onChange={handleChange}
                                    className="form-control form-input p-3"
                                />
                            </Col>
                            <Col sm={2} className="mb-3">
                                <Form.Label className="form-label">Verified by HR</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Verification"
                                    name="hr_verification"
                                    value={formData.hr_verification}
                                    onChange={handleChange}
                                    className="form-control form-input p-3"
                                />
                            </Col>
                        </Row>
                    </Card.Body>
                    <Card.Footer className='card-footer'>
                        <div className='btn-right'>
                            <Button variant="danger" type="submit" className='m-1'>
                                Cancel
                            </Button>
                            <Button variant="primary" type="submit" className='m-1'>
                            Save Changes
                            </Button>
                        </div>
                    </Card.Footer>
                </Card>

                {/* -------------------PRINCIPAL CARD ------------------*/}
                <Card className="my-card card-bx my-3">
                    <Card.Header>
                        <h4 className="title">Remarks of Principal</h4>
                    </Card.Header>
                    <Card.Body>
                        <Row>
                            <Col sm={12} className="mb-3">
                                <Form.Group>
                                <div>
                                    <Form.Check
                                    className='form-label'
                                        type="radio"
                                        inline  
                                        label="Recommended"
                                        name="recommendation"
                                        value="recommended"
                                        // checked={recommendation === 'recommended'}
                                        onChange={handleChange}
                                        id="recommended"
                                    />
                                    <Form.Check
                                    className='form-label'
                                    inline  
                                        type="radio"
                                        label="Not Recommended"
                                        name="recommendation"
                                        value="not_recommended"
                                        // checked={recommendation === 'not_recommended'}
                                        onChange={handleChange}
                                        id="not_recommended"
                                    />
                                    </div>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6} className="mb-3">
                                <Form.Label className="form-label">Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="principal_approval_date"
                                    value={formData.principal_approval_date}
                                    onChange={handleChange}
                                    className="form-control form-input p-3"
                                />
                            </Col>
                            <Col sm={6} className="mb-3">
                                <Form.Label className="form-label">Signature of Principal</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Principal Signature"
                                    name="principal_sign"
                                    value={formData.principal_sign}
                                    onChange={handleChange}
                                    className="form-control form-input p-3"
                                />
                            </Col>
                        </Row>
                    </Card.Body>
                    <Card.Footer className='card-footer'>
                        <div className='btn-right'>
                            <Button variant="danger" type="submit" className='m-1'>
                                Cancel
                            </Button>
                            <Button variant="primary" type="submit" className='m-1'>
                            Save Changes
                            </Button>
                        </div>
                    </Card.Footer>
                </Card>

                {/* -------------------MEDICAL OFFICER CARD ------------------*/}
                <Card className="my-card card-bx my-3">
                    <Card.Header>
                        <h4 className="title">Remarks of Medical Officer</h4>
                    </Card.Header>
                    <Card.Body>
                        <Row>
                            <Col sm={12} className="mb-3">
                                <Form.Group>
                                <div>
                                    <Form.Check
                                    className='form-label'
                                        type="radio"
                                        inline  
                                        label="Recommended"
                                        name="recommendation"
                                        value="recommended"
                                        // checked={recommendation === 'recommended'}
                                        onChange={handleChange}
                                        id="recommended"
                                    />
                                    <Form.Check
                                    className='form-label'
                                    inline  
                                        type="radio"
                                        label="Not Recommended"
                                        name="recommendation"
                                        value="not_recommended"
                                        // checked={recommendation === 'not_recommended'}
                                        onChange={handleChange}
                                        id="not_recommended"
                                    />
                                    </div>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6} className="mb-3">
                                <Form.Label className="form-label">Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="med_officer_approval_date"
                                    value={formData.med_officer_approval_date}
                                    onChange={handleChange}
                                    className="form-control form-input p-3"
                                />
                            </Col>
                            <Col sm={6} className="mb-3">
                                <Form.Label className="form-label">Signature of Medical Officer</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="MEDICAL OFFICER Signature"
                                    name="med_officer_sign"
                                    value={formData.med_officer_sign}
                                    onChange={handleChange}
                                    className="form-control form-input p-3"
                                />
                            </Col>
                        </Row>
                    </Card.Body>
                    <Card.Footer className='card-footer'>
                        <div className='btn-right'>
                            <Button variant="danger" type="submit" className='m-1'>
                                Cancel
                            </Button>
                            <Button variant="primary" type="submit" className='m-1'>
                            Save Changes
                            </Button>
                        </div>
                    </Card.Footer>
                </Card>

                {/* -------------------DIRECTOR CARD ------------------*/}
                <Card className="my-card card-bx my-3">
                    <Card.Header>
                        <h4 className="title">Remarks of Director</h4>
                    </Card.Header>
                    <Card.Body>
                        <Row>
                            <Col sm={12} className="mb-3">
                                <Form.Group>
                                <div>
                                    <Form.Check
                                    className='form-label'
                                        type="radio"
                                        inline  
                                        label="Approved"
                                        name="approved"
                                        value="approved"
                                        // checked={recommendation === 'recommended'}
                                        onChange={handleChange}
                                        id="recommended"
                                    />
                                    <Form.Check
                                    className='form-label'
                                    inline  
                                        type="radio"
                                        label="Not Approved"
                                        name="approved"
                                        value="not_approved"
                                        // checked={recommendation === 'not_recommended'}
                                        onChange={handleChange}
                                        id="not_recommended"
                                    />
                                    </div>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6} className="mb-3">
                                <Form.Label className="form-label">Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="principal_approval_date"
                                    value={formData.principal_approval_date}
                                    onChange={handleChange}
                                    className="form-control form-input p-3"
                                />
                            </Col>
                            <Col sm={6} className="mb-3">
                                <Form.Label className="form-label">Signature of Principal</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Principal Signature"
                                    name="principal_sign"
                                    value={formData.principal_sign}
                                    onChange={handleChange}
                                    className="form-control form-input p-3"
                                />
                            </Col>
                        </Row>
                    </Card.Body>
                    <Card.Footer className='card-footer'>
                        <div className='btn-right'>
                            <Button variant="danger" type="submit" className='m-1'>
                                Cancel
                            </Button>
                            <Button variant="primary" type="submit" className='m-1'>
                            Save Changes
                            </Button>
                        </div>
                    </Card.Footer>
                </Card>
            </Form>
        </Container>
    );
};

export default SickLeave;
