import { Button } from 'components/Button/Button';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserPartnerId, selectUserType } from 'redux/auth/authSelectors';
import s from './DetailedReport.module.scss';
import {
  fetchDetailedReports,
  fetchSizes,
} from 'redux/reports/detailedReport/detailedReportOperation';
import {
  selectIsSizes,
  selectedDetaliedReportsIsLoading,
} from 'redux/reports/detailedReport/detailedReportSelectors';
import { LoaderBrave } from 'components/Loader/Loader';
import { selectIsEndPointList } from 'redux/endPoints/endPointSelectors';

import '../../../index.css';

export const DetailedReport = () => {
  const [isDisplay, setIsDisplay] = useState('day');
  const [isPeriod, setIsPeriod] = useState('today');
  // const [timeZone, setTimeZone] = useState('utc');
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [selectedSize, setSelectedSize] = useState('allSize');
  const [selectedTrafficType, setSelectedTrafficType] = useState('allTypes');
  const [endPointUrl, setEndPointUrl] = useState('all');
  const [checkedItems, setCheckedItems] = useState({
    Spend: true,
    Impressions: true,
    'App Name': true,
  });

  const dispatch = useDispatch();
  const id = useSelector(selectUserPartnerId);
  const type = useSelector(selectUserType);
  const isLoading = useSelector(selectedDetaliedReportsIsLoading);
  const EPUList = useSelector(selectIsEndPointList);
  const sizesList = useSelector(selectIsSizes);

  useEffect(() => {
    dispatch(fetchSizes({ partnerId: id, type }));
  }, [dispatch, id, type]);

  function handleChangePeriod(e) {
    setIsPeriod(e.target.value);
  }

  const handleChangeDisplay = e => {
    setIsDisplay(e.target.value);
  };

  // const handleChangeTimeZone = e => {
  //   setTimeZone(e.target.value);
  // };

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
    'App Name',
    'App Bundle',
    'Type',
    'Size',
    'Impressions',
  ];

  const handleSubmit = e => {
    e.preventDefault();

    const labels = Object.keys(checkedItems);
    const isChecked = Object.values(checkedItems);

    const data = {
      partner_id: id,
      type: type,
      // timeZone: timeZone,
      period: isPeriod,
      displayBy: isDisplay,
      startDate: selectedStartDate,
      endDate: selectedEndDate,
      size: selectedSize,
      trafficType: selectedTrafficType,
      endPointUrl: endPointUrl,
      checkedItems: { labels, isChecked },
    };

    dispatch(fetchDetailedReports(data));
    console.log('Detailed Report Данные отправленные на сервер:', data);
  };

  if (isLoading) {
    return <LoaderBrave />;
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
              <option value="lastweek">Last 7 Days</option>
              <option value="thismonth">This Month</option>
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
              <option value="month">Month</option>
              <option value="year">Year</option>
            </select>
          </div>

          {/* <div className={s.DetailedReportInner}>
            <h4>Time zone:</h4>

            <select
              className={s.DetailedReportSelect}
              value={timeZone}
              onChange={handleChangeTimeZone}
            >
              <option value="utc">UTC</option>
              <option value="pst">PST</option>
              <option value="est">EST</option>
            </select>
          </div> */}
        </div>

        <div className={s.DetailedReportBox}>
          <div className={s.DetailedReportInner}>
            {type === 'DSP' ? (
              <>
                <h4>EP URL:</h4>
                <select
                  className={s.DetailedReportSelect}
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
              <>
                <h4>EP URL:</h4>
                <select
                  className={s.DetailedReportSelect}
                  value={endPointUrl}
                  onChange={handleChangeEndPoint}
                >
                  <option value="all">Company</option>
                  {EPUList &&
                    EPUList.map(({ id, pass }) => (
                      <option key={id} value={id}>
                        {pass}
                      </option>
                    ))}
                </select>
              </>
            )}
          </div>
          <div className={s.DetailedReportInner}>
            <h4>Ad Size:</h4>

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
        </div>

        <div className={s.DetailedReportBox}>
          <h4 className={s.DetailedReportSubTitle}>Columns</h4>
          <ul className={s.DetailedReportList}>
            {columsLabel.map(label => {
              const formattedLabel =
                label.replace(/\s+/g, '-').replace(/%/g, '') + 'd';

              return (
                <li className={s.DetailedReportItem} key={label}>
                  <input
                    type="checkbox"
                    id={formattedLabel}
                    className="hidden-xs-up"
                    checked={!!checkedItems[label]}
                    onChange={() => handleChangeColumns(label)}
                  />
                  <label htmlFor={formattedLabel} className="cbx"></label>
                  {label}
                </li>
              );
            })}
          </ul>

          {/* <ul className={s.DetailedReportList}>
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
          </ul> */}

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
