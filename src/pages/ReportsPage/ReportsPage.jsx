import { Accordion } from 'components/Accardion/Accardion';
import { AccordionContainer } from 'components/Accardion/AccardionConteiner';
import { AdjustTable } from 'components/Reports/SummaryReport/AdjustTable';
import { ReportSetting } from 'components/Reports/SummaryReport/ReportSetting';
import { Wraper } from 'components/Wraper/Wraper';

export const ReportsPage = () => {
  return (
    <>
      <Wraper>
        <h2>Summary Reports</h2>
        <AccordionContainer>
          <Accordion title={'Report Settings'} defaultOpen={true}>
            <ReportSetting />
          </Accordion>
          <Accordion title={'Adjust Table'} defaultOpen={true}>
            <AdjustTable />
          </Accordion>
          <Accordion title={'Report'}>
            <h1>Report</h1>
          </Accordion>
        </AccordionContainer>
      </Wraper>
    </>
  );
};
