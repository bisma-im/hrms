import React from 'react';
import LEAVE_DATA from 'pages/Leaves/LEAVE_DATA.json';
import { Card, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import StackedChart from 'components/common/charts/StackedChart';
const EmployeeLeaves = () => {
    const employee = useSelector((state) => state.employee.selectedEmployee);
    const data = LEAVE_DATA;
    const currentEmployeeLeaves = (data) => {
        return data.filter(leave => leave.EmployeeId === employee.id);
    };

    function calculateDuration(startDateStr, endDateStr) {
        const startDate = new Date(startDateStr);
        const endDate = new Date(endDateStr);
        const timeDiff = endDate - startDate; // Difference in milliseconds
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Convert milliseconds to days
        return daysDiff;
    }

    // Get the current employee's leaves by invoking the function
    const leaves = currentEmployeeLeaves(data);

    return (
        <>
            <Card className='my-card m-3'>
                <Card.Header>
                    <h3>Leaves</h3>
                </Card.Header>
                <Card.Body className="table-responsive my-table">
                    <Table striped bordered hover className='table'>
                        <thead>
                            <tr>
                                <th>Leave Type</th>
                                <th>Applied Date</th>
                                <th>HOD Approval</th>
                                <th>Principal Approval</th>
                                <th>HR Approval</th>
                                <th>Director Approval</th>
                                <th>Duration</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaves.map((leave, i) => (
                                <tr key={i}>
                                    <td>{leave.LeaveType}</td>
                                    <td>{leave.DateCreated}</td>
                                    <td>{leave.Status}</td>
                                    <td>{leave.Status}</td>
                                    <td>{leave.Status}</td>
                                    <td>{leave.Status}</td>
                                    <td>{calculateDuration(leave.StartDate, leave.EndDate)} days</td>
                                    <td>{leave.StartDate}</td>
                                    <td>{leave.EndDate}</td>
                                    <td>...</td>
                                </tr>
                            ))}

                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
            <Card className='my-card m-3'>
                <Card.Header>
                    <h3>Leaves</h3>
                </Card.Header>
                <Card.Body className="table-responsive my-table">
                    <StackedChart
                        leaveData={LEAVE_DATA}
                        filterFunction={currentEmployeeLeaves} />
                </Card.Body>
            </Card>
        </>
    );
}

export default EmployeeLeaves;

