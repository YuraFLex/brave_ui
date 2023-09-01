import { Button } from 'components/Button/Button';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserPartnerId, selectUserType } from 'redux/auth/authSelectors';
import s from './DetailedReport.module.scss';
import { fetchDetailedReports } from 'redux/reports/detailedReport/detailedReportOperation';
import { selectedDetaliedReportsIsLoading } from 'redux/reports/detailedReport/detailedReportSelectors';
import { BraveLogo } from 'components/Loader/Loader';
import { selectIsEndPointList } from 'redux/endPoints/endPointSelectors';

import '../../../index.css';
import { fetchSizes } from 'redux/reports/sizes/sizesOperation';
import { sizesData } from 'redux/reports/sizes/sizesSelectors';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

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
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [selectedSize, setSelectedSize] = useState('allSize');
  const [selectedTrafficType, setSelectedTrafficType] = useState('allTypes');
  const [endPointUrl, setEndPointUrl] = useState('all');
  const [groupBy, setGroupBy] = useState(['appBundle']);

  const dispatch = useDispatch();
  const id = useSelector(selectUserPartnerId);
  const type = useSelector(selectUserType);
  const isLoading = useSelector(selectedDetaliedReportsIsLoading);
  const EPUList = useSelector(selectIsEndPointList);
  const sizesList = useSelector(sizesData);

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

  const handleStartDateChange = date => {
    setSelectedStartDate(date);
  };

  const handleEndDateChange = date => {
    setSelectedEndDate(date);
  };

  const handleChangeSize = e => {
    setSelectedSize(e.target.value);
  };

  const handleChangeTefficType = e => {
    setSelectedTrafficType(e.target.value);
  };

  const handleChangeEndPoint = e => {
    setEndPointUrl(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const defaultGroupBy = ['timeInterval'];

    const data = {
      partner_id: id,
      type: type,
      period: isPeriod,
      displayBy: isDisplay,
      groupBy: [...defaultGroupBy, ...groupBy],
      startDate: selectedStartDate,
      endDate: selectedEndDate,
      size: selectedSize,
      trafficType: selectedTrafficType,
      endPointUrl: endPointUrl,
    };

    dispatch(fetchDetailedReports(data));
    // console.log('Detailed Report Данные отправленные на сервер:', data);

    onExpand();
  };

  if (isLoading) {
    return <BraveLogo />;
  }

  return (
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
            {isPeriod === 'custom' && (
              <div className={s.DetailedReportInner}>
                <h4>Start Date:</h4>
                <DatePicker
                  selected={selectedStartDate}
                  onChange={handleStartDateChange}
                  className={s.DetailedReportDatePicker}
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
                  className={s.DetailedReportDatePicker}
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
                    <MenuItem value="all">Company</MenuItem>
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
                    <MenuItem value="all">Company</MenuItem>
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
                <Select value={selectedSize} onChange={handleChangeSize}>
                  <MenuItem value="allSize">All Size</MenuItem>
                  {sizesList &&
                    sizesList.map((size, index) => (
                      <MenuItem key={index} value={size.size}>
                        {size.size}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            ) : (
              'Loading...'
            )}
            {/* {sizesList ? (
              <select
                className={s.DetailedReportSelect}
                value={selectedSize}
                onChange={handleChangeSize}
              >
                <option value="allSize">All Size</option>
                {sizesList &&
                  sizesList.map((size, index) => (
                    <option key={index} value={size.size}>
                      {size.size}
                    </option>
                  ))}
              </select>
            ) : (
              'Loading...'
            )} */}
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

      <Button type="submit" text="Run Report" />
    </form>
  );
};
