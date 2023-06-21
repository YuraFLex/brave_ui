import { Accordion } from 'components/Accardion/Accardion';
import { AccordionContainer } from 'components/Accardion/AccardionConteiner';
// import { ReportsChart } from 'components/Reports/ReportsChart';
import { StatisticsDspSsp } from 'components/StatisticsDspSsp/StatisticsDspSsp';
import { Wraper } from 'components/Wraper/Wraper';

export const DashBoardPage = () => {
  return (
    <>
      <Wraper>
        <AccordionContainer>
          <Accordion title={'Platform Activity'} defaultOpen={true}>
            <StatisticsDspSsp />
          </Accordion>
          {/* <Accordion title={'Statistics'}>
            <ReportsChart />
          </Accordion> */}
        </AccordionContainer>
      </Wraper>
    </>
  );
};
