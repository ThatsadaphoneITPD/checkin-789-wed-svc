/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { DataTable } from 'primereact/datatable';
import { Nullable } from 'primereact/ts-helpers';

import { useFieldWorkStore } from '@/app/store/field-work/fieldWorkStore';
import { useModal } from '@/app/shared/modal-views/use-modal';
import EmptyData from '@/app/shared/empty-table/container';
import { GetColumns } from './columns';

export default function FieldWorkTable() {
  const { data, getFieldWorkData } = useFieldWorkStore();
  const { openModal } = useModal();

  /* ------------------------------- state -------------------------------- */
  const [globalFilter, setGlobalFilter] = useState('');
  const [monthDate, setMonthDate] = useState<Nullable<Date>>(null);          // month picker
  const [dateRange, setDateRange] = useState<(Date | null)[] | null>(null);  // range picker
  const [filtered, setFiltered] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<any[]>([]);

  const typingTimeout = useRef<NodeJS.Timeout | null>(null);
  const dt = useRef<DataTable<any>>(null);

  /* ------------------------------- fetch -------------------------------- */
  useEffect(() => {
    getFieldWorkData();
  }, []);

  /* --------------------------- combined filter -------------------------- */
  const applyFilters = useCallback(() => {
    let list = data;

    /* text search */
    if (globalFilter.trim()) {
      const lower = globalFilter.toLowerCase();
      list = list.filter(
        (i: any) =>
          i.fw_req_id?.toString().toLowerCase().includes(lower) ||
          i.emp_code?.toLowerCase().includes(lower) ||
          i.description?.toLowerCase().includes(lower)
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

  useEffect(() => applyFilters(), [applyFilters]);

  /* ------------------------------ handlers ----------------------------- */
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

  /* ------------------------------- header ------------------------------ */
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

        <Calendar
          value={monthDate}
          onChange={(e) => setMonthDate(e.value)}
          view="month"
          dateFormat="mm/yy"
          showIcon
          showButtonBar
          className="w-auto calendar-search"
        />

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

  /* ------------------------------- table ------------------------------- */
  return (
    <div>
      {header}

      <DataTable
        dataKey="fw_req_id"
        value={filtered}
        rows={10}
        paginator
        ref={dt}
        sortField="fw_req_id"
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
