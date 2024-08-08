import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import ChartCard from 'components/common/card/ChartCard';
import PieChart from 'components/common/charts/PieChart';
import StatsCard from 'components/common/card/StatsCard';
import { equalizeCardHeights } from 'utils/domUtils';
import LeavesTable from './LeavesTable';

const Dashboard = () => {

    // For stats cards
    useEffect(() => {
        equalizeCardHeights('stats-card');
        const handleResize = () => equalizeCardHeights('stats-card');
        window.addEventListener('resize', handleResize);
        
        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, []);

    // For chart cards
    useEffect(() => {
        // Adjust card heights on initial mount and on resize
        equalizeCardHeights('chart-card-body');
        window.addEventListener('resize', () => equalizeCardHeights('chart-card-body'));
    
        // Cleanup the event listener on component unmount
        return () => {
          window.removeEventListener('resize', () => equalizeCardHeights('chart-card-body'));
        };
      }, []);

    // dummy stats for stats cards
    const [stats, setStats] = useState([
        { id: 1, title: "Total Applications", total: 5672, percentage: 14 },
        { id: 2, title: "Shortlisted Candidates", total: 1120, percentage: -3 },
        { id: 3, title: "Rejected Candidates", total: 1055, percentage: 5 },
        { id: 4, title: "Total Employees", total: 1245, percentage: -3 },
    ]);

    // Example function to simulate stats update
    const updateStats = () => {
        setStats(stats.map(stat => ({
        ...stat,
        total: Math.floor(stat.total * (1 + stat.percentage / 100)),
        percentage: (Math.random() - 0.5) * 20 // Randomly changing percentage
        })));
    };

    const[chartData, setChartData] = useState([
        { id: 1, title: "Gender Distribution", chartId: 'genderDistribution'},
        { id: 2, title: "Gender Distribution", chartId: 'genderDistribution'},
        { id: 3, title: "Office Distribution", chartId: 'departmentBudget'},
        { id: 4, title: "Office Distribution", chartId: 'departmentBudget'},
    ]);

    return (
        <Container fluid>
            <Row>
                {chartData.map(chart => (
                    <Col xs={12} md={6} lg={3} key={chart.id} >
                        <ChartCard title={chart.title} className='chart-container'>
                            <PieChart chartId={chart.chartId} />
                        </ChartCard>
                    </Col>
                ))}
            </Row>
            <div className='m-3'></div>
            <Row>
                {stats.map(stat => (
                    <Col xs={12} md={6} lg={3} key={stat.id} >
                        <StatsCard title={stat.title} total={stat.total} percentage={stat.percentage} />
                    </Col>
                ))}
            </Row>
            <div className='m-3'></div>
            <div className="row card-deck">
                <Col xs={12} md={6} className='equal-height-col'>
                    <Card style={{ textAlign: 'left', border: 'none', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }} className="card d-flex flex-column">
                        <Card.Header>Employee Search Form</Card.Header>
                        <Card.Body className='p-3'>
                            <Form>
                                <Form.Group as={Row} >
                                    <Form.Label column sm={3} className='mb-3'>
                                    Staff Email
                                    </Form.Label>
                                    <Col sm={9}>
                                    <Form.Control type="email" placeholder="Enter email" />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} >
                                    <Form.Label column sm={3} className='mb-3'>
                                    Staff Name
                                    </Form.Label>
                                    <Col sm={9}>
                                    <Form.Control type="text" placeholder="Enter name" />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} >
                                    <Form.Label column sm={3} className='mb-3'>
                                    Designation
                                    </Form.Label>
                                    <Col sm={9}>
                                    <Form.Control type="text" placeholder="Enter designation" />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className='mb-3'>
                                    <Form.Label column sm={3}>
                                    Staff ID
                                    </Form.Label>
                                    <Col sm={9}>
                                    <Form.Control type="text" placeholder="Enter ID" />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Label column sm={3} className='mb-3'>
                                    Staff Gender
                                    </Form.Label>
                                    <Col sm={9}>
                                    <Form.Control type="text" placeholder="Enter gender" />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} >
                                    <Form.Label column sm={3} className='mb-3'>
                                    Staff Contact
                                    </Form.Label>
                                    <Col sm={9}>
                                    <Form.Control type="text" placeholder="Enter contact" />
                                    </Col>
                                </Form.Group>
                                <div className="text-center mb-4">
                                    <Button type="submit" className="btn-primary btn-block">
                                    {/* {isLoading ? 'Submitting...' : 'Submit'} */}
                                    Submit
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={6} className='equal-height-col'>
                <LeavesTable/>
                </Col>
            </div>
        </Container>
    );
};

export default Dashboard;