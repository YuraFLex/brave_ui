import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useSelector } from 'react-redux';
import { selectStatisticsData } from 'redux/statistics/statisticsSelectors';
import { selectUserType } from 'redux/auth/authSelectors';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const ReportsChart = () => {
  const dataStat = useSelector(selectStatisticsData);
  const userType = useSelector(selectUserType);

  const options = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: `${userType} Statistics`,
      },
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
  ];

  const data = {
    labels,
    datasets: [
      {
        label: 'Bid Count',
        data: labels.map(() => Math.floor(Math.random() * 2501)),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        yAxisID: 'y',
      },
      {
        label: 'Bid Sum',
        data: labels.map(() => Math.floor(Math.random() * 2501)),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        yAxisID: 'y1',
      },
      {
        label: 'Impression',
        data: labels.map(() => Math.floor(Math.random() * 2501)),
        borderColor: 'rgb(121, 43, 169)',
        backgroundColor: 'rgb(205, 151, 238)',
        yAxisID: 'y1',
      },
    ],
  };

  console.log('Дата с сервака:', dataStat);
  return <Line options={options} data={data} />;
};
