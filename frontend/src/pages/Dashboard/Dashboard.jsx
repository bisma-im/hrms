import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import ChartCard from 'components/common/card/ChartCard';
import DonutChart from 'components/common/charts/DonutChart';
import StatsCard from 'components/common/card/StatsCard';
import { equalizeCardHeights } from 'utils/domUtils';
import { useDispatch, useSelector } from 'react-redux';
import LeavesTable from './LeavesTable';
import MOCK_DATA from '../Employees/MOCK_DATA.json';
import { processGenderData, calculateLongTermCounts, calculateJobPositions, calculateEmployeesByDepartment } from 'utils/dashboardUtils';
import { setChartData } from 'features/charts/chartsSlice';
import PieChart from 'components/common/charts/PieChart';
import BarChart from 'components/common/charts/BarChart';

const Dashboard = () => {
    const dispatch = useDispatch();
    const chartData = useSelector(state => state.charts);
    useEffect(() => {
        //Gender count for gender chart
        const genderChartData = processGenderData(MOCK_DATA);
        dispatch(setChartData({ chartId: 'genderDistribution', data: genderChartData }));

        // Long term employee count
        const longTermEmployeeData = calculateLongTermCounts(MOCK_DATA);
        dispatch(setChartData({ chartId: 'longTermEmployee', data: longTermEmployeeData }));

        // employee count in each dept
        const employeeDeptData = calculateEmployeesByDepartment(MOCK_DATA);
        dispatch(setChartData({ chartId: 'employeesByDepartment', data: employeeDeptData }));

        // employee count of each job position
        const jobPositionData = calculateJobPositions(MOCK_DATA);
        dispatch(setChartData({ chartId: 'jobPositions', data: jobPositionData }));

    }, [dispatch]);

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
        equalizeCardHeights('chart-height-equalize');
        window.addEventListener('resize', () => equalizeCardHeights('chart-height-equalize'));

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('resize', () => equalizeCardHeights('chart-height-equalize'));
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

    const [charts, setCharts] = useState([
        { id: 1, title: "Gender Distribution", chartId: 'genderDistribution' },
        { id: 2, title: "Employees' Years of Service", chartId: 'longTermEmployee' },
        // { id: 3, title: "Employees By Department", chartId: 'employeesByDepartment' },
    ]);

    return (
        <Container fluid>
            <Row>
                {charts.map(chart => (
                    <Col xs={12} md={6} lg={3} key={chart.id} className='chart-col'>
                        <ChartCard title={chart.title} className='chart-container'>
                            <DonutChart chartId={chart.chartId} />
                        </ChartCard>
                    </Col>
                ))}
                <Col xs={12} md={12} lg={6} className='chart-col'>
                    <Card style={{ border: 'none', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                        <Card.Header>{'Employees By Department'}</Card.Header>
                        <Card.Body className='chart-height-equalize problematic-card-body'>                        
                            <PieChart chartId='employeesByDepartment' style={{margin: '10px'}}/>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col xs={12} md={12} lg={12} className='chart-col'>
                    <Card style={{ border: 'none', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                        <Card.Header>{'Job Positions'}</Card.Header>
                        <Card.Body>                        
                            <BarChart chartId='jobPositions'/>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                {stats.map(stat => (
                    <Col xs={12} md={6} lg={3} key={stat.id} className='chart-col'>
                        <StatsCard title={stat.title} total={stat.total} percentage={stat.percentage} />
                    </Col>
                ))}
            </Row>
            <Row>
                <Col xs={12} md={6} lg={6} className='table-col'>
                    <Card style={{ textAlign: 'left', border: 'none', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }} className="card d-flex flex-column">
                        <Card.Header>Employee Search Form</Card.Header>
                        <Card.Body className='p-3'>
                            <Form className='my-form'>
                                <Form.Group as={Row} >
                                    <Form.Label column sm={3} className='form-label mt-2'>
                                        Staff Email
                                    </Form.Label>
                                    <Col sm={9}>
                                        <Form.Control type="email" placeholder="Enter email" className='mb-3 form-control'/>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} >
                                    <Form.Label column sm={3} className='form-label mb-3'>
                                        Staff Name
                                    </Form.Label>
                                    <Col sm={9}>
                                        <Form.Control type="text" placeholder="Enter name" className='mb-3 form-control' />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} >
                                    <Form.Label column sm={3} className='form-label mb-3'>
                                        Designation
                                    </Form.Label>
                                    <Col sm={9}>
                                        <Form.Control type="text" placeholder="Enter designation" className='mb-3 form-control' />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Label column sm={3} className='form-label mb-3'>
                                        Staff ID
                                    </Form.Label>
                                    <Col sm={9}>
                                        <Form.Control type="text" placeholder="Enter ID" className='mb-3 form-control' />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Label column sm={3} className='form-label mb-3'>
                                        Staff Gender
                                    </Form.Label>
                                    <Col sm={9}>
                                        <Form.Control type="text" placeholder="Enter gender" className='mb-3 form-control' />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} >
                                    <Form.Label column sm={3} className='form-label mb-3'>
                                        Staff Contact
                                    </Form.Label>
                                    <Col sm={9}>
                                        <Form.Control type="text" placeholder="Enter contact" className='mb-3 form-control' />
                                    </Col>
                                </Form.Group>
                                <Card.Footer>
                                    <div className="text-center mb-4">
                                        <Button type="submit" className="btn-primary btn-block">
                                            {/* {isLoading ? 'Submitting...' : 'Submit'} */}
                                            Submit
                                        </Button>
                                    </div>
                                </Card.Footer>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={6} lg={6} className='table-col'>
                    <LeavesTable />
                </Col>
            </Row>
            {/* </div> */}
        </Container>
    );
};

export default Dashboard;