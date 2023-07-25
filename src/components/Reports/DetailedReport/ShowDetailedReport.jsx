import React from 'react';
import { useSelector } from 'react-redux';
import { selectedDetaliedReportsData } from 'redux/reports/detailedReport/detailedReportSelectors';
import s from './ShowDetailedReport.module.scss';

export const ShowDetailedReport = () => {
  const data = useSelector(selectedDetaliedReportsData);

  console.log('Data:', data);

  if (!data) {
    return <div>Please run the report to see the data</div>;
  }

  const selectedLabels = data.labels;

  const itemsToRender = selectedLabels
    .map((label, index) => ({
      label,
      dataKey: label.toLowerCase().replace(' ', '_'), // Преобразуем в ключ в нижний регистр и заменяем пробелы на подчеркивания
      unit: label === 'Spend' ? '$' : '', // Если метка "Spend", то добавляем знак доллара, иначе пустая строка
      isChecked: data.isChecked[index] === 'true', // Флаг, указывающий, выбрана ли данная метка для отображения
    }))
    .filter(item => item.isChecked);

  // Проверяем, что хотя бы одна колонка выбрана и itemsToRender не пустой
  const atLeastOneLabelChecked = itemsToRender.length > 0;

  // Если нет выбранных колонок для отображения, выводим сообщение с просьбой выбрать хотя бы одну колонку
  if (!atLeastOneLabelChecked) {
    return <div>Please select at least one column to display.</div>;
  }

  return (
    <ul
      className={s.platformList}
      style={{
        listStyle: 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      {itemsToRender.map(item => (
        <li className={s.platformItem} key={item.label}>
          <div className={s.platformCard}>
            <div className={s.platformHeader}>
              <span>{item.label}:</span>
              <span className={s.descr}>
                {item.unit} {data[item.dataKey]}
              </span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
