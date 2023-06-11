import { Accordion } from 'components/Accardion/Accardion';
import { AccordionContainer } from 'components/Accardion/AccardionConteiner';
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
        </AccordionContainer>
      </Wraper>
    </>
  );
};
