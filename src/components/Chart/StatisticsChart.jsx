import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { chartIsLoading, chartsData } from 'redux/chart/chartSelectors';
import LinearProgress from '@mui/material/LinearProgress';
import s from './StatisticsChart.module.scss';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

export const StatisticsChart = ({ item }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: '',
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  });

  const isLoading = useSelector(chartIsLoading);
  const data = useSelector(chartsData);
  // console.log('data:', data);

  const getRandomHexColor = alpha => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return `${color}${alpha}`;
  };

  const label =
    item === 'spending'
      ? 'Spend'
      : item === 'imress'
      ? 'Impressions'
      : item === 'resp'
      ? 'Responses'
      : item === 't_outs'
      ? 'Timeout %'
      : item === 'w_rate'
      ? 'Win rate %'
      : '';

  useEffect(() => {
    if (!data) return;

    const backgroundColor = Array.from({ length: 24 }, () =>
      getRandomHexColor('33')
    );
    const borderColor = backgroundColor.map(color => color.replace('33', 'FF'));

    setChartData({
      labels: data.yesterday.t_interval,
      datasets: [
        {
          fill: true,
          label: 'Today',
          data:
            item === 'spending'
              ? data.today.spending
              : item === 'imress'
              ? data.today.impress
              : item === 'resp'
              ? data.today.resp
              : item === 't_outs'
              ? data.today.t_outs
              : item === 'w_rate'
              ? data.today.w_rate
              : [],
          backgroundColor,
          borderColor,
          borderWidth: 1,
        },
        {
          fill: false,
          label: 'Yesterday',
          data:
            item === 'spending'
              ? data.yesterday.spending
              : item === 'imress'
              ? data.yesterday.impress
              : item === 'resp'
              ? data.yesterday.resp
              : item === 't_outs'
              ? data.yesterday.t_outs
              : item === 'w_rate'
              ? data.yesterday.w_rate
              : [],
          backgroundColor,
          borderColor,
          borderWidth: 1,
        },
      ],
    });
  }, [item, data]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        // display: false,
      },
      title: {
        display: true,
        text: `${label}`,
      },
    },
  };

  return (
    <div className={s.ChartJSBox}>
      <div className={s.StatisticsInnerChart}>
        {isLoading && (
          <LinearProgress
            color="inherit"
            style={{ marginTop: '-20px', marginBottom: '20px' }}
          />
        )}
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};
