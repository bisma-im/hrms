import React, { useState, useEffect, useCallback } from 'react';
import Chart from 'react-apexcharts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Col, FormLabel, Row } from 'react-bootstrap';

const StackedChart = ({ leaveData, filterFunction }) => {
    const [dates, setDates] = useState({
        startDate: new Date(new Date().getFullYear(), 0, 1),
        endDate: new Date(new Date().getFullYear(), 11, 31)
    });
    const [series, setSeries] = useState([]);

    // Helper function to initialize months with zero leaves
    const initializeMonths = useCallback((start, end) => {
        const months = {};
        for (let date = new Date(start); date <= end; date.setMonth(date.getMonth() + 1)) {
            const monthKey = `${date.toLocaleString('default', { month: 'short' })}'${String(date.getFullYear()).slice(2)}`;
            months[monthKey] = {};
            ["Sick leave", "Casual leave", "Privilege leave", "EOL", "Study leave"].forEach(type => {
                months[monthKey][type] = 0;
            });
        }
        return months;
    }, []);

    // Process data based on selected dates
    const processData = useCallback((start, end, data) => {
        const filteredData = data.filter(leave => {
            const leaveDate = new Date(leave.StartDate);
            return leaveDate >= start && leaveDate <= end;
        });

        const leaveCountsByDate = initializeMonths(start, end);
        filteredData.forEach(leave => {
            const monthYear = `${new Date(leave.StartDate).toLocaleString('default', { month: 'short' })}'${new Date(leave.StartDate).getFullYear().toString().slice(2)}`;
            leaveCountsByDate[monthYear][leave.LeaveType]++;
        });

        return ["Sick leave", "Casual leave", "Privilege leave", "EOL", "Study leave"].map(type => ({
            name: type,
            data: Object.keys(leaveCountsByDate).map(month => ({
                x: month,
                y: leaveCountsByDate[month][type] || 0
            }))
        }));
    }, [initializeMonths]);

    // Update series data whenever dates change
    useEffect(() => {
        setSeries(processData(dates.startDate, dates.endDate, filterFunction ? filterFunction(leaveData) : leaveData));
    }, [dates, leaveData, filterFunction, processData]);

    const handleDateChange = useCallback((changedDate, which) => {
        setDates(prevDates => ({ ...prevDates, [which]: changedDate }));
    }, []);

    const options = {
        chart: {
            type: 'bar',
            height: 350,
            stacked: true,
            toolbar: {
                show: true
            },
            zoom: {
                enabled: true
            },
            foreColor: 'var(--text-color)'
        },
        plotOptions: {
            bar: {
                horizontal: false,
                dataLabels: {
                    enabled: true,
                    textAnchor: 'start',
                    total: {
                        enabled: true,
                        offsetX: 0,
                        style: {
                            fontSize: '13px',
                            fontWeight: 900,
                            color: 'var(--text-color)'
                        }
                    },
                    style: {
                        color: ['var(--text-color)']
                    },
                    offsetX: 0,
                    offsetY: -20
                }
            }
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    fontSize: '10px'
                },
                legend: {
                    position: 'bottom'
                }
            }
        }],
        xaxis: {
            categories: Object.keys(initializeMonths(dates.startDate, dates.endDate))
        },
        yaxis: {
            title: {
                text: 'Number of Days'
            }
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val + ' leaves'; // Customize tooltip format here
                }
            }
        },
        fill: {
            opacity: 1
        },
        legend: {
            position: 'right'
        }
    };

    return (
        <div style={{ width: '100%' }}>
            <Row>
                <Col xs={12} className="d-flex flex-column flex-sm-row align-items-center">
                    <FormLabel className='custom-label mb-2 mb-sm-0'>{"Date Range: "}</FormLabel>
                    <DatePicker 
                        className='m-2 custom-input'
                        selected={dates.startDate}
                        onChange={date => handleDateChange(date, 'startDate')}
                        selectsStart
                        startDate={dates.startDate}
                        endDate={dates.endDate}
                        dateFormat="MMM-yyyy"
                        showMonthYearPicker
                    />
                    <DatePicker
                        className='m-2 custom-input'
                        selected={dates.endDate}
                        onChange={date => handleDateChange(date, 'endDate')}
                        selectsEnd
                        startDate={dates.startDate}
                        endDate={dates.endDate}
                        minDate={dates.startDate}
                        dateFormat="MMM-yyyy"
                        showMonthYearPicker
                    />
                </Col>
            </Row>

            <Chart options={options} series={series} type="bar" height={350} />
        </div>
    );
};

export default React.memo(StackedChart);
