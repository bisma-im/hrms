import React from 'react';
import { Card } from 'react-bootstrap';
import './ChartCard.css'

const ChartCard = ({ title, children }) => (
  <Card style={{ border: 'none', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
    <Card.Header className='h3'><h4>{title}</h4></Card.Header>
    <Card.Body className='chart-card-body  chart-height-equalize'>{children}</Card.Body>
  </Card>
);

export default ChartCard;
