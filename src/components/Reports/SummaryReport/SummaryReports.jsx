import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button } from 'components/Button/Button';
import { fetchSummaryReports } from 'redux/reports/summaryReports/summaryReportsOperations';
import { userPartnerId, userType } from 'redux/auth/authSelectors';
import { summaryReportsIsLoading } from 'redux/reports/summaryReports/summaryReportsSelectors';
import s from './SummaryReports.module.scss';
import { BraveLogo } from 'components/Loader/Loader';
import { endPointList } from 'redux/endPoints/endPointSelectors';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import '../../../index.css';

export const SummaryReports = ({ onExpand }) => {
  const [isDisplay, setIsDisplay] = useState('day');
  const [isPeriod, setIsPeriod] = useState('today');
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [endPointUrl, setEndPointUrl] = useState('all');

  const dispatch = useDispatch();
  const id = useSelector(userPartnerId);
  const type = useSelector(userType);
  const isLoading = useSelector(summaryReportsIsLoading);
  const EPUList = useSelector(endPointList);

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

  const handleSubmit = e => {
    e.preventDefault();

    const data = {
      partner_id: id,
      type: type,
      displayBy: isDisplay,
      period: isPeriod,
      startDate: selectedStartDate,
      endDate: selectedEndDate,
      endPointUrl: endPointUrl,
    };

    dispatch(fetchSummaryReports(data));
    // console.log('Data to server:', data);
    onExpand();
  };

  return (
    <div>
      {isLoading && <BraveLogo />}
      <form className={s.ReportSettingForm} onSubmit={handleSubmit}>
        <div className={s.ReportSettingContainer}>
          <div className={s.ReportSettingInner}>
            <div className={s.ReportSettingFilterBox}>
              <h4>Select Period:</h4>

              <FormControl fullWidth>
                <Select value={isPeriod} onChange={handleChangePeriod}>
                  <MenuItem value="today">Today</MenuItem>
                  <MenuItem value="yesterday">Yesterday</MenuItem>
                  <MenuItem value="lastweek">Last 7 Days</MenuItem>
                  <MenuItem value="thismonth">This Month</MenuItem>
                  <MenuItem value="lastmonth">Last Month</MenuItem>
                  <MenuItem value="custom">Custom</MenuItem>
                </Select>
              </FormControl>

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
              <FormControl fullWidth>
                <Select value={isDisplay} onChange={handleChangeDisplay}>
                  <MenuItem value="day">Day</MenuItem>
                  <MenuItem value="month">Month</MenuItem>
                  <MenuItem value="year">Year</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>

          <div className={s.ReportSettingInner}>
            <div className={s.ReportSettingFilterBox}>
              {type === 'DSP' ? (
                <>
                  <h4>EP URL:</h4>
                  <FormControl fullWidth>
                    <Select value={endPointUrl} onChange={handleChangeEndPoint}>
                      <MenuItem value="all">All</MenuItem>
                      {EPUList &&
                        EPUList.map(({ id, point }) => (
                          <MenuItem key={id} value={id}>
                            {point}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </>
              ) : (
                <>
                  <h4>EP URL:</h4>
                  <FormControl fullWidth>
                    <Select value={endPointUrl} onChange={handleChangeEndPoint}>
                      <MenuItem value="all">All</MenuItem>
                      {EPUList &&
                        EPUList.map(({ id, pass }) => (
                          <MenuItem key={id} value={id}>
                            {pass}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </>
              )}
            </div>
          </div>
        </div>

        <Button type="submit" text="Run Report" />
      </form>
    </div>
  );
};
