import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { fetchSummaryReports } from 'redux/reports/summaryReports/summaryReportsOperations';
import { userPartnerId, userType } from 'redux/auth/authSelectors';
import { summaryReportsIsLoading } from 'redux/reports/summaryReports/summaryReportsSelectors';
import s from './SummaryReports.module.scss';
import { BraveLogo } from 'components/Loader/Loader';
import { endPointList } from 'redux/endPoints/endPointSelectors';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

import '../../../index.css';

export const SummaryReports = ({ onExpand }) => {
  const [isDisplay, setIsDisplay] = useState('day');
  const [isPeriod, setIsPeriod] = useState('today');
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
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

  const handleChangeEndPoint = e => {
    setEndPointUrl(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    let startDateUTC = startDate;
    let endDateUTC = endDate;

    if (startDate && endDate) {
      startDateUTC = new Date(
        startDate.getTime() - startDate.getTimezoneOffset() * 60000
      );
      endDateUTC = new Date(
        endDate.getTime() - endDate.getTimezoneOffset() * 60000
      );
    }

    const summaryData = {
      partner_id: id,
      type: type,
      displayBy: isDisplay,
      period: isPeriod,
      startDate: startDateUTC ? startDateUTC.toISOString() : null,
      endDate: endDateUTC ? endDateUTC.toISOString() : null,
      endPointUrl: endPointUrl,
    };

    dispatch(fetchSummaryReports(summaryData));
    // console.log('Data to server:', data);
    onExpand();
  };

  return (
    <div>
      {isLoading && <BraveLogo message={'Your report is loading...'} />}
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
              <div className={s.DatePicker}>
                <h4>From/To:</h4>
                <DatePicker
                  className={s.ReportSettingDatePicker}
                  selectsRange={true}
                  startDate={isPeriod === 'custom' ? startDate : null}
                  endDate={isPeriod === 'custom' ? endDate : null}
                  onChange={update => {
                    setDateRange(update);
                  }}
                  isClearable={true}
                  monthsShown={2}
                  dateFormat="dd/MM/yyyy"
                  placeholderText={
                    isPeriod === 'custom'
                      ? 'DD/MM/YYYY'
                      : 'Select period custom'
                  }
                  disabled={isPeriod === 'custom' ? false : true}
                />
              </div>
            </div>

            <div className={s.ReportSettingFilterBox}>
              <h4>Display by:</h4>
              <FormControl fullWidth>
                <Select value={isDisplay} onChange={handleChangeDisplay}>
                  <MenuItem value="hour">Hour</MenuItem>
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

        {/* <Button type="submit" text="Run Report" /> */}
        <Button
          style={{
            maxWidth: '250px',
            width: '100%',
            margin: '0 auto',
            backgroundColor: '#0099fa',
          }}
          variant="contained"
          type="submit"
        >
          {' '}
          Run Report
        </Button>
      </form>
    </div>
  );
};
