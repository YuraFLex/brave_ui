import s from './Statistics.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { statisticsData } from '../../redux/statistics/statisticsSelectors';
import { StatisticsChart } from 'components/Chart/StatisticsChart';
import { changeItem } from 'redux/statistics/itemSlice';
import { useEffect } from 'react';
import { ListItems } from './ListItems';

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

  return (
    <div className={s.StatisticsWrapper}>
      <div className={s.StatisticsInner}>
        <ul className={s.platfromList}>
          <ListItems
            label="Spend"
            value={statisticData && statisticData.spending}
            active={item === 'spending'}
            onClick={() => handleItemClick('spending')}
          />
          <ListItems
            label="Impressions"
            value={statisticData && statisticData.impress}
            active={item === 'imress'}
            onClick={() => handleItemClick('imress')}
          />
          <ListItems
            label="Responses"
            value={statisticData && statisticData.resp}
            active={item === 'resp'}
            onClick={() => handleItemClick('resp')}
          />
          <ListItems
            label="Timeout %"
            value={statisticData && statisticData.t_outs}
            active={item === 't_outs'}
            onClick={() => handleItemClick('t_outs')}
          />
          <ListItems
            label="Win rate %"
            value={statisticData && statisticData.w_rate}
            active={item === 'w_rate'}
            onClick={() => handleItemClick('w_rate')}
          />
        </ul>
      </div>
      <StatisticsChart />
    </div>
  );
};
