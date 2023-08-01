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
            <span>Spend:</span>
            <span className={s.descr}>
              $ {renderValue(statisticsData && statisticsData.spend)}
            </span>
          </div>
        </div>
      </li>
      <li className={s.platfromItem}>
        <div className={s.platformCard}>
          <div className={s.platfromHeader}>
            <span>Impressions:</span>
            <span className={s.descr}>
              {renderValue(statisticsData && statisticsData.impressions_cnt)}
            </span>
          </div>
        </div>
      </li>
      <li className={s.platfromItem}>
        <div className={s.platformCard}>
          <div className={s.platfromHeader}>
            <span>Responses:</span>
            <span className={s.descr}>
              {renderValue(statisticsData && statisticsData.responses)}
            </span>
          </div>
        </div>
      </li>
      <li className={s.platfromItem}>
        <div className={s.platformCard}>
          <div className={s.platfromHeader}>
            <span>Timeout %:</span>
            <span className={s.descr}>
              {renderValue(statisticsData && statisticsData.time_outs)} %
            </span>
          </div>
        </div>
      </li>
      <li className={s.platfromItem}>
        <div className={s.platformCard}>
          <div className={s.platfromHeader}>
            <span>Win rate %:</span>
            <span className={s.descr}>
              {renderValue(statisticsData && statisticsData.win_rate)} %
            </span>
          </div>
        </div>
      </li>
    </ul>
  );
};
