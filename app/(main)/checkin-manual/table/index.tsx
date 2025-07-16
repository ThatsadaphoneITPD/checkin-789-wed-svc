/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { DataTable } from 'primereact/datatable';

import Create from './create';
import EmptyData from '@/app/shared/empty-table/container';
import { GetColumns } from './columns';
import { Checkin } from '@/types';
import { MenuItem } from 'primereact/menuitem';
import { SelectButton, SelectButtonChangeEvent } from 'primereact/selectbutton';

interface JustifyOption {
    icon: string;
    name: string;
    value: string;
}

export default function CheckinManual() {
  /* ------------------------------------------------------------------ */
  /* Static sample data ------------------------------------------------ */
  const dataManual = useMemo(
    () => [
      {
        id: 1,
        emp_code: '44697',
        check_date: '2025-07-01T06:08:00',
        status_in_out: 'in',
        comments: 'Arrived early to prep meeting',
      },
      {
        id: 2,
        emp_code: '44334',
        check_date: '2025-07-02T15:09:00',
        status_in_out: 'out',
        comments: 'Left after project hand‑off',
      },
      {
        id: 3,
        emp_code: '17698',
        check_date: '2025-07-03T06:06:00',
        status_in_out: 'in',
      },
      {
        id: 4,
        emp_code: '28893',
        check_date: '2025-07-04T08:30:00',
        status_in_out: 'out',
        comments: 'Stayed late for system patch',
      },
      {
        id: 5,
        emp_code: '44276',
        check_date: '2025-07-17T07:07:30',
        status_in_out: 'in',
        comments: 'Traffic delay — informed supervisor',
      },
    ],
    []
  );

  /* ------------------------------------------------------------------ */
  /* State ------------------------------------------------------------- */
  const [selectedItem, setSelectedItem] = useState<any[]>([]);
  const [rowData, setRowdata] = useState<Checkin.CheckinManual | null>(null);

 // 1️⃣ state – an array (0‑, 1‑, or 2‑element) or null
  const [dateRange, setDateRange] = useState<(Date | null)[] | null>(null);

  const [globalFilter, setGlobalFilter] = useState<string>('');

  const [filteredData, setFilteredData] = useState<any[]>(dataManual);

  const typingTimeout = useRef<NodeJS.Timeout | null>(null);
  const dt = useRef<DataTable<any>>(null);
  const [activeIndex, setActiveIndex] = useState<JustifyOption>(null);
  const items: JustifyOption[] = [
      { value: 'in', name: "ກົດເຂົ້າ", icon: 'pi pi-sign-in' },
      { value: 'out', name: "ກົດອອກ", icon: 'pi pi-sign-out' },
  ];

  /* ------------------------------------------------------------------ */
  /* Filtering --------------------------------------------------------- */
  const applyFilters = useCallback(() => {
  let data = dataManual;

    /* text filter */
    if (globalFilter.trim()) {
      const lower = globalFilter.toLowerCase();
      data = data.filter((item) =>
        item.emp_code.toLowerCase().includes(lower)
      );
    }

    /* date‑range filter */
   if (dateRange && dateRange.length === 2 && dateRange[0] && dateRange[1]) {
      // always make start <= end
      let [start, end] = dateRange as [Date, Date];
      if (start > end) [start, end] = [end, start];

      // set start to 00:00 and end to 23:59 so whole days are included
      const startDay = new Date(start); startDay.setHours(0, 0, 0, 0);
      const endDay   = new Date(end);   endDay.setHours(23, 59, 59, 999);

      data = data.filter((item) => {
        const d = new Date(item.check_date);
        return d >= startDay && d <= endDay;
      });
    }


    setFilteredData(data);
  }, [dataManual, globalFilter, dateRange]);

  /* run filters when deps change */
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  /* ------------------------------------------------------------------ */
  /* Handlers ---------------------------------------------------------- */
  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setGlobalFilter(val);

    /* debounce to reduce re‑filtering on every keystroke */
    if (typingTimeout.current) clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => applyFilters(), 300);
  };

  // 2️⃣ handler accepts PrimeReact’s event
  const onDateChange = (e: { value: (Date | null)[] | null }) => { setDateRange(e.value as (Date | null)[] | null);};

  const onViewDoc = useCallback(async (rowData: any) => {
    setRowdata(rowData);
  }, []);

  /* ------------------------------------------------------------------ */
  /* Header ------------------------------------------------------------ */
  const justifyTemplate = (option: JustifyOption) => {
    return <i className={option?.icon}> {option?.name}</i>;
  }
  
  const header = (
    <div className="flex flex-wrap md:flex-nowrap justify-between items-start md:items-center gap-2">
      <div className="header-table flex flex-wrap gap-2 flex-1">
        <InputText
          type="search"
          placeholder="ຄົ້ນຫາ ລະຫັດ"
          className="input-text flex-1 md:max-w-15rem max-w-20rem"
          value={globalFilter}
          onChange={onSearchChange}
        />

        <Calendar
          placeholder='ໄລຍະ ເລີ່ນ - ສຸດທ້າຍ '
          value={dateRange}
          onChange={onDateChange}
          selectionMode="range"
          readOnlyInput
          showButtonBar
          showIcon
          className="w-auto calendar-search"
        />
        <SelectButton value={activeIndex} onChange={(e: SelectButtonChangeEvent) => setActiveIndex(e.value)} itemTemplate={justifyTemplate} optionLabel="value" options={items} />
      </div>
    </div>
  );

  /* ------------------------------------------------------------------ */
  return (
    <div className="grid">
      {/* left panel */}
      <div className="col-12 md:col-3">
        <Create rowItem={rowData || undefined} setRowData={setRowdata} />
      </div>

      {/* right panel */}
      <div className="col-12 md:col-9">
        {header}

        <div className="card_manual mt-2">
          <DataTable
            dataKey="id"
            value={filteredData}
            rows={10}
            paginator
            ref={dt}
            sortField="id"
            sortOrder={-1}
            selection={selectedItem}
            onSelectionChange={(e) => setSelectedItem(e.value as any)}
            rowsPerPageOptions={[10, 25, 50]}
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
      </div>
    </div>
  );
}
