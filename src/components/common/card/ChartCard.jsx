import React from 'react';
import { Card } from 'react-bootstrap';
import './ChartCard.css'

const ChartCard = ({ title, children }) => (
  <Card>
    <Card.Header>{title}</Card.Header>
    <Card.Body className='chart-card-body'>{children}</Card.Body>
  </Card>
);

export default ChartCard;
