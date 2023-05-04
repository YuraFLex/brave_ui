import { Accordion } from 'components/Accardion/Accardion';
import { AccordionContainer } from 'components/Accardion/AccardionConteiner';
import { Wraper } from 'components/Wraper/Wraper';
import { useEffect } from 'react';
import { fetchDsp } from 'api/api';

import s from './DashBoardPage.module.scss';

export const DashBoardPage = () => {
  useEffect(() => {
    async function fetchData() {
      const dsp = await fetchDsp();
      console.log(dsp);
    }

    fetchData();
  }, []);
  return (
    <>
      <Wraper>
        <AccordionContainer>
          <Accordion title={'Platform Activity'}>
            <ul className={s.platfromList}>
              <li className={s.platfromItem}>
                <div className={s.platformCard}>
                  <div className={s.platfromHeader}>
                    <span>Bid Requests</span>
                    <span>+64.4%</span>
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
                    <span>+64.4%</span>
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
                    <span>+64.4%</span>
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
                    <span>+6.4%</span>
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
                    <span>+6.4%</span>
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
                    <span>-65.4%</span>
                  </div>
                  <div>
                    <span className={s.descr}>$ 15678.08</span>
                  </div>
                </div>
              </li>
            </ul>
          </Accordion>
        </AccordionContainer>
      </Wraper>
    </>
  );
};
