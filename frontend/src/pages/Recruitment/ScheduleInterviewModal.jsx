import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ScheduleInterviewModal = ({ show, handleClose, applicant, onSchedule }) => {
    const [interviewDate, setInterviewDate] = useState(new Date());
    const [emailContent, setEmailContent] = useState('');

    // Function to update the email content dynamically
    const updateEmailContent = (date) => {
        const formattedDate = date.toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' });
        setEmailContent(`Dear ${applicant.ApplicantName},

We would like to schedule an interview for the position of ${applicant.PositionAppliedFor}.

The interview is scheduled for ${formattedDate}.

Please confirm your availability.

Best regards,
Bahria University Karachi Campus`);
    };

    // Update the email content whenever the interview date changes or when the modal is opened
    useEffect(() => {
        updateEmailContent(interviewDate);
    }, [interviewDate, applicant]);

    const handleSchedule = () => {
        onSchedule(interviewDate, emailContent);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Schedule Interview</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label className='me-3'>Interview Date</Form.Label>
                        <DatePicker
                            selected={interviewDate}
                            onChange={date => setInterviewDate(date)}
                            className="form-control"
                            showTimeSelect
                            dateFormat="Pp"
                        />
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Label>Email to Applicant</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={10}
                            value={emailContent}
                            onChange={(e) => setEmailContent(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSchedule}>
                    Schedule Interview
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ScheduleInterviewModal;
