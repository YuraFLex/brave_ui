import s from './Statistics.module.scss';
import { useSelector } from 'react-redux';
import { selectStatisticsData } from '../../redux/statistics/statisticsSelectors';

export const Statistics = () => {
  const statisticsData = useSelector(selectStatisticsData);

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
              $ {renderValue(statisticsData && statisticsData.spends)}
            </span>
          </div>
        </div>
      </li>
      <li className={s.platfromItem}>
        <div className={s.platformCard}>
          <div className={s.platfromHeader}>
            <span>Impressions:</span>
            <span className={s.descr}>
              {renderValue(statisticsData && statisticsData.imp_cnt)}
            </span>
          </div>
        </div>
      </li>
      <li className={s.platfromItem}>
        <div className={s.platformCard}>
          <div className={s.platfromHeader}>
            <span>Responses:</span>
            <span className={s.descr}>
              {renderValue(statisticsData && statisticsData.resp)}
            </span>
          </div>
        </div>
      </li>
      <li className={s.platfromItem}>
        <div className={s.platformCard}>
          <div className={s.platfromHeader}>
            <span>Timeout %:</span>
            <span className={s.descr}>
              {renderValue(statisticsData && statisticsData.t_outs)} %
            </span>
          </div>
        </div>
      </li>
      <li className={s.platfromItem}>
        <div className={s.platformCard}>
          <div className={s.platfromHeader}>
            <span>Win rate %:</span>
            <span className={s.descr}>
              {renderValue(statisticsData && statisticsData.w_rate)} %
            </span>
          </div>
        </div>
      </li>
    </ul>
  );
};
