import { Wraper } from 'components/Wraper/Wraper';

import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { Statistics } from 'components/Statistics/Statistics';
import { StatisticsFilter } from 'components/Statistics/StatisticsFilter';
import { useState } from 'react';
import { BiRightArrow } from 'react-icons/bi';
import { ToastContainer } from 'react-toastify';

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

export const DashBoardPage = () => {
  const [expanded, setExpanded] = useState(['panel1']);

  const handleChange = panel => (event, newExpanded) => {
    setExpanded(
      newExpanded ? [...expanded, panel] : expanded.filter(p => p !== panel)
    );
  };
  return (
    <>
      <Wraper>
        <ToastContainer />
        <StatisticsFilter />
        <Accordion
          expanded={expanded.includes('panel1')}
          onChange={handleChange('panel1')}
        >
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <h4>Platform Activity</h4>
          </AccordionSummary>
          <AccordionDetails>
            <Statistics />
          </AccordionDetails>
        </Accordion>
      </Wraper>
    </>
  );
};
