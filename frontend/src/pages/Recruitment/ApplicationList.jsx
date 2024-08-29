import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { Card, Row, Col, Container, DropdownButton, ButtonGroup, Dropdown } from 'react-bootstrap';
import APPLICATIONS_DATA from './APPLICATIONS_DATA.json';
import { COLUMNS } from './Columns';
import MyTable from 'components/common/table/MyTable';
import { useLocation } from 'react-router-dom';
import ScheduleInterviewModal from './ScheduleInterviewModal';

const ApplicationList = () => {

    const location = useLocation();
    const position = location.state?.position;
    const [showModal, setShowModal] = useState(false);
    const [selectedApplicant, setSelectedApplicant] = useState(null);

    const columnHeaders = useMemo(() => COLUMNS, []);

    const jsonData = APPLICATIONS_DATA;

    const initialFilters = useMemo(() => [
        { id: 'PositionAppliedFor', value: position }
    ], [position]);

    const handleRowClick = (application) => {
        // dispatch(selectEmployee(employee));
        // navigate('/employee-details');
        console.log(application)
    };

    const getColor = (status) => {
        switch (status) {
            case 'New': return 'rgba(0, 123, 255, 0.5)'; // Blue
            case 'Under Review': return 'rgba(255, 193, 7, 0.5)'; // Yellow
            case 'Interview Scheduled': return 'rgba(23, 162, 184, 0.5)'; // Teal
            case 'Interviewed': return 'rgba(40, 167, 69, 0.5)'; // Green
            case 'Offer Made': return 'rgba(255, 87, 34, 0.5)'; // Orange
            case 'Offer Accepted': return 'rgba(111, 66, 193, 0.5)'; // Purple
            case 'Onboarding': return 'rgba(108, 117, 125, 0.5)'; // Gray
            case 'Hired': return 'rgba(52, 58, 64, 0.5)'; // Darker Gray
            case 'Rejected': return 'rgba(220, 53, 69, 0.5)'; // Red
            default: return 'transparent'; // Default case
        }
    };

    const handleStatusChange = (row, newStatus) => {
        console.log(`Status for ${row.original.ApplicantName} changed to ${newStatus}`);
        // Implement the API call or state update here
    };

    const customCellRender = (row) => {
        const currentColor = getColor(row.original.Status);
        console.log(currentColor);

        return (
            <DropdownButton
                as={ButtonGroup}
                title={row.original.Status}
                id={`dropdown-button-drop-${row.id}`}
                key={row.id}
                variant="custom"
                className="custom-dropdown"
                style={{
                    backgroundColor: currentColor,
                    borderColor: currentColor,
                    color: 'white' // Adjust text color for contrast
                }}
            >
                <Dropdown.Item eventKey="1" onClick={() => handleStatusChange(row, 'New')}>New</Dropdown.Item>
                <Dropdown.Item eventKey="2" onClick={() => handleStatusChange(row, 'Under Review')}>Under Review</Dropdown.Item>
                <Dropdown.Item eventKey="3" onClick={() => handleStatusChange(row, 'Interview Scheduled')}>Interview Scheduled</Dropdown.Item>
                <Dropdown.Item eventKey="4" onClick={() => handleStatusChange(row, 'Interviewed')}>Interviewed</Dropdown.Item>
                <Dropdown.Item eventKey="5" onClick={() => handleStatusChange(row, 'Offer Made')}>Offer Made</Dropdown.Item>
                <Dropdown.Item eventKey="6" onClick={() => handleStatusChange(row, 'Offer Accepted')}>Offer Accepted</Dropdown.Item>
                <Dropdown.Item eventKey="7" onClick={() => handleStatusChange(row, 'Onboarding')}>Onboarding</Dropdown.Item>
                <Dropdown.Item eventKey="8" onClick={() => handleStatusChange(row, 'Hired')}>Hired</Dropdown.Item>
                <Dropdown.Item eventKey="9" onClick={() => handleStatusChange(row, 'Rejected')}>Rejected</Dropdown.Item>
            </DropdownButton>
        );
    };


    const handleAction = (actionType, row) => {
        switch (actionType) {
            case 'hire':
                console.log(`Hiring candidate ${row.original.ApplicantName}`);
                break;
            case 'interview':
                setSelectedApplicant(row.original);
                setShowModal(true);
                console.log(`Scheduling interview for ${row.original.ApplicantName}`);
                break;
            case 'view':
                console.log(`Viewing details for ${row.original.ApplicantName}`);
                break;
            default:
                break;
        }
    };
    const columnsWithAction = useMemo(() => {
        return COLUMNS.map(column => {
            if (column.id === 'actions') {
                return {
                    ...column,
                    Cell: ({ row }) => (
                        <Dropdown>
                            <Dropdown.Toggle as="div" className="btn-link i-false">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12Z"
                                        stroke="#737B8B"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></path>
                                    <path
                                        d="M18 12C18 12.5523 18.4477 13 19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12Z"
                                        stroke="#737B8B"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></path>
                                    <path
                                        d="M4 12C4 12.5523 4.44772 13 5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12Z"
                                        stroke="#737B8B"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></path>
                                </svg>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="dropdown-menu-right" align="end">
                                <Dropdown.Item onClick={() => handleAction('hire', row)}>Hire Candidate</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleAction('interview', row)}>Schedule Interview</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleAction('view', row)}>View</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown >
                    )
                }
            }
            return column;
        });
    }, [handleAction]);

    const handleScheduleInterview = (date, content) => {
        console.log(`Interview scheduled for ${selectedApplicant.ApplicantName} on ${date}`);
        console.log(`Email content: ${content}`);
        // Implement the API call or logic to save the interview details and send the email here
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedApplicant(null);
    };

    return (
        <Container fluid>
            <Row>
                <Col lg={12}>
                    <Card className='m-1 m-lg-3'>
                        <Card.Header><h5 className="card-title">Applications</h5></Card.Header>
                        <Card.Body>
                            <MyTable
                                jsonData={jsonData}
                                columnHeaders={columnsWithAction}
                                customCellRender={customCellRender}
                                onRowClick={handleRowClick}
                                initialFilters={initialFilters}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            {selectedApplicant && (
                <ScheduleInterviewModal
                    show={showModal}
                    handleClose={handleCloseModal}
                    applicant={selectedApplicant}
                    handleSchedule={handleScheduleInterview}
                />
            )}
        </Container>
    );
};

export default ApplicationList;