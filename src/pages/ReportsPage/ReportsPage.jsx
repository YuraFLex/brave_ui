import { Accordion } from 'components/Accardion/Accardion';
import { AccordionContainer } from 'components/Accardion/AccardionConteiner';
import { Wraper } from 'components/Wraper/Wraper';

export const ReportsPage = () => {
  return (
    <>
      <Wraper>
        <AccordionContainer>
          <Accordion title={'Reports Summary'}>
            <h1>Reports info 1</h1>
          </Accordion>
          <Accordion title={'Reports Detailed'}>
            <h1>Reports info 2</h1>
          </Accordion>
        </AccordionContainer>
      </Wraper>
    </>
  );
};
