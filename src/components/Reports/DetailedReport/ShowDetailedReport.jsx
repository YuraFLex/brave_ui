import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-balham.css';
import { AllCommunityModules } from 'ag-grid-react';
import { useSelector } from 'react-redux';
import { selectedDetaliedReportsData } from 'redux/reports/detailedReport/detailedReportSelectors';
import s from './ShowDetailedReport.module.scss';

export const ShowDetailedReport = () => {
  const [rowData, setRowData] = useState([]);
  const detailedData = useSelector(selectedDetaliedReportsData);
  const [gridApi, setGridApi] = useState(null);
  const [pageSize, setPageSize] = useState(25);
  const [visibleColumns, setVisibleColumns] = useState([
    'time_interval',
    'app_name',
    'spend',
    'impressions',
  ]);

  useEffect(() => {
    if (detailedData && detailedData.app_name) {
      const newData = detailedData.app_name.map((appName, index) => ({
        app_name: appName,
        bundle_domain: detailedData.bundle_domain[index],
        time_interval: detailedData.time_interval[index],
        spend: detailedData.spend[index],
        impressions: detailedData.impressions[index],
        size: detailedData.size[index],
        traffic_type: detailedData.traffic_type[index],
        key: index,
      }));

      setRowData(newData);
    }
  }, [detailedData]);

  console.log('detailedData:', detailedData);

  const columnDefs = [
    {
      headerName: 'Date',
      field: 'time_interval',
      resizable: true,
      sortable: true,
      filter: true,
    },
    {
      headerName: 'App Name',
      field: 'app_name',
      resizable: true,
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Spend',
      field: 'spend',
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
      field: 'bundle_domain',
      resizable: true,
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Traffic Type',
      field: 'traffic_type',
      resizable: true,
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Size',
      field: 'size',
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
      field: 'impressions',
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

  const tableFooter = [
    {
      spend: detailedData.total.spend,
      impressions: detailedData.total.impressions,
    },
  ];

  return (
    <div>
      <div className={s.ShowDetailedReportWrapper}>
        <div className={s.ShowDetailedReportBtnBox}>
          <div className={s.ShowDetailedReportDescr}>
            <h4>Page Size</h4>
            <select
              className={s.ShowDetailedReportPageSize}
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
          <div className={s.ShowDetailedReportSlash}></div>
          <button
            className={s.ShowDetailedReportBtn}
            onClick={resizeTableToWidth}
          >
            Resize to Width
          </button>
          <div className={s.ShowDetailedReportSlash}></div>
          <button
            className={s.ShowDetailedReportBtn}
            onClick={handleSelectAllColumns}
          >
            Select All
          </button>
          <button
            className={s.ShowDetailedReportBtn}
            onClick={handleDeleteAllColumns}
          >
            Delete All
          </button>
          <div className={s.ShowDetailedReportSlash}></div>
          <button className={s.ShowDetailedReportBtn} onClick={handleExportCsv}>
            Dowload CSV
          </button>
        </div>

        <div className={s.ShowDetailedReportInner}>
          <h3>Columns</h3>
          <div className={s.ShowDetailedReportColumsWrapper}>
            {columnDefs.map(col => (
              <div className={s.ShowDetailedReportInput} key={col.field}>
                <label className={s.ShowDetailedReportLabel}>
                  <input
                    className={s.ShowDetailedReportCheckBox}
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
          pinnedBottomRowData={tableFooter}
        />
      </div>
    </div>
  );
};
