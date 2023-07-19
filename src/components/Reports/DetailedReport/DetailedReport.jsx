import { Button } from 'components/Button/Button';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserPartnerId, selectUserType } from 'redux/auth/authSelectors';
import s from './DetailedReport.module.scss';
import { fetchDetailedReports } from 'redux/reports/detailedReport/detailedReportOperation';
import { selectedDetaliedReportsIsLoading } from 'redux/reports/detailedReport/detailedReportSelectors';
import { LoaderNew } from 'components/Loader/Loader';

export const DetailedReport = () => {
  const [isDisplay, setIsDisplay] = useState('day');
  const [isPeriod, setIsPeriod] = useState('today');
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [selectedSize, setSelectedSize] = useState('allSize');
  const [selectedTrafficType, setSelectedTrafficType] = useState('allTypes');
  const [selectedPlatform, setSelectedPlatform] = useState('allPlatform');
  const [selectedRegion, setSelectedRegion] = useState('allRegions');
  const [checkedItems, setCheckedItems] = useState({
    Spend: true,
    Impressions: true,
    Region: true,
  });

  const dispatch = useDispatch();
  const id = useSelector(selectUserPartnerId);
  const type = useSelector(selectUserType);
  const isLoading = useSelector(selectedDetaliedReportsIsLoading);

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

  const handleChangePlatform = e => {
    setSelectedPlatform(e.target.value);
  };

  const handleChangeRegion = e => {
    setSelectedRegion(e.target.value);
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
    setCheckedItems({});
  };

  const columsLabel = [
    'Spend',
    'App Name',
    'App Bundle',
    'Traffic Type',
    'Size',
    'Region',
    'Impressions',
    'Platform',
  ];

  const handleSubmit = e => {
    e.preventDefault();

    const labels = Object.keys(checkedItems);
    const isChecked = Object.values(checkedItems);

    const data = {
      partner_id: id,
      type: type,
      period: isPeriod,
      displayBy: isDisplay,
      startDate: selectedStartDate,
      endDate: selectedEndDate,
      size: selectedSize,
      trafficType: selectedTrafficType,
      platform: selectedPlatform,
      region: selectedRegion,
      checkedItems: { labels, isChecked },
    };

    dispatch(fetchDetailedReports(data));
    console.log('Данные отправленные на сервер:', data);
  };

  if (isLoading) {
    return <LoaderNew />;
  }

  return (
    <form className={s.DetailedReportForm} onSubmit={handleSubmit}>
      <div className={s.DetailedReportContainer}>
        <div className={s.DetailedReportBox}>
          <div className={s.DetailedReportInner}>
            <h4>Select Period:</h4>
            <select
              className={s.DetailedReportSelect}
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

            <select
              className={s.DetailedReportSelect}
              value={isDisplay}
              onChange={handleChangeDisplay}
            >
              <option value="day">Day</option>
              <option value="hour">Hour</option>
              <option value="month">Month</option>
              <option value="year">Year</option>
            </select>
          </div>
        </div>

        <div className={s.DetailedReportBox}>
          <div className={s.DetailedReportInner}>
            <h4>Ad Size:</h4>

            <select
              className={s.DetailedReportSelect}
              value={selectedSize}
              onChange={handleChangeSize}
            >
              <option value="allSize">All Size</option>
            </select>
          </div>

          <div className={s.DetailedReportInner}>
            <h4>Traffic Type:</h4>
            <select
              className={s.DetailedReportSelect}
              value={selectedTrafficType}
              onChange={handleChangeTefficType}
            >
              <option value="allTypes">All Types</option>
              <option value="banner">Banner</option>
              <option value="native">Native</option>
              <option value="video">Video</option>
              <option value="ctv">CTV</option>
              <option value="audio">Audio</option>
            </select>
          </div>
          <div className={s.DetailedReportInner}>
            <h4>Platform:</h4>
            <select
              className={s.DetailedReportSelect}
              value={selectedPlatform}
              onChange={handleChangePlatform}
            >
              <option value="allPlatform">All Platform</option>
              <option value="web">Web</option>
              <option value="app">App</option>
            </select>
          </div>
          <div className={s.DetailedReportInner}>
            <h4>Region:</h4>
            <select
              className={s.DetailedReportSelect}
              value={selectedRegion}
              onChange={handleChangeRegion}
            >
              <option value="allRegions">All Regions</option>
              <option value="eu">EU</option>
              <option value="useast">US-EAST</option>
            </select>
          </div>
        </div>

        <div className={s.DetailedReportBox}>
          <h4 className={s.DetailedReportSubTitle}>Columns</h4>
          <ul className={s.DetailedReportList}>
            {columsLabel.map(label => (
              <li className={s.DetailedReportItem} key={label}>
                <input
                  type="checkbox"
                  checked={!!checkedItems[label]}
                  onChange={() => handleChangeColumns(label)}
                />
                <label className={s.DetailedReportLabel}>{label}</label>
              </li>
            ))}
          </ul>

          <div className={s.DetailedReportBtnBox}>
            <button
              className={s.DetailedReportBtn}
              type="button"
              onClick={handleSelectAll}
            >
              Select All
            </button>
            <button
              className={s.DetailedReportBtn}
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
  );
};
