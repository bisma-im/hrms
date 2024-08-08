// src/components/charts/PieChart.js
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';

const PieChart = ({ chartId }) => {
  const data = useSelector(state => state.charts[chartId]);

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
        colors: ['var(--primary-color)', 'var(--primary-color)', 'var(--primary-color)', 'var(--primary-color)'] // Example colors for each label
      }
    },
    plotOptions: {
      pie: {
        customScale: 1,
        donut: {
          labels: {
            show: true,
            // total: {
            //   show: true,
            //   label: 'Total',
            //   formatter: function (w) {
            //     return w.globals.seriesTotals.reduce((a, b) => {
            //       return a + b
            //     }, 0).toLocaleString();
            //   },
            //   style:{fontSize: '10px',}
            // }
          }
        }
      }
    },
    labels: data.map(item => item.name),
    // fill: {
    //   opacity: 1,
    //   colors: ["#709fba", "#9568ff", "#44814e", "var(--primary)"],
    // },
    stroke: {
      width: 0,
      colors: undefined,
    },
    yaxis: {
      show: false,
    },
    legend: {
      position: "bottom",
    },
  };

  const series = data.map(item => item.data);

  return (
    <ReactApexChart options={options} series={series} type="donut" height={200} />
  );
};

export default PieChart;
