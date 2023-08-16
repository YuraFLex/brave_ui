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

  const columnDefs = [
    {
      headerName: 'Date',
      field: 'time_interval',
      resizable: true,
      sortable: true,
    },
    {
      headerName: 'App Name',
      field: 'app_name',
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
      headerName: 'App Bundle',
      field: 'bundle_domain',
      resizable: true,
      sortable: true,
    },
    {
      headerName: 'Traffic Type',
      field: 'traffic_type',
      resizable: true,
      sortable: true,
    },
    { headerName: 'Size', field: 'size', resizable: true, sortable: true },
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
      <div className={s.ShowDetailedReportWrapper}>
        <div>
          <button
            className={s.ShowDetailedReportBtn}
            onClick={resizeTableToWidth}
          >
            Resize to Width
          </button>
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
        <div className={s.ShowDetailedReportInner}>
          {/* <h4>Columns</h4> */}
          <div className={s.ShowDetailedReportColumsWrapper}>
            {columnDefs.map(col => (
              <div className={s.ShowDetailedReportInput} key={col.field}>
                <input
                  className={s.ShowDetailedReportCheckBox}
                  type="checkbox"
                  checked={visibleColumns.includes(col.field)}
                  onChange={() => handleColumnToggle(col.field)}
                />
                <label>{col.headerName}</label>
              </div>
            ))}
          </div>
        </div>
        <div className={s.ShowDetailedReportBtnBox}>
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
