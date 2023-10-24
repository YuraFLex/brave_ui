import { useState } from 'react';
import { ChangeUserPassword } from 'components/ChangeUserPassword/ChangeUserPassword';
import { UserInfo } from 'components/UserInfo/UserInfo';
import { Wraper } from 'components/Wraper/Wraper';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AccordionWrapper,
} from 'pages/constans';

export const UserPage = () => {
  const [expanded, setExpanded] = useState(['panel1']);
  // const theme = useSelector(state => state.theme);

  const handleChange = panel => (event, newExpanded) => {
    setExpanded(
      newExpanded ? [...expanded, panel] : expanded.filter(p => p !== panel)
    );
  };
  return (
    <Wraper>
      <AccordionWrapper>
        <Accordion
          expanded={expanded.includes('panel1')}
          onChange={handleChange('panel1')}
        >
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <h4>User Info</h4>
          </AccordionSummary>
          <AccordionDetails>
            <UserInfo />
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expanded.includes('panel2')}
          onChange={handleChange('panel2')}
        >
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <h4>Change password</h4>
          </AccordionSummary>
          <AccordionDetails>
            <ChangeUserPassword />
          </AccordionDetails>
        </Accordion>
      </AccordionWrapper>
    </Wraper>
  );
};
