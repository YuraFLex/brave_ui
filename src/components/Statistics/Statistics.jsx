import s from './Statistics.module.scss';
import { useSelector } from 'react-redux';
import { selectStatisticsData } from '../../redux/statistics/statisticsSelectors';

export const Statistics = () => {
  const statisticsData = useSelector(selectStatisticsData);

  console.log('statistics', statisticsData);

  const renderValue = value => {
    return value !== null ? value : 'N/A';
  };

  return (
    <ul className={s.platfromList}>
      <li className={s.platfromItem}>
        <div className={s.platformCard}>
          <div className={s.platfromHeader}>
            <span>Bid Count:</span>
            <span className={s.descr}>
              {renderValue(statisticsData && statisticsData.bids_cnt)}
            </span>
          </div>
        </div>
      </li>
      <li className={s.platfromItem}>
        <div className={s.platformCard}>
          <div className={s.platfromHeader}>
            <span>Bid Sum:</span>
            <span className={s.descr}>
              {renderValue(statisticsData && statisticsData.bids_sum)}
            </span>
          </div>
        </div>
      </li>
      <li className={s.platfromItem}>
        <div className={s.platformCard}>
          <div className={s.platfromHeader}>
            <span>Impression:</span>
            <span className={s.descr}>
              {renderValue(statisticsData && statisticsData.impressions_sum)}
            </span>
          </div>
        </div>
      </li>
    </ul>
  );
};
