<Col sm={4} className="mb-3">
                                <Form.Label className="form-label  me-3">Select Job</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="job_id"
                                    defaultValue={values.job_id}
                                    onChange={handleChange('job_id')}
                                    className="form-control form-select"
                                // disabled={!jobs.length}
                                >
                                    <option>Choose job...</option>
                                    {jobs && jobs.map((job, i) => (
                                        <option key={i} value={job.job_id}>{job.title}</option>
                                    ))}
                                </Form.Control>
                            </Col>
                            <Col sm={4} className="mb-3">
                                <Form.Label className="form-label  me-3">Date of Joining</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="doj"
                                    defaultValue={values.doj}
                                    onChange={handleChange('doj')}
                                    className="form-control" />
                            </Col>