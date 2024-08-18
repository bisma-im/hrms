// src/components/charts/PieChart.js
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';

const DonutChart = ({ chartId }) => {
  const data = useSelector(state => state.charts[chartId] || []);

  const options= {
    chart: {
      type: "donut",
      // height: 200
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '14px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        colors: ['var(--text-color)', 'var(--text-color)', 'var(--text-color)', 'var(--text-color)'] // Example colors for each label
      }
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              fontSize: '16px'
            },
            value: {
              fontSize: '14px'
            },
            total: {
              show: true,
              fontSize: '18px',
              label: 'Total'
            }
          }
        }
      }
    },
    labels: data.map(item => item.name),
    stroke: {
      width: 0,
      colors: undefined,
    },
    yaxis: {
      show: false,
    },
    legend: {
      position: "bottom",
      markers: {
        width: 12,
        height: 12
      },
      style: {
        colors: ['var(--text-color)', 'var(--text-color)', 'var(--text-color)', 'var(--text-color)'] 
      },
    },
  };

  const series = data.map(item => item.data);

  return (
    <ReactApexChart options={options} series={series} type="donut" height={200} />
  );
};

export default DonutChart;
