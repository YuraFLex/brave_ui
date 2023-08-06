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

  const allValuesEmpty = arr => arr.every(value => value.trim() === '');

  let appBundleDataKey = allValuesEmpty(data.bundle_domain)
    ? 'site_domain'
    : 'bundle_domain';

  const itemsToRender = [
    { label: 'App Bundle', dataKey: appBundleDataKey },
    { label: 'Spend', dataKey: 'spend', unit: '$' },
    { label: 'Impressions', dataKey: 'impressions' },
    { label: 'App Name', dataKey: 'app_name' },
    { label: 'Type', dataKey: 'traffic_type' },
    { label: 'Size', dataKey: 'size' },
    { label: 'Region', dataKey: 'region' },
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

  const atLeastOneLabelChecked = itemsToRender.some(
    item => data.isChecked[selectedLabels.indexOf(item.label)] === 'true'
  );

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

  return (
    <div>
      <button
        className={s.ShowSummaryReportsDownloadBtn}
        onClick={handleDownloadCsv}
      >
        Download CSV
      </button>
      <div className={s.ShowSummaryReportsWrapper}>
        <table className={s.ShowSummaryReportsTable}>
          <thead className={s.ShowSummaryReportsTableThead}>
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
                          ? data[item.dataKey][index]
                            ? `${item.unit}${data[item.dataKey][index]}`
                            : 'N/A'
                          : data[item.dataKey][index]
                          ? data[item.dataKey][index]
                          : 'N/A'}
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
