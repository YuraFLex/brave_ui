import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-balham.css';
import { AllCommunityModules } from 'ag-grid-react';
import { useSelector } from 'react-redux';
import s from './SummaryReportsTable.module.scss';
import {
  selectedSummaryReportsData,
  selectedSummaryReportsIsLoading,
} from 'redux/reports/summaryReports/summaryReportsSelectors';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export const ShowSummaryReports = () => {
  const [rowData, setRowData] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const [pageSize, setPageSize] = useState(25);
  const [visibleColumns, setVisibleColumns] = useState([
    't_interval',
    'spending',
    'impress',
  ]);

  const summaryData = useSelector(selectedSummaryReportsData);
  const loadData = useSelector(selectedSummaryReportsIsLoading);

  useEffect(() => {
    if (summaryData && summaryData.spending) {
      const newData = summaryData.spending.map((spending, index) => ({
        spending: spending,
        w_rate: summaryData.w_rate[index],
        t_interval: summaryData.t_interval[index],
        req: summaryData.req[index],
        impress: summaryData.impress[index],
        resp: summaryData.resp[index],
        timeOut: summaryData.timeOut[index],
        t_outs: summaryData.t_outs[index],
        key: index,
      }));

      setRowData(newData);
    }
  }, [summaryData]);

  const columnDefs = [
    {
      headerName: 'Date',
      field: 't_interval',
      resizable: true,
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Spend',
      field: 'spending',
      resizable: true,
      sortable: true,
      sort: 'desc',
      filter: true,
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
      field: 'w_rate',
      resizable: true,
      sortable: true,
      filter: true,
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
      field: 'req',
      resizable: true,
      sortable: true,
      filter: true,
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
      field: 'resp',
      resizable: true,
      sortable: true,
      filter: true,
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
      field: 'impress',
      resizable: true,
      sortable: true,
      filter: true,
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
      field: 'timeOut',
      resizable: true,
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Timeouts %',
      field: 't_outs',
      resizable: true,
      sortable: true,
      filter: true,
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

  const tableFooter =
    summaryData && summaryData.total
      ? [
          {
            spending: summaryData.total.spending,
            w_rate: summaryData.total.w_rate,
            req: summaryData.total.req,
            resp: summaryData.total.resp,
            impress: summaryData.total.impress,
            timeOut: summaryData.total.timeOut,
            t_outs: summaryData.total.t_outs,
          },
        ]
      : [];

  const resizeTableToWidth = () => {
    if (gridApi) {
      gridApi.hideOverlay();
      gridApi.sizeColumnsToFit();
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
        skipFooters: false,
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

  if (summaryData === null) {
    return (
      <div className={s.NoDataMessage}>Please run the report to view data.</div>
    );
  }

  if (loadData) {
    return <h4 style={{ textAlign: 'center' }}>Loading...</h4>;
  }

  return (
    <div>
      <div className={s.ShowSummaryReportsWrapper}>
        <div className={s.ShowSummaryReportsBtnBox}>
          <div className={s.ShowSummaryReportsDescr}>
            <h4 style={{ whiteSpace: 'nowrap' }}>Page Size</h4>
            <FormControl style={{ padding: '5px' }}>
              <Select value={pageSize} onChange={handlePageSizeChange}>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={100}>100</MenuItem>
                <MenuItem value={500}>500</MenuItem>
                <MenuItem value={1000}>1000</MenuItem>
              </Select>
            </FormControl>
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
            <FormGroup>
              <div className={s.ShowSummaryReportsInputBox}>
                {columnDefs.map(col => {
                  return (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={visibleColumns.includes(col.field)}
                        />
                      }
                      key={col.field}
                      label={col.headerName}
                      onChange={() => handleColumnToggle(col.field)}
                    />
                  );
                })}
              </div>
            </FormGroup>
          </div>
        </div>
      </div>
      <div
        style={{
          height:
            summaryData.period === 'today' || summaryData.period === 'yesterday'
              ? 250
              : 550,
          width: '100%',
        }}
      >
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
          pinnedBottomRowData={tableFooter}
        />
      </div>
    </div>
  );
};
