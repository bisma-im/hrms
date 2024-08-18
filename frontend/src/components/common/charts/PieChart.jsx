import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';

const PieChart = ({ chartId }) => {
    const data = useSelector(state => state.charts[chartId] || []);

    const options = {
        chart: {
            type: 'pie',
            width: '100%', // Reduce width to allow space for the legend
            // height: 200,
            offsetY: -60,
            toolbar: {
                show: false
            }, // You might need to experiment with this value
        },
        labels: data.map(item => item.name),
        legend: {
            position: 'right',
            horizontalAlign: 'center', // Center the legend text horizontally
            floating: false,
            fontSize: '11px',
            width: '50%',
            offsetY: 60,
            offsetX: -10, // Reduce this to move the legend closer to the center
            itemMargin: {
                vertical: 5
            },
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '65%',
                },
                customScale: 0.60
            }
        },
        dataLabels: {
            enabled: false
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: '100%',
                    offsetX: 0,
                    offsetY: -30,
                },
                legend: {
                    position: 'bottom',
                    offsetY: -30,
                    offsetX: 0,
                    itemWidth: 100,
                    width: '100%'
                }
            }
        }],
        tooltip: {
            style: {
                fontSize: '14px'
            }
        },
    };

    const series = data.map(item => item.data);

    return (
        <div>
            <ReactApexChart options={options} series={series} type="pie" height={300}/>
        </div>
    );
};



export default PieChart;
