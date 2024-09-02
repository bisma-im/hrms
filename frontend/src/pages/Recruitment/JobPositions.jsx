import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import JobContainer from 'components/common/jobs/JobContainer';
import { Link } from 'react-router-dom';
import { fetchJobs } from 'features/job/jobService';
import { useDispatch } from 'react-redux';
const JobPositions = () => {
    const [jobs, setJobs] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
    (async () => {
        try {
            const fetchedJobs = await fetchJobs();
            setJobs(fetchedJobs);

            // Process jobs here
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    })();}, [dispatch]);
    return (
        <Container fluid>
            <Row className="d-flex align-items-center justify-content-md-end">
                <Col>
                    <h3 className='m-4 heading'>Job Positions</h3>
                </Col>
                <Col xs="auto" className='m-4'>
                    <Link className='link-button' to={'/create-job'}>Create</Link>
                </Col>
            </Row>
            <Row>
                {jobs.map(job => (
                    <Col lg={4} key={job.job_id}>
                        <JobContainer job={job} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default JobPositions;
