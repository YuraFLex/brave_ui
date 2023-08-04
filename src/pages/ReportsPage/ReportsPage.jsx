import { Accordion } from 'components/Accardion/Accardion';
import { AccordionContainer } from 'components/Accardion/AccardionConteiner';
import { SummaryReports } from 'components/Reports/SummaryReport/SummaryReports';
import { Wraper } from 'components/Wraper/Wraper';
import { ShowSummaryReports } from 'components/Reports/SummaryReport/ShowSummaryReports';
import { DetailedReport } from 'components/Reports/DetailedReport/DetailedReport';
import { ShowDetailedReport } from 'components/Reports/DetailedReport/ShowDetailedReport';

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
          <Accordion title={'Detailed Reports'} defaultOpen={true}>
            <DetailedReport />
          </Accordion>

          <Accordion title={'Report'}>
            <ShowDetailedReport />
          </Accordion>
        </AccordionContainer>
      </Wraper>
    </>
  );
};
