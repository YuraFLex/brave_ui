import s from './StatisticsDspSsp.module.scss';
import { LoaderNew } from 'components/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectUserPartnerId,
  selectUserType,
} from '../../redux/auth/authSelectors';
import {
  selectIsLoadingStatistics,
  selectStatisticsData,
} from '../../redux/statistics/statisticsSelectors';
import { useEffect } from 'react';
import { fetchStatistics } from '../../redux/statistics/statisticsOperations';

export const StatisticsDspSsp = () => {
  const dispatch = useDispatch();
  const statisticsData = useSelector(selectStatisticsData);
  const isLoading = useSelector(selectIsLoadingStatistics);
  const id = useSelector(selectUserPartnerId);
  const type = useSelector(selectUserType);

  useEffect(() => {
    dispatch(fetchStatistics({ partnerId: id, type }));
  }, [dispatch, id, type]);

  console.log('ID', id);
  console.log('TYPE', type);
  console.log('statistics', statisticsData);

  if (isLoading) {
    return <LoaderNew />;
  }

  const renderStatistics = () => {
    if (type === 'SSP') {
      return (
        <>
          <li className={s.platfromItem}>
            <div className={s.platformCard}>
              <div className={s.platfromHeader}>
                <span>Bid Count:</span>
                <span className={s.descr}>
                  {statisticsData && statisticsData.bids_ssp_cnt}
                </span>
              </div>
            </div>
          </li>
          <li className={s.platfromItem}>
            <div className={s.platformCard}>
              <div className={s.platfromHeader}>
                <span>Bid Sum:</span>
                <span className={s.descr}>
                  {statisticsData && statisticsData.bids_ssp_sum}
                </span>
              </div>
            </div>
          </li>
          <li className={s.platfromItem}>
            <div className={s.platformCard}>
              <div className={s.platfromHeader}>
                <span>Impression:</span>
                <span className={s.descr}>
                  {statisticsData && statisticsData.impressions_ssp_sum}
                </span>
              </div>
            </div>
          </li>
        </>
      );
    } else if (type === 'DSP') {
      return (
        <>
          <li className={s.platfromItem}>
            <div className={s.platformCard}>
              <div className={s.platfromHeader}>
                <span>Bid Count:</span>
                <span className={s.descr}>
                  {statisticsData && statisticsData.bids_dsp_cnt}
                </span>
              </div>
            </div>
          </li>
          <li className={s.platfromItem}>
            <div className={s.platformCard}>
              <div className={s.platfromHeader}>
                <span>Bid Sum:</span>
                <span className={s.descr}>
                  {statisticsData && statisticsData.bids_dsp_sum}
                </span>
              </div>
            </div>
          </li>
          <li className={s.platfromItem}>
            <div className={s.platformCard}>
              <div className={s.platfromHeader}>
                <span>Impression:</span>
                <span className={s.descr}>
                  {statisticsData && statisticsData.impressions_dsp_sum}
                </span>
              </div>
            </div>
          </li>
        </>
      );
    }
  };

  return <ul className={s.platfromList}>{renderStatistics()}</ul>;
};
