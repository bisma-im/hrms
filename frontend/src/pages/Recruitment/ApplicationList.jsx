import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Card, Row, Col, Container, DropdownButton, ButtonGroup, Dropdown } from 'react-bootstrap';
import APPLICATIONS_DATA from './APPLICATIONS_DATA.json';
import { COLUMNS } from './Columns';
import MyTable from 'components/common/table/MyTable';
import { useLocation } from 'react-router-dom';

const ApplicationList = () => {

    const location = useLocation();
    const position = location.state?.position;

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
                // Implement hiring logic here
                break;
            case 'interview':
                console.log(`Scheduling interview for ${row.original.ApplicantName}`);
                // Implement interview scheduling logic here
                break;
            case 'view':
                console.log(`Viewing details for ${row.original.ApplicantName}`);
                // Implement view logic here
                break;
            default:
                break;
        }
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
                                columnHeaders={columnHeaders} 
                                customCellRender={customCellRender} 
                                onRowClick={handleRowClick} 
                                initialFilters={initialFilters} 
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ApplicationList;