import React from 'react';
import Card from 'react-bootstrap/Card';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const StatsCard = ({ title, total, percentage }) => {
  const percentageColor = percentage >= 0 ? "#4CAF50" : "#F44336"; // Green for positive, red for negative

  return (
    <Card className="text-dark" style={{ textAlign: 'left', border: 'none', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
      <Card.Body className='stats-card'>
        <Row className="align-items-center">
          <Col>
            <Card.Title className="mb-0">{title}</Card.Title>
            <h3 className="mb-0">{total}</h3>
            <Card.Text className="text-muted">
              {percentage >= 0 ? `+${percentage}% Increase` : `${percentage}% Decrease`}
            </Card.Text>
          </Col>
          <Col xs="auto">
            <div style={{ width: '60px', height: '60px' }}>
              <CircularProgressbar
                value={Math.abs(percentage)}
                text={`${percentage}%`}
                styles={buildStyles({
                  textColor: percentageColor,
                  pathColor: percentageColor,
                  trailColor: '#d6d6d6', // Light gray trail color
                })}
              />
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default StatsCard;
