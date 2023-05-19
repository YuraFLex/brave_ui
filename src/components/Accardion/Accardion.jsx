import { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

import cn from 'classnames';
import s from './Accardion.module.scss';

const icons = {
  expanded: <FaMinus />,
  collapsed: <FaPlus />,
};

export const Accordion = ({ title, children, defaultOpen = false }) => {
  const [isExpanded, setIsExpanded] = useState(defaultOpen);

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div
        className={cn(s.accardionHeader, {
          [s.accardionHeaderActive]: isExpanded,
        })}
        onClick={toggleAccordion}
      >
        <span className={s.icon}>
          {isExpanded ? icons.expanded : icons.collapsed}
        </span>
        <h3 className={s.accardionTitle}>{title}</h3>
      </div>
      {isExpanded && <div className={s.accardionContent}>{children}</div>}
    </>
  );
};
