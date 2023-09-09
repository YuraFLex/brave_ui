import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchStatistics } from 'redux/statistics/statisticsOperations';
import DatePicker from 'react-datepicker';
// import { RxUpdate } from 'react-icons/rx';
import s from './StatisticsFilter.module.scss';
import { userPartnerId, userType } from 'redux/auth/authSelectors';
import { statisticsIsLoading } from 'redux/statistics/statisticsSelectors';
import { BraveLogo } from 'components/Loader/Loader';
import { fetchEndPoint } from 'redux/endPoints/endPointOperations';
import { endPointList } from 'redux/endPoints/endPointSelectors';
import { FaSync } from 'react-icons/fa';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export const StatisticsFilter = () => {
  const [isPeriod, setIsPeriod] = useState('today');
  const [isEndpoint, setIsEndpoint] = useState('all');
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const dispatch = useDispatch();
  const id = useSelector(userPartnerId);
  const type = useSelector(userType);
  const isLoading = useSelector(statisticsIsLoading);
  const list = useSelector(endPointList);

  useEffect(() => {
    dispatch(fetchStatistics({ partnerId: id, type, period: 'today' }));
  }, [dispatch, id, type]);

  useEffect(() => {
    dispatch(fetchEndPoint({ partnerId: id, type }));
  }, [dispatch, id, type]);

  function handleChangePeriod(e) {
    setIsPeriod(e.target.value);
  }

  const handleChangeEndpoint = e => {
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

    let startDateUTC = selectedStartDate;
    let endDateUTC = selectedEndDate;

    if (selectedStartDate && selectedEndDate) {
      startDateUTC = new Date(
        selectedStartDate.getTime() -
          selectedStartDate.getTimezoneOffset() * 60000
      );
      endDateUTC = new Date(
        selectedEndDate.getTime() - selectedEndDate.getTimezoneOffset() * 60000
      );
    }

    const data = {
      partnerId: id,
      type,
      endPoint: isEndpoint,
      period: isPeriod,
      startDate: startDateUTC ? startDateUTC.toISOString() : null,
      endDate: endDateUTC ? endDateUTC.toISOString() : null,
    };

    dispatch(fetchStatistics(data));
    // console.log('данные отправленные на сервер:', data);
  };

  return (
    <div className={s.StatisticsFilterBox}>
      {isLoading && <BraveLogo />}
      <form className={s.StatisticsFilterForm} onSubmit={handleSubmit}>
        <p>Period:</p>
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
          <div className={s.StatisticsFilterDatePickerContainer}>
            <p className={s.StatisticsFilterDatePickerLabel}>Start Date:</p>
            <DatePicker
              selected={selectedStartDate}
              onChange={handleStartDateChange}
              className={s.StatisticsFilterDatePicker}
              placeholderText="Select Start Date"
              selectsStart
              startDate={selectedStartDate}
              endDate={selectedEndDate}
              dateFormat="dd/MM/yyyy"
            />
            <p className={s.StatisticsFilterDatePickerLabel}>End Date:</p>
            <DatePicker
              selected={selectedEndDate}
              onChange={handleEndDateChange}
              className={s.StatisticsFilterDatePicker}
              placeholderText="Select End Date"
              selectsEnd
              startDate={selectedStartDate}
              endDate={selectedEndDate}
              minDate={selectedStartDate}
              dateFormat="dd/MM/yyyy"
            />
          </div>
        )}

        {type === 'DSP' ? (
          <>
            <p className={s.StatisticsFilterDatePickerLabel}>EP URL:</p>
            <FormControl fullWidth>
              <Select value={isEndpoint} onChange={handleChangeEndpoint}>
                <MenuItem value="all">All</MenuItem>
                {list &&
                  list.map(({ id, point }) => (
                    <MenuItem key={id} value={id}>
                      {point}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </>
        ) : (
          <>
            <p className={s.StatisticsFilterDatePickerLabel}>EP URL:</p>
            <FormControl fullWidth>
              <Select value={isEndpoint} onChange={handleChangeEndpoint}>
                <MenuItem value="all">All</MenuItem>
                {list &&
                  list.map(({ id, pass }) => (
                    <MenuItem key={id} value={id}>
                      {pass}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </>
        )}

        <button className={s.StatisticsFilterBtnSubmit} type="submit">
          <FaSync />
        </button>
      </form>
    </div>
  );
};
