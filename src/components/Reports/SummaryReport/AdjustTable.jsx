import { useState } from 'react';

import s from './AdjustTable.module.scss';

export const AdjustTable = () => {
  const [checkedItems, setCheckedItems] = useState({});

  const handleChangeColumns = label => {
    setCheckedItems(prevCheckedItems => ({
      ...prevCheckedItems,
      [label]: !prevCheckedItems[label],
    }));
  };

  const handleSelectAll = () => {
    const newCheckedItems = {};
    columsLabel.forEach(label => {
      newCheckedItems[label] = true;
    });
    setCheckedItems(newCheckedItems);
  };

  const handleDeleteAll = () => {
    setCheckedItems({});
  };

  const columsLabel = [
    'Endpoint',
    'Spend',
    'Win Rate %',
    'Impressions',
    'Requests',
    'Responses',
    'Gross Point',
    'Timeouts',
    'Timeouts %',
    'Errors',
    'Broken Ads',
    'Blocks',
  ];

  return (
    <div className={s.AdjustTableConrainer}>
      <h4>Columns</h4>
      <ul className={s.AdjustTableList}>
        {columsLabel.map(label => (
          <li key={label}>
            <input
              type="checkbox"
              checked={!!checkedItems[label]}
              onChange={() => handleChangeColumns(label)}
            />
            <label>{label}</label>
          </li>
        ))}
      </ul>

      <div>
        <button type="button" onClick={handleSelectAll}>
          Select All
        </button>
        <button type="button" onClick={handleDeleteAll}>
          Delete All
        </button>
      </div>
    </div>
  );
};
