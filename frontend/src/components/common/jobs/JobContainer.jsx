import React, { useState } from 'react';
import { Card, Badge, Form, Button, DropdownButton, ButtonGroup, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './JobContainer.css'; // Make sure the CSS file is in the same directory
import { FaEllipsisV } from 'react-icons/fa';

const JobContainer = ({ job }) => {
    const [isPublished, setIsPublished] = useState(job.is_published === 'y' ? true : false); // Default state is published
    const navigate = useNavigate();

    const viewApplications = () => {
        // Navigate to '/applications' and pass job position state
        navigate('/applicants', { state: { position: job.title } });
    };

    const togglePublished = () => {
        setIsPublished(!isPublished);
    };

    const viewJob = (job) => {
        navigate(`/jobs/${job.job_id}`);
    }

    return (
        <div className="job-container">
            <Card className="job-card">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <span>{job.title} - {job.Department.department_name}</span>
                    <Dropdown align="end">
                        <Dropdown.Toggle as="div" className="p-0 btn-link i-false dropdown-toggle-no-arrow">
                            <FaEllipsisV />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => viewJob(job)}>View Job</Dropdown.Item>
                            <Dropdown.Item onClick={() => alert('Edit Job')}>Edit Job</Dropdown.Item>
                            <Dropdown.Item onClick={() => alert('Delete Job')}>Delete Job</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <Card.Body className="card-body">
                    <div className="application-info">
                        <Button onClick={viewApplications} className="applications">View Applications</Button>
                    </div>
                    <div className="application-info">
                        <div className="application-title">{job.new_applications_count} Applications</div>
                        <div className="application-value">{job.vacancies} To Recruit</div>
                    </div>
                </Card.Body>
                <Card.Footer className="card-footer">
                    <Form.Switch
                        id="publish-switch"
                        label={isPublished ? "Published" : "Not Published"}
                        checked={isPublished}
                        onChange={togglePublished}
                    />
                </Card.Footer>
            </Card>
        </div>
    );
};

export default JobContainer;
