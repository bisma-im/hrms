import { Card, Button, Row, Col } from 'react-bootstrap';
import React from 'react';

const LeaveWidget = ({ icon, leaveType, iconColor, availableDays, usedDays }) => {
    return (
        <Card className="m-2 shadow-sm p-3" style={{ minWidth: '18rem', borderRadius: '10px' }}>
            <Card.Body>
                <Card.Title className="d-flex justify-content-between align-items-center">
                    {React.createElement(icon, { size: 50, color: iconColor })}
                    <span className='title'><h2>{leaveType}</h2></span>
                </Card.Title>
                <Card.Text className="d-flex justify-content-between mt-4">
                    <div>
                        Available <br />
                        <span className="h3">{availableDays}</span> days
                    </div>
                    <div>
                        Used <br />
                        <span className="h3">{usedDays}</span> days
                    </div>
                </Card.Text>
            </Card.Body>
        </Card>

    );
};

export default LeaveWidget;
