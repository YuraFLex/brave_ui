import { useSelector } from 'react-redux';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { selectIsEndPointList } from 'redux/endPoints/endPointSelectors';

import { Button } from 'components/Button/Button';

import s from './ReportSetting.module.scss';

export const ReportSetting = () => {
  const [isSummary, setIsSummary] = useState('endpoint');
  const [isDisplay, setIsDisplay] = useState('day');
  const [isPeriod, setIsPeriod] = useState('today');
  const [isEndpoint, setIsEndpoint] = useState('all');
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const list = useSelector(selectIsEndPointList);

  const handleChangeSummary = e => {
    setIsSummary(e.target.value);
  };

  const handleChangeDisplay = e => {
    setIsDisplay(e.target.value);
  };

  function handleChangePeriod(e) {
    setIsPeriod(e.target.value);
  }

  const handleChangEndpoint = e => {
    setIsEndpoint(e.target.value);
  };

  const handleStartDateChange = date => {
    setSelectedStartDate(date);
  };

  const handleEndDateChange = date => {
    setSelectedEndDate(date);
  };

  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <>
      <form className={s.ReportSettingForm} onSubmit={handleSubmit}>
        <div className={s.ReportSettingContainer}>
          <div>
            <h4>Summary by</h4>
            <select value={isSummary} onChange={handleChangeSummary}>
              <option value="endpoint">Endpoint</option>
              <option value="company">Company</option>
              <option value="endpoint_in_company">Endpoint in company</option>
            </select>

            <h4>Display by</h4>
            <select value={isDisplay} onChange={handleChangeDisplay}>
              <option value="day">Day</option>
              <option value="hour">Hour</option>
              <option value="month">Month</option>
              <option value="year">Year</option>
            </select>
          </div>

          <div>
            <h4>Select Period</h4>
            <select value={isPeriod} onChange={handleChangePeriod}>
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="lastweek">Last Week</option>
              <option value="lastmonth">Last Month</option>
              <option value="custom">Custom</option>
            </select>

            {isPeriod === 'custom' && (
              <div>
                <p>Start Date:</p>
                <DatePicker
                  selected={selectedStartDate}
                  onChange={handleStartDateChange}
                  // className={s.StatisticsFilterDatePicker}
                  placeholderText="Select Start Date"
                  selectsStart
                  startDate={selectedStartDate}
                  endDate={selectedEndDate}
                  dateFormat="dd/MM/yyyy"
                />
                <p>End Date:</p>
                <DatePicker
                  selected={selectedEndDate}
                  onChange={handleEndDateChange}
                  // className={s.StatisticsFilterDatePicker}
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

          <div>
            <h4>End Point</h4>

            <select value={isEndpoint} onChange={handleChangEndpoint}>
              <option value="all">All</option>
              {list &&
                list.map(({ id, name }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <Button type="submit" text="Run Report" />
      </form>
    </>
  );
};
