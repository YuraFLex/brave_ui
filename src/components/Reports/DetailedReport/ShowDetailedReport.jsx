import React, { useEffect, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-balham.css';
import { AllCommunityModules } from 'ag-grid-react';
import { useSelector } from 'react-redux';
import {
  detaliedReportsData,
  detaliedReportsIsLoading,
} from 'redux/reports/detailedReport/detailedReportSelectors';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import CropFreeOutlinedIcon from '@mui/icons-material/CropFreeOutlined';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import s from './ShowDetailedReport.module.scss';

export const ShowDetailedReport = () => {
  const [rowData, setRowData] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const [pageSize, setPageSize] = useState(25);
  const [visibleColumns, setVisibleColumns] = useState([
    't_interval',
    'b_domain',
    'spending',
  ]);

  const detailedData = useSelector(detaliedReportsData);
  const loadData = useSelector(detaliedReportsIsLoading);

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
    if (detailedData && detailedData.appName) {
      const newData = detailedData.appName.map((appName, index) => ({
        appName: appName,
        b_domain: detailedData.b_domain[index],
        t_interval: detailedData.t_interval[index],
        spending: detailedData.spending[index],
        impress: detailedData.impress[index],
        sizes: detailedData.sizes[index],
        type: detailedData.type[index],
        key: index,
      }));

      setRowData(newData);
    }
  }, [detailedData]);

  const columnDefs = [
    {
      headerName: 'Date',
      field: 't_interval',
      resizable: true,
      sortable: true,
      filter: true,
    },
    {
      headerName: 'App Name',
      field: 'appName',
      resizable: true,
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Spend',
      field: 'spending',
      resizable: true,
      sortable: true,
      filter: true,
      sort: 'desc',
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
      headerName: 'App Bundle',
      field: 'b_domain',
      resizable: true,
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Traffic Type',
      field: 'type',
      resizable: true,
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Size',
      field: 'sizes',
      resizable: true,
      sortable: true,
      filter: true,
      comparator: (valueA, valueB, nodeA, nodeB, isInverted) => {
        const sizeA = valueA.split('x');
        const sizeB = valueB.split('x');
        if (sizeA.length === 2 && sizeB.length === 2) {
          const widthA = parseInt(sizeA[0]);
          const heightA = parseInt(sizeA[1]);
          const widthB = parseInt(sizeB[0]);
          const heightB = parseInt(sizeB[1]);
          if (widthA === widthB) {
            return heightA < heightB ? -1 : 1;
          }
          return widthA < widthB ? -1 : 1;
        }
        return 0;
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
  ];

  const tableFooter =
    detailedData && detailedData.total
      ? [
          {
            spending: detailedData.total.spending,
            impress: detailedData.total.impress,
          },
        ]
      : [];

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
      const fileName = `Detailed_Report_${formattedDate}_${formattedTime}.csv`;

      const params = {
        skipHeader: false,
        skipFooters: false,
        skipGroups: true,
        fileName: fileName,
      };

      gridApi.exportDataAsCsv(params);
    }
  };

  if (detailedData === null) {
    return (
      <div className={s.NoDataMessage}>Please run the report to view data.</div>
    );
  }

  if (loadData) {
    return <h4 style={{ textAlign: 'center' }}>Loading...</h4>;
  }

  return (
    <div>
      <div className={s.ShowDetailedReportWrapper}>
        <div className={s.ShowDetailedReportBtnBox}>
          <div className={s.ShowDetailedReportDescr}>
            <h4 style={{ whiteSpace: 'nowrap' }}>Page Size</h4>
            <FormControl fullWidth>
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
          {/* <div className={s.ShowDetailedReportSlash}></div> */}
          <Tooltip
            title="Resize to Width"
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
              style={{
                backgroundColor: '#0099fa',
                textTransform: 'capitalize',
              }}
              ref={areaRef}
              onMouseMove={handleMouseMove}
              onClick={resizeTableToWidth}
            >
              <CropFreeOutlinedIcon />
            </Button>
          </Tooltip>

          <div className={s.ShowDetailedReportSlash}></div>
          <Button
            variant="contained"
            style={{ backgroundColor: '#0099fa', textTransform: 'capitalize' }}
            onClick={handleSelectAllColumns}
          >
            Select All
          </Button>
          <Button
            variant="contained"
            style={{ backgroundColor: '#0099fa', textTransform: 'capitalize' }}
            onClick={handleDeleteAllColumns}
          >
            Delete All
          </Button>
          <div className={s.ShowDetailedReportSlash}></div>
          <Tooltip
            title="Download CSV"
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
              style={{
                backgroundColor: '#0099fa',
                textTransform: 'capitalize',
              }}
              ref={areaRef}
              onMouseMove={handleMouseMove}
              onClick={handleExportCsv}
            >
              <FileDownloadOutlinedIcon />
            </Button>
          </Tooltip>
        </div>

        <div className={s.ShowDetailedReportInner}>
          <h3>Columns</h3>
          <div className={s.ShowDetailedReportColumsWrapper}>
            <FormGroup>
              <div className={s.ShowDetailedReportInput}>
                {columnDefs.map(col => {
                  return (
                    <FormControlLabel
                      control={
                        <Checkbox
                          style={{ color: '#0099fa' }}
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
            (detailedData.groupBy.length === 1 &&
              detailedData.period === 'today') ||
            (detailedData.groupBy.length === 1 &&
              detailedData.period === 'yesterday')
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
