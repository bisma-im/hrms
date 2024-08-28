import React from 'react';
import { useSelector } from 'react-redux';
import Chart from 'react-apexcharts';
import { selectJobPositionsData } from 'features/charts/chartSelector';

const BarChart = () => {
    const data = useSelector(selectJobPositionsData)  || [];


    if (!data) return <div>No data available.</div>;

    const categories = data.map(item => item.job_title);
    const seriesData = data.map(item => item.count);

    const options = {
        chart: {
            type: 'bar',
            height: 'auto',
            foreColor: 'var(--text-color)'
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: categories,
        },
        yaxis: {
            title: {
                text: 'Number of Positions'
            }
        },
        fill: {
            opacity: 1
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val + " positions"
                }
            }
        }
    };

    const series = [{
        name: 'Employees',
        data: seriesData
    }];

    return (
        <div>
            <Chart options={options} series={series} type="bar" height={350} />
        </div>
    );
};

export default React.memo(BarChart);
