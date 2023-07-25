import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from './SummaryReportsTable.module.scss';
import { selectedSummaryReportsData } from 'redux/reports/summaryReports/summaryReportsSelectors';
import { downloadSummaryReportsCSV } from 'redux/reports/summaryReports/summaryReportsOperations';

export const ShowSummaryReports = () => {
  const data = useSelector(selectedSummaryReportsData);

  console.log('ReportsData:', data);

  const dispatch = useDispatch();

  if (!data) {
    return <div>Please run the report to see the data</div>;
  }

  const selectedLabels = data.labels;

  const itemsToRender = [
    { label: 'Spend', dataKey: 'spend', unit: '$' },
    { label: 'Win Rate %', dataKey: 'win_rate', unit: '%' },
    { label: 'Requests', dataKey: 'requests', unit: '' },
    { label: 'Responses', dataKey: 'responses', unit: '' },
    { label: 'Impressions', dataKey: 'impressions', unit: '' },
    { label: 'Timeouts', dataKey: 'timeouts', unit: '' },
    { label: 'Timeouts %', dataKey: 'time_outs', unit: '%' },
  ].filter(
    item =>
      selectedLabels.includes(item.label) &&
      data.isChecked[selectedLabels.indexOf(item.label)] === 'true'
  );

  if (data.time_interval && data.time_interval.length > 0) {
    itemsToRender.unshift({
      label: 'Date',
      dataKey: 'time_interval',
      unit: '',
    });
  }

  const periodToday =
    (data.period === 'today' || data.period === 'yesterday') &&
    (data.displayBy === 'day' ||
      data.displayBy === 'month' ||
      data.displayBy === 'year') &&
    data.spend.length > 0 &&
    data.win_rate.length > 0 &&
    data.impressions.length > 0 &&
    data.requests.length > 0 &&
    data.responses.length > 0 &&
    data.timeouts.length > 0 &&
    data.time_outs.length > 0;

  // Проверяем, что хотя бы одна колонка выбрана и itemsToRender не пустой
  const atLeastOneLabelChecked = itemsToRender.some(
    item => data.isChecked[selectedLabels.indexOf(item.label)] === 'true'
  );

  // Если нет выбранных колонок для отображения, выводим сообщение с просьбой выбрать хотя бы одну колонку
  if (
    !atLeastOneLabelChecked ||
    itemsToRender.length === 0 ||
    data.isChecked === false
  ) {
    return <div>Please select at least one column to display.</div>;
  }

  const handleDownloadCsv = () => {
    const dataToSend = {
      items: itemsToRender
        .filter(
          item =>
            selectedLabels.includes(item.label) &&
            data.isChecked[selectedLabels.indexOf(item.label)] === 'true'
        )
        .map(item => ({
          label: item.label,
          data: data[item.dataKey].filter(
            (_, index) =>
              data.isChecked[selectedLabels.indexOf(item.label)] === 'true'
          ),
          unit: item.unit,
        })),
      time_interval: data.time_interval,
    };

    dispatch(downloadSummaryReportsCSV(dataToSend));
    console.log('Data to send:', dataToSend);
  };

  return periodToday ? (
    <ul className={s.platfromList}>
      {itemsToRender.map((item, index) => (
        <li className={s.platfromItem} key={index}>
          <div className={s.platformCard}>
            <div className={s.platfromHeader}>
              <span>{item.label}:</span>
              <span className={s.descr}>
                {item.unit === '$'
                  ? `${item.unit} ${
                      data[item.dataKey][data[item.dataKey].length - 1]
                    }`
                  : ''}
                {item.unit !== '$'
                  ? `${data[item.dataKey][data[item.dataKey].length - 1]}${
                      item.unit
                    }`
                  : ''}
              </span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <div className={s.ShowSummaryReportsWrapper}>
      <button
        className={s.ShowSummaryReportsDownloadBtn}
        onClick={handleDownloadCsv}
      >
        Download CSV
      </button>
      <table className={s.ShowSummaryReportsTable}>
        <thead>
          <tr>
            {itemsToRender.map(item => (
              <th key={item.label} className={s.ShowSummaryReportsTh}>
                {item.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data[itemsToRender[0].dataKey])
            ? data[itemsToRender[0].dataKey].map((_, index) => (
                <tr key={index} className={s.ShowSummaryReportsTr}>
                  {itemsToRender.map(item => (
                    <td key={item.label} className={s.ShowSummaryReportsTd}>
                      {item.unit === '$'
                        ? `${item.unit} ${data[item.dataKey][index]}`
                        : ''}
                      {item.unit !== '$'
                        ? `${data[item.dataKey][index]}${item.unit}`
                        : ''}
                    </td>
                  ))}
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
};
