import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button } from 'components/Button/Button';
import { fetchSummaryReports } from 'redux/reports/summaryReports/summaryReportsOperations';
import { selectUserPartnerId, selectUserType } from 'redux/auth/authSelectors';
import {
  selectedSummaryReportsData,
  selectedSummaryReportsIsLoading,
} from 'redux/reports/summaryReports/summaryReportsSelectors';
import s from './SummaryReports.module.scss';
import { LoaderBrave } from 'components/Loader/Loader';
import { selectIsEndPointList } from 'redux/endPoints/endPointSelectors';

export const SummaryReports = () => {
  const [isDisplay, setIsDisplay] = useState('day');
  const [isPeriod, setIsPeriod] = useState('today');
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [endPointUrl, setEndPointUrl] = useState('all');
  const [checkedItems, setCheckedItems] = useState({
    Spend: true,
    Impressions: true,
    Requests: true,
  });

  const dispatch = useDispatch();
  const id = useSelector(selectUserPartnerId);
  const type = useSelector(selectUserType);
  const isLoading = useSelector(selectedSummaryReportsIsLoading);
  const summaryReportsData = useSelector(selectedSummaryReportsData);
  const EPUList = useSelector(selectIsEndPointList);

  console.log('summaryReportsData:', summaryReportsData);

  function handleChangePeriod(e) {
    setIsPeriod(e.target.value);
  }

  const handleChangeDisplay = e => {
    setIsDisplay(e.target.value);
  };

  const handleStartDateChange = date => {
    setSelectedStartDate(date);
  };

  const handleEndDateChange = date => {
    setSelectedEndDate(date);
  };

  const handleChangeEndPoint = e => {
    setEndPointUrl(e.target.value);
  };

  const handleChangeColumns = label => {
    setCheckedItems(prevCheckedItems => {
      const updatedCheckedItems = { ...prevCheckedItems };
      updatedCheckedItems[label] = !updatedCheckedItems[label];
      return updatedCheckedItems;
    });
  };

  const handleSelectAll = () => {
    const newCheckedItems = {};
    columsLabel.forEach(label => {
      newCheckedItems[label] = true;
    });
    setCheckedItems(newCheckedItems);
  };

  const handleDeleteAll = () => {
    setCheckedItems(prevCheckedItems => {
      const updatedCheckedItems = {};
      Object.keys(prevCheckedItems).forEach(label => {
        updatedCheckedItems[label] = false;
      });
      return updatedCheckedItems;
    });
  };

  const columsLabel = [
    'Spend',
    'Win Rate %',
    'Requests',
    'Responses',
    'Impressions',
    'Timeouts',
    'Timeouts %',
  ];

  const handleSubmit = e => {
    e.preventDefault();

    const labels = Object.keys(checkedItems);
    const isChecked = Object.values(checkedItems);

    const data = {
      partner_id: id,
      type: type,
      displayBy: isDisplay,
      period: isPeriod,
      startDate: selectedStartDate,
      endDate: selectedEndDate,
      endPointUrl: endPointUrl,
      checkedItems: { labels, isChecked },
    };

    dispatch(fetchSummaryReports(data));
    console.log('Data to server:', data);
  };

  if (isLoading) {
    return <LoaderBrave />;
  }

  return (
    <>
      <form className={s.ReportSettingForm} onSubmit={handleSubmit}>
        <div className={s.ReportSettingContainer}>
          <div className={s.ReportSettingInner}>
            <div className={s.ReportSettingFilterBox}>
              <h4>Select Period:</h4>
              <select
                className={s.ReportSettingSelect}
                value={isPeriod}
                onChange={handleChangePeriod}
              >
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="lastweek">Last 7 Days</option>
                <option value="thismonth">This Month</option>
                <option value="lastmonth">Last Month</option>
                <option value="custom">Custom</option>
              </select>

              {isPeriod === 'custom' && (
                <div className={s.DatePicker}>
                  <h4>Start Date:</h4>
                  <DatePicker
                    selected={selectedStartDate}
                    onChange={handleStartDateChange}
                    className={s.ReportSettingDatePicker}
                    placeholderText="Select Start Date"
                    selectsStart
                    startDate={selectedStartDate}
                    endDate={selectedEndDate}
                    dateFormat="dd/MM/yyyy"
                  />
                  <h4>End Date:</h4>
                  <DatePicker
                    selected={selectedEndDate}
                    onChange={handleEndDateChange}
                    className={s.ReportSettingDatePicker}
                    placeholderText="Select End Date"
                    selectsEnd
                    startDate={selectedStartDate}
                    endDate={selectedEndDate}
                    minDate={selectedStartDate}
                    dateFormat="dd/MM/yyyy"
                  />
                </div>
              )}
            </div>

            <div className={s.ReportSettingFilterBox}>
              <h4>Display by:</h4>
              <select
                className={s.ReportSettingSelect}
                value={isDisplay}
                onChange={handleChangeDisplay}
              >
                <option value="hour">Hour</option>
                <option value="day">Day</option>
                <option value="month">Month</option>
                <option value="year">Year</option>
              </select>
            </div>
          </div>

          <div className={s.ReportSettingInner}>
            <div className={s.ReportSettingFilterBox}>
              {type === 'DSP' ? (
                <>
                  <h4>EP URL:</h4>
                  <select
                    className={s.ReportSettingSelect}
                    value={endPointUrl}
                    onChange={handleChangeEndPoint}
                  >
                    <option value="all">Company</option>
                    {EPUList &&
                      EPUList.map(({ id, point }) => (
                        <option key={id} value={id}>
                          {point}
                        </option>
                      ))}
                  </select>
                </>
              ) : (
                ''
              )}
            </div>
          </div>

          <div className={s.ReportSettingInner}>
            <h4 className={s.ReportSettingTitle}>Columns</h4>
            <ul className={s.ReportSettingList}>
              {columsLabel.map(label => (
                <li className={s.ReportSettingItem} key={label}>
                  <input
                    type="checkbox"
                    checked={!!checkedItems[label]}
                    onChange={() => handleChangeColumns(label)}
                  />
                  <label className={s.ReportSettingLabel}>{label}</label>

                  <div className={s.SummaryReportsCheckmark}></div>
                </li>
              ))}
            </ul>

            <div className={s.ReportSettingBtnBox}>
              <button
                className={s.ReportSettingTableBtn}
                type="button"
                onClick={handleSelectAll}
              >
                Select All
              </button>
              <button
                className={s.ReportSettingTableBtn}
                type="button"
                onClick={handleDeleteAll}
              >
                Delete All
              </button>
            </div>
          </div>
        </div>

        <Button type="submit" text="Run Report" />
      </form>
    </>
  );
};
