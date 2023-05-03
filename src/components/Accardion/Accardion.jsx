import { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import s from './Accardion.module.scss';

const icons = {
  expanded: <FaMinus />,
  collapsed: <FaPlus />,
};

export const Accordion = ({ title, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div className={s.accardionHeader} onClick={toggleAccordion}>
        <span className={s.icon}>
          {isExpanded ? icons.expanded : icons.collapsed}
        </span>
        <h3 className={s.accardionTitle}>{title}</h3>
      </div>
      {isExpanded && <div className={s.accardionContent}>{children}</div>}
    </>
  );
};
