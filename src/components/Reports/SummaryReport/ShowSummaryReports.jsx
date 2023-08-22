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
    {
      headerName: 'Spend',
      field: 'spend',
      resizable: true,
      sortable: true,
      valueFormatter: params => `$ ${params.value}`,
      comparator: (valueA, valueB, nodeA, nodeB, isInverted) => {
        const floatValueA = parseFloat(
          valueA.replace('$', '').replace(',', '')
        );
        const floatValueB = parseFloat(
          valueB.replace('$', '').replace(',', '')
        );
        if (floatValueA === floatValueB) {
          return 0;
        }
        return floatValueA < floatValueB ? -1 : 1;
      },
    },
    {
      headerName: 'Win Rate %',
      field: 'win_rate',
      resizable: true,
      sortable: true,
      valueFormatter: params => `${params.value} %`,
      comparator: (valueA, valueB, nodeA, nodeB, isInverted) => {
        const floatValueA = parseFloat(valueA.replace('%', ''));
        const floatValueB = parseFloat(valueB.replace('%', ''));
        if (floatValueA === floatValueB) {
          return 0;
        }
        return floatValueA < floatValueB ? -1 : 1;
      },
    },
    {
      headerName: 'Requests',
      field: 'requests',
      resizable: true,
      sortable: true,
      comparator: (valueA, valueB, nodeA, nodeB, isInverted) => {
        const intValueA = parseInt(valueA.replace(/,/g, ''));
        const intValueB = parseInt(valueB.replace(/,/g, ''));
        if (intValueA === intValueB) {
          return 0;
        }
        return intValueA < intValueB ? -1 : 1;
      },
    },
    {
      headerName: 'Responses',
      field: 'responses',
      resizable: true,
      sortable: true,
      comparator: (valueA, valueB, nodeA, nodeB, isInverted) => {
        const intValueA = parseInt(valueA.replace(/,/g, ''));
        const intValueB = parseInt(valueB.replace(/,/g, ''));
        if (intValueA === intValueB) {
          return 0;
        }
        return intValueA < intValueB ? -1 : 1;
      },
    },
    {
      headerName: 'Impressions',
      field: 'impressions',
      resizable: true,
      sortable: true,
      comparator: (valueA, valueB, nodeA, nodeB, isInverted) => {
        const intValueA = parseInt(valueA.replace(/,/g, ''));
        const intValueB = parseInt(valueB.replace(/,/g, ''));
        if (intValueA === intValueB) {
          return 0;
        }
        return intValueA < intValueB ? -1 : 1;
      },
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
      valueFormatter: params => `${params.value} %`,
      comparator: (valueA, valueB, nodeA, nodeB, isInverted) => {
        const floatValueA = parseFloat(valueA.replace('%', ''));
        const floatValueB = parseFloat(valueB.replace('%', ''));
        if (floatValueA === floatValueB) {
          return 0;
        }
        return floatValueA < floatValueB ? -1 : 1;
      },
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

  const handleExportCsv = () => {
    if (gridApi) {
      const now = new Date();
      const formattedDate = `${now.getFullYear()}-${(now.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
      const formattedTime = `${now.getHours().toString().padStart(2, '0')}-${now
        .getMinutes()
        .toString()
        .padStart(2, '0')}-${now.getSeconds().toString().padStart(2, '0')}`;
      const fileName = `Summary_reports_${formattedDate}_${formattedTime}.csv`;

      const params = {
        skipHeader: false,
        skipFooters: true,
        skipGroups: true,
        fileName: fileName,
      };

      gridApi.exportDataAsCsv(params);
    }
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
        <div className={s.ShowSummaryReportsBtnBox}>
          <div className={s.ShowSummaryReportsDescr}>
            <h4>Page Size</h4>
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
          <div className={s.ShowSummaryReportsSlash}></div>

          <button
            className={s.ShowSummaryReportsBtn}
            onClick={resizeTableToWidth}
          >
            Resize to Width
          </button>
          <div className={s.ShowSummaryReportsSlash}></div>
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
          <div className={s.ShowSummaryReportsSlash}></div>
          <button className={s.ShowSummaryReportsBtn} onClick={handleExportCsv}>
            Dowload CSV
          </button>
        </div>

        <div className={s.ShowSummaryReportsInner}>
          <h3>Columns</h3>
          <div className={s.ShowSummaryReportsColumsWrapper}>
            {columnDefs.map(col => (
              <div className={s.ShowSummaryReportsInputBox} key={col.field}>
                <label className={s.ShowSummaryReportsLabel}>
                  <input
                    className={s.ShowSummaryReportsCheckBox}
                    type="checkbox"
                    checked={visibleColumns.includes(col.field)}
                    onChange={() => handleColumnToggle(col.field)}
                  />

                  {col.headerName}
                </label>
              </div>
            ))}
          </div>
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
          suppressCsvExport={false}
        />
      </div>
    </div>
  );
};
