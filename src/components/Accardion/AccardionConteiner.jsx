import React, { useState } from 'react';
import s from './AccardionConteiner.module.scss';

export const AccordionContainer = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleAccordionClick = index => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={s.accardionWraper}>
      {React.Children.map(children, (child, index) => {
        return React.cloneElement(child, {
          activeIndex,
          handleAccordionClick: () => handleAccordionClick(index),
        });
      })}
    </div>
  );
};
