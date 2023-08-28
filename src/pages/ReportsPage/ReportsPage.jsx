import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

import { Wraper } from 'components/Wraper/Wraper';
import { SummaryReports } from 'components/Reports/SummaryReport/SummaryReports';
import { ShowSummaryReports } from 'components/Reports/SummaryReport/ShowSummaryReports';
import { DetailedReport } from 'components/Reports/DetailedReport/DetailedReport';
import { ShowDetailedReport } from 'components/Reports/DetailedReport/ShowDetailedReport';
import { BiRightArrow } from 'react-icons/bi';

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

export const ReportsPage = () => {
  const [expanded, setExpanded] = useState(['panel1', 'panel3']);

  const handleChange = panel => (event, newExpanded) => {
    setExpanded(
      newExpanded ? [...expanded, panel] : expanded.filter(p => p !== panel)
    );
  };

  const handleSummaryReportsExpand = () => {
    setExpanded([...expanded, 'panel2']);
  };

  const handleDetaliedReportsExpand = () => {
    setExpanded([...expanded, 'panel4']);
  };

  return (
    <Wraper>
      <Accordion
        expanded={expanded.includes('panel1')}
        onChange={handleChange('panel1')}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <h4>Summary Reports</h4>
        </AccordionSummary>
        <AccordionDetails>
          <SummaryReports onExpand={handleSummaryReportsExpand} />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded.includes('panel2')}
        onChange={handleChange('panel2')}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <h4>Report</h4>
        </AccordionSummary>
        <AccordionDetails>
          <ShowSummaryReports />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded.includes('panel3')}
        onChange={handleChange('panel3')}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <h4>Detalied Reports</h4>
        </AccordionSummary>
        <AccordionDetails>
          <DetailedReport onExpand={handleDetaliedReportsExpand} />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded.includes('panel4')}
        onChange={handleChange('panel4')}
      >
        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
          <h4>Report</h4>
        </AccordionSummary>
        <AccordionDetails>
          <ShowDetailedReport />
        </AccordionDetails>
      </Accordion>
    </Wraper>
  );
};
