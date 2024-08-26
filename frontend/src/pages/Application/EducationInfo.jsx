import { Card, Col, Form, Row, Button } from "react-bootstrap";
import QualificationRepeater from "./QualificationRepeater";
import Divider from "components/common/ui/Divider";

const EducationInfo = ({ nextStep, prevStep, handleChange, handleEducationChange, values }) => {
    return (
        <Card className="my-card">
            <Card.Header className="card-header"><h4 className="h3" style={{ color: "#004B87" }}>2. Qualification</h4></Card.Header>
            <Card.Body>
                <QualificationRepeater className="m-3" fields={values.education} setFields={handleEducationChange} />
                <Divider />
                <Row className="mb-3">
                    <Col sm="auto" className="mb-3">
                        <Form.Label className="form-label">Total Qualification (in Years)</Form.Label>
                        <Form.Control
                            className="form-control"
                            type="number"
                            required
                            name="total_qualification"
                            placeholder="Total Qualification"
                            onChange={handleChange('total_qualification')}
                            defaultValue={values.total_qualification}
                        />
                    </Col>
                    <Col sm={4} className="mb-3">
                        <Form.Label className="form-label">No. of Publications (HEC Recognized only)</Form.Label>
                        <Form.Control
                            className="form-control"
                            type="number"
                            required
                            name="no_of_publications"
                            placeholder="Total Publications"
                            onChange={handleChange('no_of_publications')}
                            defaultValue={values.no_of_publications}
                        />
                    </Col>
                    <Col sm={3} className="mb-3">
                        <Form.Label className="form-label">Category of Publications</Form.Label>
                        <Form.Control
                            as="select"
                            className="form-control form-select"
                            type="text"
                            name="category_publications"
                            required
                            placeholder="Category of Publications"
                            onChange={handleChange('category_publications')}
                            defaultValue={values.category_publications}
                        >
                            <option>Choose Category of Publications...</option>
                            <option value="w">W</option>
                            <option value="x">X</option>
                            <option value="y">Y</option>
                        </Form.Control>
                    </Col>
                    <Col sm="auto" className="mb-3">
                        <Form.Label className="form-label">Consultancy Amount (if any)</Form.Label>
                        <Form.Control
                            className="form-control"
                            type="number"
                            required
                            name="consultancy_amount"
                            placeholder="Consultancy Amount"
                            onChange={handleChange('consultancy_amount')}
                            defaultValue={values.consultancy_amount}
                        />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col sm={6} className="mb-3">
                        <Form.Label className="form-label">No. of MS/MPhil/PhD Produced (for PhD Candidates)</Form.Label>
                        <Form.Control
                            className="form-control"
                            type="number"
                            required
                            name="no_phd_produced"
                            placeholder="Number"
                            onChange={handleChange('no_phd_produced')}
                            defaultValue={values.no_phd_produced}
                        />
                    </Col>
                    <Col sm={6} className="mb-3">
                        <Form.Label className="form-label">No. of Funded/Foreign Projects as Principal Investigators/Co PI</Form.Label>
                        <Form.Control
                            className="form-control"
                            type="number"
                            required
                            name="no_of_funded_projects"
                            placeholder="Number"
                            onChange={handleChange('no_of_funded_projects')}
                            defaultValue={values.no_of_funded_projects}
                        />
                    </Col>
                </Row>
            </Card.Body>
            <Card.Footer>
                <Button className="link-button" onClick={prevStep}>Prev</Button>
                <Button className="link-button" onClick={nextStep}>Next</Button>
            </Card.Footer>
        </Card>
    );
};

export default EducationInfo;