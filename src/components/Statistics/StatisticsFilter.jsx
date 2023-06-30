import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchStatistics } from 'redux/statistics/statisticsOperations';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { RxUpdate } from 'react-icons/rx';
import s from './StatisticsFilter.module.scss';
import { selectUserPartnerId, selectUserType } from 'redux/auth/authSelectors';
import { selectIsLoadingStatistics } from 'redux/statistics/statisticsSelectors';
import { LoaderNew } from 'components/Loader/Loader';
import { fetchEndPoint } from 'redux/endPoints/endPointOperations';
import { selectIsEndPointList } from 'redux/endPoints/endPointSelectors';

export const StatisticsFilter = () => {
  const [isPeriod, setIsPeriod] = useState('');
  const [isEndpoint, setIsEndpoint] = useState('');
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const dispatch = useDispatch();
  const id = useSelector(selectUserPartnerId);
  const type = useSelector(selectUserType);
  const isLoading = useSelector(selectIsLoadingStatistics);
  const list = useSelector(selectIsEndPointList);

  useEffect(() => {
    dispatch(fetchStatistics({ partnerId: id, type }));
  }, [dispatch, id, type]);

  useEffect(() => {
    dispatch(fetchEndPoint({ partnerId: id, type }));
  }, [dispatch, id, type]);

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

  const convertToUnixtime = date => {
    const currentDate = new Date();
    let convertedDate = null;

    switch (date) {
      case 'yesterday':
        currentDate.setDate(currentDate.getDate() - 1);
        convertedDate = Math.floor(currentDate.getTime() / 1000);
        break;
      case 'lastweek':
        currentDate.setDate(currentDate.getDate() - 7);
        convertedDate = Math.floor(currentDate.getTime() / 1000);
        break;
      case 'lastmonth':
        currentDate.setMonth(currentDate.getMonth() - 1);
        convertedDate = Math.floor(currentDate.getTime() / 1000);
        break;
      default:
        break;
    }

    return convertedDate;
  };

  const handleSubmit = e => {
    e.preventDefault();

    const startDateUnix = selectedStartDate
      ? Math.floor(selectedStartDate.getTime() / 1000)
      : null;
    const endDateUnix = selectedEndDate
      ? Math.floor(selectedEndDate.getTime() / 1000)
      : null;

    const periodUnix = convertToUnixtime(isPeriod);

    const data = {
      partnerId: id,
      type,
      endPoint: isEndpoint || 'all',
      period: periodUnix,
      startDate: startDateUnix,
      endDate: endDateUnix,
    };

    dispatch(fetchStatistics(data));
    console.log('данные отправленные на сервер:', data);
    setIsPeriod('');
    setIsEndpoint('');
    setSelectedStartDate(null);
    setSelectedEndDate(null);
  };

  if (isLoading) {
    return <LoaderNew />;
  }

  return (
    <div className={s.StatisticsFilterBox}>
      <form className={s.StatisticsFilterForm} onSubmit={handleSubmit}>
        <select
          className={s.StatisticsFilterSelect}
          value={isPeriod}
          onChange={handleChangePeriod}
        >
          <option value="today">Today</option>
          <option value="yesterday">Yesterday</option>
          <option value="lastweek">Last Week</option>
          <option value="lastmonth">Last Month</option>
          <option value="custom">Custom</option>
        </select>

        {isPeriod === 'custom' && (
          <div className={s.StatisticsFilterDatePickerContainer}>
            <div className={s.StatisticsFilterDatePickerLabel}>Start Date:</div>
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
            <div className={s.StatisticsFilterDatePickerLabel}>End Date:</div>
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

        <select
          className={s.StatisticsFilterSelect}
          value={isEndpoint}
          onChange={handleChangEndpoint}
        >
          <option value="all">All</option>
          {list.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>

        <button className={s.StatisticsFilterBtnSubmit} type="submit">
          <RxUpdate />
        </button>
      </form>
    </div>
  );
};
