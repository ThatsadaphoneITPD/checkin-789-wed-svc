import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Create from "./create";
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { DataTable } from 'primereact/datatable';
import { Nullable } from 'primereact/ts-helpers';
import EmptyData from '@/app/shared/empty-table/container';
import { GetColumns } from './columns';
import { Checkin } from '@/types';

export default function CheckinManual() {
  const dataManual = useMemo(
    () => [
      { id: 1, emp_code: "44697", check_date: "2025-06-04T06:08:00", status_in_out: "in", comments: "Arrived early to prep meeting" },
      { id: 2, emp_code: "44334", check_date: "2025-06-04T15:09:00", status_in_out: "out", comments: "Left after project hand‑off" },
      { id: 3, emp_code: "17698", check_date: "2025-06-04T06:06:00", status_in_out: "in" },
      { id: 4, emp_code: "28893", check_date: "2025-06-04T08:30:00", status_in_out: "out", comments: "Stayed late for system patch" },
      { id: 5, emp_code: "44276", check_date: "2025-06-04T07:07:30", status_in_out: "in", comments: "Traffic delay — informed supervisor" },
    ],
    []
  );

  const [selectedItem, setSelectedItem] = useState<any[]>([]);
  const [rowData, setRowdata] = useState<Checkin.CheckinManual | null>(null);
  const [date, setDate] = useState<Nullable<Date | null>>(null);
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);
  const dt = useRef<DataTable<any>>(null);

  const handleCalendarChange = (e: { value: Date | null }) => {
    setDate(e.value);
  };

  useEffect(() => {
    setFilteredData(dataManual);
  }, [dataManual]);

  const filterData = useCallback(
    (filter: string) => {
      if (!filter.trim()) {
        // If search input is empty or spaces, show all data
        setFilteredData(dataManual);
      } else {
        const lowercasedFilter = filter.toLowerCase();
        const filtered = dataManual.filter((item: any) =>
          item?.emp_code?.toString().toLowerCase().includes(lowercasedFilter)
        );
        setFilteredData(filtered);
      }
    },
    [dataManual]
  );

  const searchGlobal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filterValue = e?.target.value;
    setGlobalFilter(filterValue);

    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    typingTimeout.current = setTimeout(() => {
      filterData(filterValue);
    }, 300);
  };

  // Filter by calendar date
  useEffect(() => {
    if (!date) {
      setFilteredData(dataManual || []);
      return;
    }
    const yyyy = date.getFullYear();
    const mm = date.getMonth();
    const dd = date.getDate();

    const filtered = (filteredData || []).filter((item: any) => {
      const d = new Date(item.check_date);
      return d.getFullYear() === yyyy && d.getMonth() === mm && d.getDate() === dd;
    });
    setFilteredData(filtered);
  }, [date]);

  const onViewDoc = useCallback(async (rowData: any) => {
    // console.log("onViewDoc To Edit: ", rowData);
    setRowdata(rowData);
  }, []);

  const header = (
    <div className="flex flex-wrap md:flex-nowrap justify-between items-start md:items-center gap-2">
      <div className="header-table flex flex-wrap gap-2 flex-1">
        <InputText
          type="search"
          placeholder="ລະຫັດ"
          className="input-text flex-1 md:max-w-15rem max-w-20rem"
          value={globalFilter}
          onChange={searchGlobal}
          
        />
        <Calendar
          value={date}
          onChange={handleCalendarChange}
          showIcon
          showButtonBar
          className="w-auto calendar-search"
        />
      </div>
    </div>
  );

  return (
    <div className="grid">
      {/* Left panel */}
      <div className="col-12 md:col-3">
        <Create rowItem={rowData && rowData} setRowData={setRowdata} />
      </div>

      {/* Right panel */}
      <div className="col-12 md:col-9">
        {header}
        <div className="card_manual mt-2">
          <DataTable
            dataKey="id"
            rows={10}
            paginator
            ref={dt}
            sortField="id"
            sortOrder={1}
            value={filteredData?.map((item, index) => ({ ...item, _key: `${item?.leave_req_id ?? 'row'}-${index}` }))}
            selection={selectedItem}
            onSelectionChange={(e: any) => setSelectedItem(e.value as any)}
            rowsPerPageOptions={[10, 25, 30, 40, 50, 100]}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Max"
            emptyMessage={<EmptyData />}
            responsiveLayout="scroll"
          >
            {GetColumns({ onViewDoc }).map((column, index) => React.cloneElement(column, { key: `column-${index}` }))}
          </DataTable>
        </div>
      </div>
    </div>
  );
}
