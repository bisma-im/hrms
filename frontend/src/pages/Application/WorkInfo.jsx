import { Card, Col, Form, Row, Button } from "react-bootstrap";
import Divider from "components/common/ui/Divider";
import ExperienceRepeater from "./ExperienceRepeater";

const WorkInfo = ({ nextStep, prevStep, handleChange, handleExperienceChange, values }) => {
    return (
        <Card className="my-card">
            <Card.Header className="card-header"><h4 className="h3" style={{ color: "#004B87" }}>3. Experience (Starting from the Current Position)</h4></Card.Header>
            <Card.Body>
                <ExperienceRepeater className="m-3" fields={values.experiences} setFields={handleExperienceChange} />
                <div className="mt-4"><span><b>Note:</b> Experience as part-time job or Adhoc employment will not be considered.</span></div>
                <Divider />
                <Row className="mb-3">
                    <Col sm={9} className=" pt-3">
                        <Form.Label><b>i.</b> Total Experience (as Permanent FM from HEC Recognized Institutions) after 18 years of education in Years/Months:</Form.Label>
                    </Col>
                    <Col sm={2}>
                        <Form.Control
                            className="form-control"
                            type="text"
                            name="total_experience"
                            required
                            placeholder="Total Experience"
                            onChange={handleChange('total_experience')}
                            defaultValue={values.total_experience}
                        />
                    </Col>
                </Row>
                <Row  className="mb-3">
                    <Col sm={9} className=" pt-3">
                        <Form.Label><b>ii.</b> Total Field Experience after 16 years of education (as Full Time/Permanent Job) in Years/Month:</Form.Label>
                    </Col>
                    <Col sm={2}>
                        <Form.Control
                            className="form-control"
                            type="text"
                            name="total_experience"
                            required
                            placeholder="Total Experience"
                            onChange={handleChange('total_experience')}
                            defaultValue={values.total_experience}
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

export default WorkInfo;