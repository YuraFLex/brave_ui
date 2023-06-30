import { Accordion } from 'components/Accardion/Accardion';
import { AccordionContainer } from 'components/Accardion/AccardionConteiner';
import { Statistics } from 'components/Statistics/Statistics';
import { StatisticsFilter } from 'components/Statistics/StatisticsFilter';
// import { ReportsChart } from 'components/Reports/ReportsChart';
import { Wraper } from 'components/Wraper/Wraper';

export const DashBoardPage = () => {
  return (
    <>
      <Wraper>
        <StatisticsFilter />
        <AccordionContainer>
          <Accordion title={'Platform Activity'} defaultOpen={true}>
            <Statistics />
          </Accordion>
          {/* <Accordion title={'Statistics'}>
            <ReportsChart />
          </Accordion> */}
        </AccordionContainer>
      </Wraper>
    </>
  );
};
