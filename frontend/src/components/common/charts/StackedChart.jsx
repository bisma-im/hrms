import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Col, FormLabel, Row } from 'react-bootstrap';

const StackedChart = ({ leaveData, filterFunction }) => {
    const [startDate, setStartDate] = useState(new Date(new Date().getFullYear(), 0, 1)); // Start of current year
    const [endDate, setEndDate] = useState(new Date(new Date().getFullYear(), 11, 31)); // End of current year
    const [series, setSeries] = useState([]);

    const leaveTypes = ["Sick leave", "Casual leave", "Privilege leave", "EOL", "Study leave"];

    // Initializes months with zero leaves
    const initializeMonths = (start, end) => {
        const months = {};
        for (let date = new Date(start); date <= end; date.setMonth(date.getMonth() + 1)) {
            const monthKey = `${date.toLocaleString('default', { month: 'short' })}'${String(date.getFullYear()).slice(2)}`;
            months[monthKey] = {};
            leaveTypes.forEach(type => {
                months[monthKey][type] = 0;
            });
        }
        return months;
    };

    // Process data based on selected dates
    const processData = (start, end, data) => {
        const filteredData = data.filter(leave => {
            const leaveDate = new Date(leave.StartDate);
            return leaveDate >= start && leaveDate <= end;
        });

        const leaveCountsByDate = initializeMonths(start, end);
        filteredData.forEach(leave => {
            const monthYear = `${new Date(leave.StartDate).toLocaleString('default', { month: 'short' })}'${new Date(leave.StartDate).getFullYear().toString().slice(2)}`;
            const typeKey = leave.LeaveType;
            leaveCountsByDate[monthYear][typeKey]++;
        });

        return leaveTypes.map(type => ({
            name: type,
            data: Object.keys(leaveCountsByDate).map(month => ({
                x: month,
                y: leaveCountsByDate[month][type] || 0
            }))
        }));
    };

    // Update series data whenever start or end date changes
    useEffect(() => {
        if (filterFunction) {
            setSeries(processData(startDate, endDate, filterFunction(leaveData)));
        } else {
            setSeries(processData(startDate, endDate, leaveData));
        }
    }, [startDate, endDate, leaveData]);

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
            categories: Object.keys(initializeMonths(startDate, endDate))
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
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        dateFormat="MMM-yyyy"
                        showMonthYearPicker
                    />
                    <DatePicker
                        className='m-2 custom-input'
                        selected={endDate}
                        onChange={date => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                        dateFormat="MMM-yyyy"
                        showMonthYearPicker
                    />
                </Col>
            </Row>

            <Chart options={options} series={series} type="bar" height={350} />
        </div>
    );
};

export default StackedChart;
