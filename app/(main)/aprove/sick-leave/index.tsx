/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Nullable } from 'primereact/ts-helpers';

import { useSickLeaveStore } from '@/app/store/sick-leave/sickLeaveStore';
import EmptyData from '@/app/shared/empty-table/container';
import { GetColumns } from './columns';
import { useModal } from '@/app/shared/modal-views/use-modal';

export default function SickLeaveTable() {
  const { data, getSickLeaveData, getLeaveTypeData } = useSickLeaveStore();
  const { openModal } = useModal();

  /* ------------------------------------------------------------------ */
  /* state ------------------------------------------------------------- */
  const [globalFilter, setGlobalFilter] = useState('');
  const [monthDate, setMonthDate] = useState<Nullable<Date>>(null);         // existing month filter
  const [dateRange, setDateRange] = useState<(Date | null)[] | null>(null); // new range filter
  const [filtered, setFiltered] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<any[]>([]);

  const typingTimeout = useRef<NodeJS.Timeout | null>(null);
  const dt = useRef<DataTable<any>>(null);

  /* ------------------------------------------------------------------ */
  /* fetch data once --------------------------------------------------- */
  useEffect(() => {
    getSickLeaveData();
    getLeaveTypeData();
  }, []);

  /* ------------------------------------------------------------------ */
  /* combined filter --------------------------------------------------- */
  const applyFilters = useCallback(() => {
    let list = data;

    /* search */
    if (globalFilter.trim()) {
      const lower = globalFilter.toLowerCase();
      list = list.filter(
        (i: any) =>
          i.leave_req_id?.toString().toLowerCase().includes(lower) ||
          i.emp_code?.toLowerCase().includes(lower) ||
          i.reasons?.toLowerCase().includes(lower)
      );
    }

    /* month picker */
    if (monthDate) {
      const mm = monthDate.getMonth();
      const yy = monthDate.getFullYear();
      list = list.filter((i: any) => {
        const d = new Date(i.created_at);
        return d.getMonth() === mm && d.getFullYear() === yy;
      });
    }

    /* date‑range picker */
    if (dateRange && dateRange.length === 2 && dateRange[0] && dateRange[1]) {
      let [start, end] = dateRange as [Date, Date];
      if (start > end) [start, end] = [end, start];

      const startDay = new Date(start); startDay.setHours(0, 0, 0, 0);
      const endDay   = new Date(end);   endDay.setHours(23, 59, 59, 999);

      list = list.filter((i: any) => {
        const d = new Date(i.created_at);
        return d >= startDay && d <= endDay;
      });
    }

    setFiltered(list);
  }, [data, globalFilter, monthDate, dateRange]);

  /* run whenever deps change */
  useEffect(() => applyFilters(), [applyFilters]);

  /* ------------------------------------------------------------------ */
  /* handlers ---------------------------------------------------------- */
  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setGlobalFilter(val);

    if (typingTimeout.current) clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(applyFilters, 300);
  };

  const onRangeChange = (e: { value: (Date | null)[] | null }) => {
    setDateRange(e.value);
  };

  const onViewDoc = useCallback(async (fw_req_id: any) => {
        console.log("onViewDoc: ", fw_req_id)
        openModal({ view: <div style={{ height: '100vh', maxHeight: '80vh' }}>{fw_req_id}</div>, className: "", header: "ເອກະສານ", customSize: "1000px", dialogFooter: null });
    }, [openModal]);

  /* ------------------------------------------------------------------ */
  /* header UI --------------------------------------------------------- */
  const header = (
    <div className="flex flex-wrap md:flex-nowrap justify-between items-center gap-2">
      <div className="flex flex-wrap gap-2 flex-1">
        <InputText
          type="search"
          placeholder="ຄົ້ນຫາ"
          value={globalFilter}
          onChange={onSearchChange}
          className="input-text flex-1 md:max-w-15rem max-w-20rem"
        />

        {/* month picker */}
        <Calendar
          value={monthDate}
          onChange={(e) => setMonthDate(e.value)}
          showIcon
          showButtonBar
          view="month"
          dateFormat="mm/yy"
          className="w-auto calendar-search"
        />

        {/* range picker */}
        <Calendar
          placeholder="ໄລຍະ ເລີ່ມ - ສຸດທ້າຍ"
          selectionMode="range"
          readOnlyInput
          showButtonBar
          showIcon
          value={dateRange}
          onChange={onRangeChange}
          className="w-auto calendar-search"
        />
      </div>
    </div>
  );

  /* ------------------------------------------------------------------ */
  return (
    <div>
      {header}

      <DataTable
        dataKey="leave_req_id"
        value={filtered}
        rows={10}
        paginator
        ref={dt}
        sortField="leave_req_id"
        sortOrder={1}
        rowsPerPageOptions={[10, 25, 50]}
        selection={selectedItem}
        onSelectionChange={(e) => setSelectedItem(e.value as any)}
        className="datatable-responsive"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        emptyMessage={<EmptyData />}
        responsiveLayout="scroll"
      >
        {GetColumns({ onViewDoc }).map((col, idx) =>
          React.cloneElement(col, { key: `col-${idx}` })
        )}
      </DataTable>
    </div>
  );
}
