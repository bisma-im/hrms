import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from 'features/auth/authSlice';
import Sidebar from 'components/layout/nav/Sidebar/Sidebar';
import TopNavbar from 'components/layout/nav/TopNavbar/TopNavbar';
import ChartCard from 'components/common/card/ChartCard';
import PieChart from 'components/common/charts/PieChart';
import { equalizeCardHeights } from 'utils/domUtils';
import StatsCard from 'components/common/card/StatsCard';
const Home = () => {
    const sidebarWidth = useSelector(state => state.sidebar.sidebarOpen ? 180 : 60);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth);

    function onLogout(){
        dispatch(logout());
    }

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);

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
    ])

    return (
        <>
        
            <TopNavbar />
            <div className="layout-container">
                <Sidebar />
                <div className="main-content" style={{ marginLeft: `${sidebarWidth}px` }}>
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
                </Container>
                </div>
            </div>
            {/* <Container fluid>
                <Row>
                    <Col xs={12} md={3} lg={2} className="px-0">
                        <Sidebar />
                    </Col>
                    <Col xs={12} md={9} lg={10}>
                        <div className="p-3">
                            <h1>Welcome to BUKC HRMS</h1>
                            <p>This is your main area where HRMS content will be displayed.</p>
                        </div>
                    </Col>
                </Row>
            </Container> */}
        </>
    )
};

export default Home;