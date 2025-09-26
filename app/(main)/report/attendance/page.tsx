/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  ChangeEvent,
} from 'react';
import { Calendar } from 'primereact/calendar';
import { DataTable } from 'primereact/datatable';
import { Skeleton } from 'primereact/skeleton';
import { InputText } from 'primereact/inputtext';          // ⬅️ NEW
import { Nullable } from 'primereact/ts-helpers';

import { usereportCheckInStore } from '@/app/store/reports/reportCheckInStore';
import { getDayMonthYear } from '../../utilities/format-date';
import EmptyData from '@/app/shared/empty-table/container';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { GetColumns } from './columns';
import { Checkin } from '@/types';

export default function AttendTable() {
  /* ----------------------- store hooks & modal ---------------------- */
  const { attendance, getAttendance } = usereportCheckInStore();
  const { openModal } = useModal();

  /* ----------------------------- state ------------------------------ */
  const [filteredData, setFilteredData] = useState<Checkin.Attendance[]>([]);
  const [selectedItem, setSelectedItem] = useState<any[]>([]);
  const [date, setDate] = useState<Nullable<Date>>(new Date());
  const [globalFilter, setGlobalFilter] = useState<string>('');   // ⬅️ NEW
  const [isLoading, setIsLoading] = useState(false);

  const dt = useRef<DataTable<any>>(null);

  /* ---------------------------- fetch API --------------------------- */
  const fetchAttendance = useCallback(async () => {
    if (!date) return;

    const { month, year } = getDayMonthYear(date);
    const loaderTimeout = setTimeout(() => setIsLoading(true), 150);

    try {
      await getAttendance(month, year);
    } finally {
      clearTimeout(loaderTimeout);
      setIsLoading(false);
    }
  }, [date, getAttendance]);

  useEffect(() => {
    fetchAttendance();
  }, [fetchAttendance]);

  /* ---------------- filter by empCode + store data ----------------- */
  useEffect(() => {
    if (!attendance) {
      setFilteredData([]);
      return;
    }

    const q = globalFilter.trim().toLowerCase();
    setFilteredData(
      q
        ? attendance.filter((row) =>
            String(row.empCode ?? '')
              .toLowerCase()
              .includes(q)
          )
        : attendance
    );
  }, [attendance, globalFilter]);          // ⬅️ react to changes in either

  /* --------------------------- modal view --------------------------- */
   const onViewDoc = useCallback(
    (fw_req_id: any) => {
      openModal({
        view: (
          <div style={{ height: '100vh', maxHeight: '80vh' }}>
            {fw_req_id}
          </div>
        ),
        className: '',
        header: 'ເອກະສານ',
        customSize: '1000px',
        dialogFooter: null,
      });
    },
    [openModal]
  );

  /* ------------------------- handlers ------------------------------ */
  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) =>
    setGlobalFilter(e.target.value);                              // ⬅️ NEW

  /* ------------------------- table header --------------------------- */
  const header = (
    <div className="card-no-bro">
        <div className="flex flex-wrap gap-1 justify-content-start p-4">
          <InputText
            type="search"
            placeholder="ຄົ້ນຫາ ລະຫັດ"
            className="input-text calendar-search w-full md:w-10rem"
            value={globalFilter}
            onChange={onSearchChange}
          />
          <Calendar
            value={date}
            onChange={(e) => setDate(e.value)}
            view="month"
            dateFormat="mm/yy"
            placeholder="ເລືອກເດືອນ"
            showIcon
            showButtonBar
            className="calendar-search w-full md:w-14rem"
          />
        </div>
    </div>
  );

  /* ------------------- optional skeleton rows ---------------------- */

  const TitleComponent = () => {
    return (
      <div className="flex flex-wrap align-items-center justify-content-between gap-2">
        <span style={{color: "black"}} className="text-xl font-bold">ລາຍງານ ເຂົ້າ-ອອກວຽກ ປະຈຳເດືອນ</span>
      </div>
    );
  };

  /* --------------------------- render ------------------------------- */
  return (
    <div>
      <TitleComponent/>
      {header}
      <DataTable
        ref={dt}
        dataKey="_key"
        value={filteredData.map((row, i) => ({ ...row, _key: i }))}
        paginator
        rows={10}
        rowsPerPageOptions={[10, 25, 50]}
        sortField="_key"
        sortOrder={1}
        selection={selectedItem}
        className="datatable-responsive"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="ຈຳນວນ"
        loading={isLoading}
        emptyMessage={<EmptyData emptytext="ຂໍ້ມູນ ວ່າງເປົ່າ" />}
        responsiveLayout="scroll"
      >
        {GetColumns({ onViewDoc }).map((col, idx) =>
          React.cloneElement(col, { key: `col-${idx}` })
        )}
      </DataTable>
    </div>
  );
}
