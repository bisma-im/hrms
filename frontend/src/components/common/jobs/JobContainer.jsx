import React, { useState } from 'react';
import { Card, Badge, Form, Button } from 'react-bootstrap';
import './JobContainer.css'; // Make sure the CSS file is in the same directory

const JobContainer = ({ job }) => {
    const [isPublished, setIsPublished] = useState(true); // Default state is published

    const togglePublished = () => {
        setIsPublished(!isPublished);
    };

    return (
        <div className="job-container">
            <Card className="job-card">
                <div className="card-header">
                    {job.title}
                    <Badge className='status-badge'>
                        {isPublished ? "PUBLISHED" : "NOT PUBLISHED"}
                    </Badge>
                </div>
                <Card.Body className="card-body">
                    <div className="application-info">
                        <Button className="applications">View Applications</Button>
                    </div>
                    <div className="application-info">
                        <div className="application-title">{job.applications} Applications</div>
                        <div className="application-value">{job.num_of_positions} To Recruit</div>
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
