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
import { Nullable } from 'primereact/ts-helpers';

import { useOutSideWorkStore } from '@/app/store/outside-work/outSideWorkStore';
import EmptyData from '@/app/shared/empty-table/container';
import { GetColumns } from './columns';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { useFileCheckStore } from '@/app/store';
import toast from 'react-hot-toast';
import { SelectButton, SelectButtonChangeEvent } from 'primereact/selectbutton';
interface JustifyOption {
  icon: string;
  name?: string;
  value?: string;
}

export default function OutSideWorkTable() {
  const { data, getOutSideWorkData, getOutSideWorkPath } = useOutSideWorkStore();
  const { openModal } = useModal();
  const { getFile } = useFileCheckStore();

  /* ------------------------------------------------------------------ */
  /* State ------------------------------------------------------------- */
  const [globalFilter, setGlobalFilter] = useState('');
  const [dateRange, setDateRange] = useState<(Date | null)[] | null>(null);
  const [monthDate, setMonthDate] = useState<Nullable<Date>>(null); // keep if you still need month filtering
  const [filtered, setFiltered] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<any[]>([]);
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);
  const dt = useRef<DataTable<any>>(null);
  const items: JustifyOption[] = [
    { value: 'GetAllPending', name: "ລໍຖ້າອະນຸມັດ", icon: 'pi pi-hourglass' },
    { value: 'GetWorkOutsides', name: "ທັງໝົດ", icon: 'pi pi-check-circle' },
  ];

  // ✅ Set first item as default
  const [activeIndex, setActiveIndex] = useState<JustifyOption | null>(items[0]);

  /* ------------------------------------------------------------------ */
  /* Fetch initial data ------------------------------------------------ */
  useEffect(() => {
    // getOutSideWorkData();
    getOutSideWorkPath(activeIndex?.value)
  }, [activeIndex]);

  /* ------------------------------------------------------------------ */
  /* Combined filter fn ------------------------------------------------ */
  const applyFilters = useCallback(() => {
    let list = data;

    /* text search */
    if (globalFilter.trim()) {
      const lower = globalFilter.toLowerCase();
      list = list.filter(
        (i: any) =>
          i.work_out_id?.toString().toLowerCase().includes(lower) ||
          i.emp_code?.toLowerCase().includes(lower) ||
          i.description?.toLowerCase().includes(lower)
      );
    }

    /* date‑range filter (inclusive) */
    if (dateRange && dateRange.length === 2 && dateRange[0] && dateRange[1]) {
      let [start, end] = dateRange as [Date, Date];
      if (start > end) [start, end] = [end, start]; // order safety

      // include whole days
      const startDay = new Date(start);
      startDay.setHours(0, 0, 0, 0);
      const endDay = new Date(end);
      endDay.setHours(23, 59, 59, 999);

      list = list.filter((i: any) => {
        const d = new Date(i.punch_time);
        return d >= startDay && d <= endDay;
      });
    }

    /* optional month filter */
    if (monthDate) {
      const mm = monthDate.getMonth();
      const yy = monthDate.getFullYear();
      list = list.filter((i: any) => {
        const d = new Date(i.punch_time);
        return d.getMonth() === mm && d.getFullYear() === yy;
      });
    }

    setFiltered(list);
  }, [data, globalFilter, dateRange, monthDate]);

  /* run every time deps change */
  useEffect(() => applyFilters(), [applyFilters]);

  /* ------------------------------------------------------------------ */
  /* Handlers ---------------------------------------------------------- */
  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setGlobalFilter(val);
    if (typingTimeout.current) clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(applyFilters, 300);
  };

  const onRangeChange = (e: { value: (Date | null)[] | null }) => {
    setDateRange(e.value);
  };

  /* ------------------------------------------------------------------ */
  const justifyTemplate = (option: JustifyOption) => (
    <div className="flex align-items-center gap-2 py-0">
      <i className={option.icon}></i>
      <span className="font-semibold text-sm">{option.name}</span>
    </div>
  );
  /* Header UI --------------------------------------------------------- */
  const header = (
    <div className="flex flex-wrap md:flex-nowrap justify-between items-start md:items-center gap-2">
      <div className="header-table flex flex-wrap gap-2 flex-1">
        <InputText
          type="search"
          placeholder="ຄົ້ນຫາ"
          value={globalFilter}
          onChange={onSearchChange}
          className="input-text flex-1 md:max-w-15rem max-w-20rem"
        />

        {/* optional month picker */}
        <Calendar
          value={monthDate}
          onChange={(e) => setMonthDate(e.value)}
          view="month"
          dateFormat="mm/yy"
          showIcon
          showButtonBar
          className="w-auto calendar-search"
        />

        {/* date‑range picker */}
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
        <SelectButton
          className="p-button-outlined"
          value={activeIndex?.value}
          onChange={(e: SelectButtonChangeEvent) => {
            const selectedOption = items.find((item) => item.value === e.value);
            if (selectedOption) setActiveIndex(selectedOption);
          }}
          itemTemplate={justifyTemplate}
          optionLabel="name"
          options={items}
        />
      </div>
    </div>
  );

  const onViewDoc = useCallback(async (file_path: any) => {
    console.log("onViewDoc: ", file_path);
    const fileDoc = await getFile("WorkOutside", file_path);

    if (!fileDoc) {
      toast.error("ຮູບບໍ່ພົບເຫັນ 🔍");
      return;
    }

    const fileUrl = URL.createObjectURL(fileDoc);
    const isPDF = file_path.toLowerCase().endsWith(".pdf");

    const PdfView = (
      <embed
        src={fileUrl}
        type="application/pdf"
        width="100%"
        height="100%"
        style={{ border: "none" }}
      />
    );

    if (isPDF) {
      openModal({
        view: <div style={{ height: "100vh", maxHeight: "80vh" }}>{PdfView}</div>,
        className: "",
        header: "ເອກະສານ",
        customSize: "1000px",
        dialogFooter: null,
      });
    }
  }, [openModal]);

  /* ------------------------------------------------------------------ */
  return (
    <div>
      {header}

      <DataTable dataKey="work_out_id" value={filtered}
        rows={10} paginator
        ref={dt}
        sortField="work_out_id"
        sortOrder={-1}
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
