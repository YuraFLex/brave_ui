import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectedDetaliedReportsData } from 'redux/reports/detailedReport/detailedReportSelectors';
import s from './ShowDetailedReport.module.scss';
import { downloadSummaryReportsCSV } from 'redux/reports/summaryReports/summaryReportsOperations';

export const ShowDetailedReport = () => {
  const data = useSelector(selectedDetaliedReportsData);

  console.log('Detalied report data:', data);

  const dispatch = useDispatch();

  if (!data) {
    return <div>Please run the report to see the data</div>;
  }

  const selectedLabels = data.labels;

  const itemsToRender = [
    { label: 'Spend', dataKey: 'spend', unit: '$' },
    { label: 'App Name', dataKey: 'app_name' },
    { label: 'App Bundle', dataKey: 'app_bundle' },
    { label: 'Type', dataKey: 'traffic_type' },
    { label: 'Size', dataKey: 'size' },
    { label: 'Region', dataKey: 'region' },
    { label: 'Impressions', dataKey: 'impressions' },
    { label: 'Platform', dataKey: 'platform' },
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
    data.app_name.length > 0 &&
    data.app_bundle.length > 0 &&
    data.traffic_type.length > 0 &&
    data.size.length > 0 &&
    data.region.length > 0 &&
    data.impressions.length > 0 &&
    data.pub_id.length > 0;

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
    <ul className={s.ShowDetailedReportList}>
      {itemsToRender.map((item, index) => (
        <li className={s.ShowDetailedReportItem} key={index}>
          <div className={s.platformCard}>
            <div className={s.ShowDetailedReportCardHeader}>
              <span>{item.label}:</span>
              <span className={s.ShowDetailedReportDescr}>
                {item.unit === '$'
                  ? `${item.unit}${
                      data[item.dataKey][data[item.dataKey].length - 1]
                    }`
                  : ''}
                {item.unit !== '$'
                  ? `${data[item.dataKey][data[item.dataKey].length - 1]}`
                  : ''}
              </span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <div>
      <button
        className={s.ShowSummaryReportsDownloadBtn}
        onClick={handleDownloadCsv}
      >
        Download CSV
      </button>
      <div className={s.ShowSummaryReportsWrapper}>
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
                          ? `${item.unit}${data[item.dataKey][index]}`
                          : ''}
                        {item.unit !== '$'
                          ? `${data[item.dataKey][index]}`
                          : ''}
                      </td>
                    ))}
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};
