import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { fetchStatistics } from 'redux/statistics/statisticsOperations';
import DatePicker from 'react-datepicker';
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
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { fetchCahrtData } from 'redux/chart/chartOperation';
import { statPeriod } from 'redux/statistics/statPeriodSlice';
import { changeItem } from 'redux/statistics/itemSlice';

export const StatisticsFilter = () => {
  const [isPeriod, setIsPeriod] = useState('today');
  const [isEndpoint, setIsEndpoint] = useState('all');
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const dispatch = useDispatch();
  const id = useSelector(userPartnerId);
  const type = useSelector(userType);
  const isLoading = useSelector(statisticsIsLoading);
  const list = useSelector(endPointList);

  const positionRef = useRef({
    x: 0,
    y: 0,
  });
  const popperRef = useRef(null);
  const areaRef = useRef(null);

  const handleMouseMove = event => {
    positionRef.current = { x: event.clientX, y: event.clientY };

    if (popperRef.current != null) {
      popperRef.current.update();
    }
  };

  useEffect(() => {
    dispatch(statPeriod('today'));
  }, [dispatch]);

  useEffect(() => {
    const ChartData = {
      partnerId: id,
      type,
      period: 'today',
      endPoint: 'all',
    };
    dispatch(fetchCahrtData(ChartData));
  }, [dispatch, id, type]);

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

    const data = {
      partnerId: id,
      type,
      endPoint: isEndpoint,
      period: isPeriod,
      startDate: startDateUTC ? startDateUTC.toISOString() : null,
      endDate: endDateUTC ? endDateUTC.toISOString() : null,
    };

    const ChartData = {
      partnerId: id,
      type,
      period: isPeriod,
      endPoint: isEndpoint,
      startDate: startDateUTC ? startDateUTC.toISOString() : null,
      endDate: endDateUTC ? endDateUTC.toISOString() : null,
    };

    dispatch(fetchStatistics(data));
    dispatch(fetchCahrtData(ChartData));
    dispatch(statPeriod(isPeriod));
    dispatch(changeItem('spending'));
    // console.log('данные отправленные на сервер:', data);
  };

  return (
    <div className={s.StatisticsFilterBox}>
      {isLoading && <BraveLogo message={'Loading Platform Activity...'} />}
      <form className={s.StatisticsFilterForm} onSubmit={handleSubmit}>
        <p>Period:</p>
        <FormControl style={{ width: '300px' }}>
          <Select value={isPeriod} onChange={handleChangePeriod}>
            <MenuItem value="today">Today</MenuItem>
            <MenuItem value="yesterday">Yesterday</MenuItem>
            <MenuItem value="lastweek">Last 7 Days</MenuItem>
            <MenuItem value="thismonth">This Month</MenuItem>
            <MenuItem value="lastmonth">Last Month</MenuItem>
            <MenuItem value="custom">Custom</MenuItem>
          </Select>
        </FormControl>
        <div className={s.StatisticsFilterDatePickerContainer}>
          <p className={s.StatisticsFilterDatePickerLabel}>From/To:</p>
          <DatePicker
            className={s.StatisticsFilterDatePicker}
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
              isPeriod === 'custom' ? 'DD/MM/YYYY' : 'Select period custom'
            }
            disabled={isPeriod === 'custom' ? false : true}
          />
        </div>

        {type === 'DSP' ? (
          <>
            <p className={s.StatisticsFilterDatePickerLabel}>EP URL:</p>
            <FormControl style={{ width: '300px' }}>
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
            <FormControl style={{ width: '300px' }}>
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
        <Tooltip
          title="Update data"
          placement="top"
          arrow
          PopperProps={{
            popperRef,
            anchorEl: {
              getBoundingClientRect: () => {
                return new DOMRect(
                  positionRef.current.x,
                  areaRef.current.getBoundingClientRect().y,
                  0,
                  0
                );
              },
            },
          }}
        >
          <Button
            variant="contained"
            style={{ backgroundColor: '#0099fa' }}
            type="submit"
            ref={areaRef}
            onMouseMove={handleMouseMove}
          >
            <FaSync />
          </Button>
        </Tooltip>
      </form>
    </div>
  );
};
