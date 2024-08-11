import React from 'react';
import { Col, Card } from 'react-bootstrap';
import './LeavesTable.css'; // Ensure to import the CSS
import { Scrollbars } from 'react-custom-scrollbars-2';

// Dummy data array
const leaves = [
    { id: 1, name: 'Brandon Korsgaard', days: '1 Day', status: 'Pending' },
    { id: 2, name: 'Brandon Korsgaard', days: '1 Day', status: 'Approved' },
    { id: 3, name: 'Brandon Korsgaard', days: '1 Day', status: 'Pending' },
    { id: 4, name: 'Brandon Korsgaard', days: '1 Day', status: 'Pending' },
    { id: 5, name: 'Brandon Korsgaard', days: '1 Day', status: 'Pending' },
    { id: 6, name: 'Brandon Korsgaard', days: '1 Day', status: 'Pending' },
    { id: 7, name: 'Brandon Korsgaard', days: '1 Day', status: 'Approved' },
    { id: 8, name: 'Brandon Korsgaard', days: '1 Day', status: 'Pending' },
    { id: 9, name: 'Brandon Korsgaard', days: '1 Day', status: 'Pending' },
    { id: 10, name: 'Brandon Korsgaard', days: '1 Day', status: 'Pending' }
];

const LeavesTable = () => {
    return (
        <Card style={{ textAlign: 'left', border: 'none', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', overflow: 'auto', maxHeight: '395px'}}>
            <Card.Header>
                Leaves Today
            </Card.Header>
            <Scrollbars
                autoHide
                autoHideTimeout={1000}
                autoHideDuration={200}
                style={{ height: 'calc(100vh - 10px)' }}
                renderThumbVertical={({ style, ...props }) =>
                    <div {...props} style={{ ...style, backgroundColor: '#ccd9f1', borderRadius: '6px' }} />
                }
            >
                <Card.Body>
                    <table className="table-custom mb-4 p-3">
                        <thead>
                            <tr>
                                <th>Employee</th>
                                <th>Days</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaves.map((leave) => (
                                <tr key={leave.id}>
                                    <td>{leave.name}</td>
                                    <td>{leave.days}</td>
                                    <td>
                                        <span className={`status-label ${leave.status === 'Approved' ? 'status-approved' : 'status-pending'}`}>
                                            {leave.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card.Body>
            </Scrollbars>
        </Card>
    );
};

export default LeavesTable;
