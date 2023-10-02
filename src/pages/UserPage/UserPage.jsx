import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { useState } from 'react';

import { ChangeUserPassword } from 'components/ChangeUserPassword/ChangeUserPassword';
import { UserInfo } from 'components/UserInfo/UserInfo';
import { Wraper } from 'components/Wraper/Wraper';
import { BiRightArrow } from 'react-icons/bi';
// import { ThemeChanger } from 'components/ThemeChanger/ThemeChanger';
// import { useSelector } from 'react-redux';

const Accordion = styled(props => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled(props => (
  <MuiAccordionSummary expandIcon={<BiRightArrow />} {...props} />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

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

      {/* <Accordion
        style={{
          backgroundColor: theme === 'dark' ? '#3d266eb1' : '#fff',
          color: theme === 'dark' ? '#e1b0f3' : '#000',
          transition: 'background-color 0.5s linear, color 0.5s linear',
        }}
        expanded={expanded.includes('panel3')}
        onChange={handleChange('panel3')}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <h4>Custom Setting</h4>
        </AccordionSummary>
        <AccordionDetails>
          <ThemeChanger />
        </AccordionDetails>
      </Accordion> */}
    </Wraper>
  );
};
