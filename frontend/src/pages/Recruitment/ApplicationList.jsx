import React, {useMemo} from 'react';
import { Card, Row, Col, Container } from 'react-bootstrap';
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

    return (
        <Container fluid>
            <Row>
                <Col lg={12}>
                    <Card className='m-1 m-lg-3'>
                        <Card.Header><h5 className="card-title">Applications</h5></Card.Header>
                        <Card.Body>
                            <MyTable jsonData={jsonData} columnHeaders={columnHeaders} onRowClick={handleRowClick} initialFilters={initialFilters}/>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ApplicationList;