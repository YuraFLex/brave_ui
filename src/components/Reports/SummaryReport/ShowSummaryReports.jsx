import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-balham.css';
import { AllCommunityModules } from 'ag-grid-react';
import { useSelector } from 'react-redux';
import s from './SummaryReportsTable.module.scss';
import { selectedSummaryReportsData } from 'redux/reports/summaryReports/summaryReportsSelectors';

export const ShowSummaryReports = () => {
  const [rowData, setRowData] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const [pageSize, setPageSize] = useState(25);
  const [visibleColumns, setVisibleColumns] = useState([
    'time_interval',
    'spend',
    'impressions',
  ]);

  const summaryData = useSelector(selectedSummaryReportsData);

  useEffect(() => {
    if (summaryData && summaryData.spend) {
      const newData = summaryData.spend.map((spend, index) => ({
        spend: spend,
        win_rate: summaryData.win_rate[index],
        time_interval: summaryData.time_interval[index],
        requests: summaryData.requests[index],
        impressions: summaryData.impressions[index],
        responses: summaryData.responses[index],
        timeouts: summaryData.timeouts[index],
        time_outs: summaryData.time_outs[index],
        key: index,
      }));

      setRowData(newData);
    }
  }, [summaryData]);

  const columnDefs = [
    {
      headerName: 'Date',
      field: 'time_interval',
      resizable: true,
      sortable: true,
    },
    { headerName: 'Spend', field: 'spend', resizable: true, sortable: true },
    {
      headerName: 'Win Rate %',
      field: 'win_rate',
      resizable: true,
      sortable: true,
    },
    {
      headerName: 'Requests',
      field: 'requests',
      resizable: true,
      sortable: true,
    },
    {
      headerName: 'Responses',
      field: 'responses',
      resizable: true,
      sortable: true,
    },
    {
      headerName: 'Impressions',
      field: 'impressions',
      resizable: true,
      sortable: true,
    },
    {
      headerName: 'Timeouts',
      field: 'timeouts',
      resizable: true,
      sortable: true,
    },
    {
      headerName: 'Timeouts %',
      field: 'time_outs',
      resizable: true,
      sortable: true,
    },
  ];

  const resizeTableToWidth = () => {
    if (gridApi) {
      gridApi.sizeColumnsToFit();
      gridApi.setDomLayout('autoWidth');
    }
  };

  const onGridReady = params => {
    setGridApi(params.api);
  };

  const handleColumnToggle = field => {
    if (visibleColumns.includes(field)) {
      setVisibleColumns(prevVisibleCols =>
        prevVisibleCols.filter(col => col !== field)
      );
    } else {
      setVisibleColumns(prevVisibleCols => [...prevVisibleCols, field]);
    }
  };

  const handleSelectAllColumns = () => {
    const allColumns = columnDefs.map(col => col.field);
    setVisibleColumns(allColumns);
  };

  const handleDeleteAllColumns = () => {
    setVisibleColumns([]);
  };

  const handlePageSizeChange = event => {
    const newPageSize = parseInt(event.target.value);
    setPageSize(newPageSize);
  };

  return (
    <div>
      <div className={s.ShowSummaryReportsWrapper}>
        <div>
          <button
            className={s.ShowSummaryReportsBtn}
            onClick={resizeTableToWidth}
          >
            Resize to Width
          </button>

          <select
            className={s.ShowSummaryReportsPageSize}
            value={pageSize}
            onChange={handlePageSizeChange}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={500}>500</option>
            <option value={1000}>1000</option>
          </select>
        </div>
        <div className={s.ShowSummaryReportsInner}>
          {/* <h4>Columns</h4> */}
          <div className={s.ShowSummaryReportsColumsWrapper}>
            {columnDefs.map(col => (
              <div className={s.ShowSummaryReportsInput} key={col.field}>
                <input
                  className={s.ShowSummaryReportsCheckBox}
                  type="checkbox"
                  checked={visibleColumns.includes(col.field)}
                  onChange={() => handleColumnToggle(col.field)}
                />
                <label>{col.headerName}</label>
              </div>
            ))}
          </div>
        </div>
        <div className={s.ShowSummaryReportsBtnBox}>
          <button
            className={s.ShowSummaryReportsBtn}
            onClick={handleSelectAllColumns}
          >
            Select All
          </button>
          <button
            className={s.ShowSummaryReportsBtn}
            onClick={handleDeleteAllColumns}
          >
            Delete All
          </button>
        </div>
      </div>
      <div style={{ height: 600, width: '100%' }}>
        <AgGridReact
          className="ag-theme-balham"
          columnDefs={columnDefs.filter(col =>
            visibleColumns.includes(col.field)
          )}
          rowData={rowData}
          suppressMenu={true}
          suppressDragLeaveHidesColumns={true}
          deltaRowDataMode={true}
          pagination={true}
          paginationPageSize={pageSize}
          paginationNumberFormatter={params => `${params.value}`}
          enableCellTextSelection={true}
          modules={AllCommunityModules}
          suppressRowTransform={true}
          onGridReady={onGridReady}
        />
      </div>
    </div>
  );
};
