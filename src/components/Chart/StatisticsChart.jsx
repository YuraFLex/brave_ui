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

export const StatisticsChart = () => {
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
  const item = useSelector(state => state.item);
  const period = useSelector(state => state.period);
  // console.log('period:', period);
  // console.log('data:', data);

  const getRandomHexColor = alpha => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return `${color}${alpha}`;
  };

  const labelPeriod =
    period === 'today'
      ? 'Today'
      : period === 'yesterday'
      ? 'Yesterday'
      : period === 'lastweek'
      ? 'Last 7 Days'
      : period === 'thismonth'
      ? 'This Month'
      : period === 'lastmonth'
      ? 'Last Month'
      : period === 'custom'
      ? 'Custom'
      : '';

  useEffect(() => {
    if (!data) return;

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

    const interval = [
      '00:00',
      '01:00',
      '02:00',
      '03:00',
      '04:00',
      '05:00',
      '06:00',
      '07:00',
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
      '19:00',
      '20:00',
      '21:00',
      '22:00',
      '23:00',
    ];

    const backgroundColor = Array.from({ length: 1 }, () =>
      getRandomHexColor('33')
    );
    const borderColor = backgroundColor.map(color => color.replace('33', 'FF'));

    setChartData({
      labels: period === 'today' ? interval : data.t_interval,
      datasets: [
        {
          fill: true,
          label,
          data:
            item === 'spending'
              ? data.spending
              : item === 'imress'
              ? data.impress
              : item === 'resp'
              ? data.resp
              : item === 't_outs'
              ? data.t_outs
              : item === 'w_rate'
              ? data.w_rate
              : [],
          backgroundColor,
          borderColor,
          borderWidth: 1,
        },
      ],
    });
  }, [item, data, period]);

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
        text: `Period: ${labelPeriod}`,
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
