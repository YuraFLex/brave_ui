import { BsArrowUpShort } from 'react-icons/bs';
import s from './StatisticsDspSsp.module.scss';

export const StatisticsDspSsp = () => {
  return (
    <ul className={s.platfromList}>
      <li className={s.platfromItem}>
        <div className={s.platformCard}>
          <div className={s.platfromHeader}>
            <span>Bid Requests</span>
            <span>
              +64.4% <BsArrowUpShort />
            </span>
          </div>
          <div>
            <span className={s.descr}>8888888888</span>
          </div>
        </div>
      </li>
      <li className={s.platfromItem}>
        <div className={s.platformCard}>
          <div className={s.platfromHeader}>
            <span>Bid Response</span>
            <span>
              +64.4% <BsArrowUpShort />
            </span>
          </div>
          <div>
            <span className={s.descr}>8888888888</span>
          </div>
        </div>
      </li>
      <li className={s.platfromItem}>
        <div className={s.platformCard}>
          <div className={s.platfromHeader}>
            <span>Impressions</span>
            <span>
              +64.4% <BsArrowUpShort />
            </span>
          </div>
          <div>
            <span className={s.descr}>8888888888</span>
          </div>
        </div>
      </li>
      <li className={s.platfromItem}>
        <div className={s.platformCard}>
          <div className={s.platfromHeader}>
            <span>Win Rate %</span>
            <span>
              +6.4% <BsArrowUpShort />
            </span>
          </div>
          <div>
            <span className={s.descr}>15%</span>
          </div>
        </div>
      </li>
      <li className={s.platfromItem}>
        <div className={s.platformCard}>
          <div className={s.platfromHeader}>
            <span>Timeouts %</span>
            <span>
              +6.4% <BsArrowUpShort />
            </span>
          </div>
          <div>
            <span className={s.descr}>1.51</span>
          </div>
        </div>
      </li>
      <li className={s.platfromItem}>
        <div className={s.platformCard}>
          <div className={s.platfromHeader}>
            <span>Spend</span>
            <span>
              -65.4% <BsArrowUpShort />
            </span>
          </div>
          <div>
            <span className={s.descr}>$ 15678.08</span>
          </div>
        </div>
      </li>
    </ul>
  );
};
