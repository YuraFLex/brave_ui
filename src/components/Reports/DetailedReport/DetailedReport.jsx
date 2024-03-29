import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { userPartnerId, userType } from 'redux/auth/authSelectors';
import { fetchSizes } from 'redux/reports/sizes/sizesOperation';
import { sizesData } from 'redux/reports/sizes/sizesSelectors';
import { endPointList } from 'redux/endPoints/endPointSelectors';
import { detaliedReportsIsLoading } from 'redux/reports/detailedReport/detailedReportSelectors';

import { BraveLogo } from 'components/Loader/Loader';
import { fetchDetailedReports } from 'redux/reports/detailedReport/detailedReportOperation';

import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

import {
  Box,
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
  Chip,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import '../../../index.css';
import s from './DetailedReport.module.scss';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = ['App Bundle', 'App Name', 'Size', 'Traffic Type'];
const values = ['appBundle', 'appName', 'size', 'trafficType'];

function getStyles(name, groupBy, theme) {
  return {
    fontWeight:
      groupBy.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export const DetailedReport = ({ onExpand }) => {
  const theme = useTheme();
  const [isDisplay, setIsDisplay] = useState('day');
  const [isPeriod, setIsPeriod] = useState('today');
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [selectedSize, setSelectedSize] = useState('allSize');
  const [selectedTrafficType, setSelectedTrafficType] = useState('allTypes');
  const [endPointUrl, setEndPointUrl] = useState('all');
  const [groupBy, setGroupBy] = useState(['appBundle']);
  const [inputValue, setInputValue] = useState('');

  const dispatch = useDispatch();
  const id = useSelector(userPartnerId);
  const type = useSelector(userType);
  const isLoading = useSelector(detaliedReportsIsLoading);
  const EPUList = useSelector(endPointList);
  const sizesList = useSelector(sizesData);
  const options = sizesList && sizesList.map(size => size.size);

  useEffect(() => {
    dispatch(fetchSizes({ partnerId: id, type }));
  }, [dispatch, id, type]);

  const handleChangeGropuBy = event => {
    const {
      target: { value },
    } = event;
    setGroupBy(typeof value === 'string' ? value.split(',') : value);
  };

  function handleChangePeriod(e) {
    setIsPeriod(e.target.value);
  }

  const handleChangeDisplay = e => {
    setIsDisplay(e.target.value);
  };

  const handleChangeTefficType = e => {
    setSelectedTrafficType(e.target.value);
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

    const defaultGroupBy = ['default'];

    const detaliedData = {
      partner_id: id,
      type: type,
      period: isPeriod,
      displayBy: isDisplay,
      groupBy: [...defaultGroupBy, ...groupBy],
      startDate: startDateUTC ? startDateUTC.toISOString() : null,
      endDate: endDateUTC ? endDateUTC.toISOString() : null,
      size: selectedSize,
      trafficType: selectedTrafficType,
      endPointUrl: endPointUrl,
    };

    dispatch(fetchDetailedReports(detaliedData));
    // console.log('Detailed Report Данные отправленные на сервер:', data);

    onExpand();
  };

  return (
    <div>
      {isLoading && <BraveLogo message={'Your report is loading...'} />}
      <form className={s.DetailedReportForm} onSubmit={handleSubmit}>
        <div className={s.DetailedReportContainer}>
          <div className={s.DetailedReportBox}>
            <div className={s.DetailedReportInner}>
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
              <div className={s.DetailedReportInner}>
                <h4>From/To:</h4>
                <DatePicker
                  className={s.DetailedReportDatePicker}
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

            <div className={s.DetailedReportInner}>
              <h4>Display by:</h4>
              <FormControl fullWidth>
                <Select value={isDisplay} onChange={handleChangeDisplay}>
                  <MenuItem value="day">Day</MenuItem>
                  <MenuItem value="month">Month</MenuItem>
                  <MenuItem value="year">Year</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className={s.DetailedReportInner}>
              <h4>Group By:</h4>
              <FormControl fullWidth>
                <Select
                  multiple
                  value={groupBy}
                  onChange={handleChangeGropuBy}
                  input={<OutlinedInput id="groupBy" />}
                  renderValue={selected => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map(value => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {names.map((name, index) => (
                    <MenuItem
                      key={name}
                      value={values[index]}
                      style={getStyles(name, groupBy, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>

          <div className={s.DetailedReportBox}>
            <div className={s.DetailedReportInner}>
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
            <div className={s.DetailedReportInner}>
              <h4>Ad Size:</h4>

              {sizesList ? (
                <FormControl fullWidth>
                  <Autocomplete
                    value={selectedSize}
                    onChange={(event, newValue) => {
                      setSelectedSize(newValue);
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                      setInputValue(newInputValue);
                    }}
                    options={['allSize', ...options]}
                    renderInput={params => (
                      <TextField {...params} variant="outlined" />
                    )}
                  />
                </FormControl>
              ) : (
                <Box sx={{ width: '100%', color: '#0099fa' }}>
                  <p style={{ color: '#000' }}>Loading...</p>
                  <LinearProgress color="inherit" />
                </Box>
              )}
            </div>

            <div className={s.DetailedReportInner}>
              <h4>Traffic Type:</h4>
              <FormControl fullWidth>
                <Select
                  value={selectedTrafficType}
                  onChange={handleChangeTefficType}
                >
                  <MenuItem value="allTypes">All Types</MenuItem>
                  <MenuItem value="banner">Banner</MenuItem>
                  <MenuItem value="native">Native</MenuItem>
                  <MenuItem value="video">Video</MenuItem>
                  <MenuItem value="ctv">CTV</MenuItem>
                  <MenuItem value="audio">Audio</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </div>

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
