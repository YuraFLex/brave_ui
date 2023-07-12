import React from 'react';
import { useSelector } from 'react-redux';
import s from '../../Statistics/Statistics.module.scss';
import { selectedSummaryReportsData } from 'redux/reports/summaryReports/summaryReportsSelectors';

export const ShowSummaryReports = () => {
  const data = useSelector(selectedSummaryReportsData);

  if (!data) {
    return <div>Please Run the report to see the data</div>;
  }

  const selectedLabels = data.labels;

  const itemsToRender = [
    { label: 'Spend', dataKey: 'spend', unit: '$' },
    { label: 'Win Rate %', dataKey: 'win_rate', unit: '%' },
    { label: 'Impressions', dataKey: 'impressions' },
    { label: 'Requests', dataKey: 'requests' },
    { label: 'Responses', dataKey: 'responses' },
    { label: 'Gross Point', dataKey: 'gross_point' },
    { label: 'Timeouts', dataKey: 'timeouts' },
  ].filter(item => selectedLabels.includes(item.label));

  return (
    <ul className={s.platfromList}>
      {itemsToRender.map((item, index) => (
        <li className={s.platfromItem} key={index}>
          <div className={s.platformCard}>
            <div className={s.platfromHeader}>
              <span>{item.label}:</span>
              <span className={s.descr}>
                {data[item.dataKey]} {item.unit}
              </span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
