import React from 'react';
import { Wraper } from 'components/Wraper/Wraper';
import { Statistics } from 'components/Statistics/Statistics';
import { StatisticsFilter } from 'components/Statistics/StatisticsFilter';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Flip } from 'react-toastify';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AccordionWrapper,
} from 'pages/constans';

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
        <ToastContainer transition={Flip} />
        <StatisticsFilter />
        <AccordionWrapper>
          <Accordion
            expanded={expanded.includes('panel1')}
            onChange={handleChange('panel1')}
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <h4>Platform Activity</h4>
            </AccordionSummary>
            <AccordionDetails>
              <Statistics />
            </AccordionDetails>
          </Accordion>
        </AccordionWrapper>
      </Wraper>
    </>
  );
};
