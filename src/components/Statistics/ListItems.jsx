import React from 'react';
import s from './Statistics.module.scss';

export const ListItems = ({ label, value, active, onClick }) => {
  const renderValue = value => (value !== null ? value : 'N/A');

  return (
    <li
      className={`${s.platfromItem} ${active ? s.active : ''}`}
      onClick={onClick}
    >
      <div className={s.platformCard}>
        <div className={s.platfromHeader}>
          <span>{label}:</span>
          <span className={s.descr}>{renderValue(value)}</span>
        </div>
      </div>
    </li>
  );
};
