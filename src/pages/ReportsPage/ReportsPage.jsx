import { Accordion } from 'components/Accardion/Accardion';
import { AccordionContainer } from 'components/Accardion/AccardionConteiner';
import { SummaryReports } from 'components/Reports/SummaryReport/SummaryReports';
import { Wraper } from 'components/Wraper/Wraper';
import { ShowSummaryReports } from 'components/Reports/SummaryReport/ShowSummaryReports';

export const ReportsPage = () => {
  return (
    <>
      <Wraper>
        <AccordionContainer>
          <Accordion title={'Summary Reports'} defaultOpen={true}>
            <SummaryReports />
          </Accordion>

          <Accordion title={'Report'}>
            <ShowSummaryReports />
          </Accordion>
        </AccordionContainer>
        <AccordionContainer>
          <Accordion title={'Detailed Reports'}>
            <h3>Comming soon...</h3>
            {/* <SummaryReports /> */}
          </Accordion>

          <Accordion title={'Report'}>
            <h3>Comming soon...</h3>
            {/* <ShowSummaryReports /> */}
          </Accordion>
        </AccordionContainer>
      </Wraper>
    </>
  );
};
