import s from './Statistics.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { statisticsData } from '../../redux/statistics/statisticsSelectors';
import { StatisticsChart } from 'components/Chart/StatisticsChart';
import { changeItem } from 'redux/statistics/itemSlice';
import { useEffect } from 'react';

export const Statistics = () => {
  const statisticData = useSelector(statisticsData);
  const item = useSelector(state => state.item);
  const dispatch = useDispatch();

  // console.log('statisticData:', statisticData);

  useEffect(() => {
    dispatch(changeItem('spending'));
  }, [dispatch]);

  const handleItemClick = newValue => {
    dispatch(changeItem(newValue));
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
            onClick={() => handleItemClick('spending')}
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
            onClick={() => handleItemClick('imress')}
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
            onClick={() => handleItemClick('resp')}
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
            onClick={() => handleItemClick('t_outs')}
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
            onClick={() => handleItemClick('w_rate')}
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
      <StatisticsChart />
    </div>
  );
};
