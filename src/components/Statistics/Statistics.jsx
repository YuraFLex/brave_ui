import s from './Statistics.module.scss';
import { useSelector } from 'react-redux';
import { statisticsData } from '../../redux/statistics/statisticsSelectors';
import { StatisticsChart } from 'components/Chart/StatisticsChart';
import { useState } from 'react';

export const Statistics = () => {
  const [item, setItem] = useState('spending');

  const statisticData = useSelector(statisticsData);

  // console.log('statisticData:', statisticData);

  const handleChabgeItem = newValue => {
    setItem(newValue);
  };

  const renderValue = value => {
    return value !== null ? value : 'N/A';
  };

  return (
    <div className={s.StatisticsWrapper}>
      <div className={s.StatisticsInner}>
        <ul className={s.platfromList}>
          <li
            className={`${s.platfromItem} ${
              item === 'spending' ? s.active : ''
            }`}
            onClick={() => handleChabgeItem('spending')}
          >
            <div className={s.platformCard}>
              <div className={s.platfromHeader}>
                <span>Spend:</span>
                <span className={s.descr}>
                  $ {renderValue(statisticData && statisticData.spending)}
                </span>
              </div>
            </div>
          </li>
          <li
            className={`${s.platfromItem} ${item === 'imress' ? s.active : ''}`}
            onClick={() => handleChabgeItem('imress')}
          >
            <div className={s.platformCard}>
              <div className={s.platfromHeader}>
                <span>Impressions:</span>
                <span className={s.descr}>
                  {renderValue(statisticData && statisticData.impress)}
                </span>
              </div>
            </div>
          </li>
          <li
            className={`${s.platfromItem} ${item === 'resp' ? s.active : ''}`}
            onClick={() => handleChabgeItem('resp')}
          >
            <div className={s.platformCard}>
              <div className={s.platfromHeader}>
                <span>Responses:</span>
                <span className={s.descr}>
                  {renderValue(statisticData && statisticData.resp)}
                </span>
              </div>
            </div>
          </li>
          <li
            className={`${s.platfromItem} ${item === 't_outs' ? s.active : ''}`}
            onClick={() => handleChabgeItem('t_outs')}
          >
            <div className={s.platformCard}>
              <div className={s.platfromHeader}>
                <span>Timeout %:</span>
                <span className={s.descr}>
                  {renderValue(statisticData && statisticData.t_outs)} %
                </span>
              </div>
            </div>
          </li>
          <li
            className={`${s.platfromItem} ${item === 'w_rate' ? s.active : ''}`}
            onClick={() => handleChabgeItem('w_rate')}
          >
            <div className={s.platformCard}>
              <div className={s.platfromHeader}>
                <span>Win rate %:</span>
                <span className={s.descr}>
                  {renderValue(statisticData && statisticData.w_rate)} %
                </span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <StatisticsChart item={item} />
    </div>
  );
};
