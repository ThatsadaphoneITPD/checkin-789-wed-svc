import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { GetColumns } from './colums';
import toast from 'react-hot-toast';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { Nullable } from 'primereact/ts-helpers';
import { Calendar } from 'primereact/calendar';
import { useFileCheckStore, useOvertimeStore, authenStore } from '@/app/store';
import EmptyData from '@/app/shared/empty-table/container';
import { SelectButton, SelectButtonChangeEvent } from 'primereact/selectbutton';
import { useDepartmentStore } from '@/app/store/departments/deparmentStore';
import { useDivisionStore } from '@/app/store/divisions/divisionStore';
import { Dropdown } from 'primereact/dropdown';
interface JustifyOption {
  icon: string;
  name?: string;
  value?: string;
}

export default function SickLeaveTable() {
  const { authData } = authenStore();
  const { getOvertimePath, dataOvertime } = useOvertimeStore();
  const { openModal } = useModal();
  const { getFile } = useFileCheckStore();
  const { datadep } = useDepartmentStore();
  const { datadiv, getDivisionByDepId } = useDivisionStore();
  const [selectedDep, setSelectedDep] = useState<Nullable<string>>(null);
  const [selectedDiv, setSelectedDiv] = useState<Nullable<string>>(null);

  const finaldep = datadep.map(dep => ({
    option_name: `${dep?.department_name}[${dep?.id}]`,
    id: dep?.id
  }));

  const finaldiv = datadiv.map(div => ({
    option_name: `${div?.division_name}[${div?.id}]`,
    id: div?.id
  }));

  /* ---------- local state ---------- */
  const [selectedItem, setSelectedItem] = useState<any[]>([]);
  const [dateRange, setDateRange] = useState<(Date | null)[] | null>(null);   // ⇦ only keep range
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);
  const dt = useRef<DataTable<any>>(null);
  const items: JustifyOption[] = [
    { value: 'GetAllPending', name: "ລໍຖ້າອະນຸມັດ", icon: 'pi pi-hourglass' },
    { value: 'GetOvertimes', name: "ທັງໝົດ", icon: 'pi pi-check-circle' },
  ];

  // ✅ Set first item as default
  const [activeIndex, setActiveIndex] = useState<JustifyOption | null>(items[0]);

  /* ---------- data load ---------- */
  useEffect(() => {
    // Guard clause: only run when authData is loaded
    if (!authData || !authData.role) return;

    if (authData.role === "admin") {
      getOvertimePath(activeIndex?.value, {});
    } else if (authData.role === "branchadmin") {
      getOvertimePath(activeIndex?.value, {
        department_id: authData.department_id,
        division_id: authData.division_id,
      });
    }
  }, [authData, activeIndex, getOvertimePath]);

  useEffect(() => {
    // Only run if authData is fully loaded​
    getOvertimePath(activeIndex?.value, {
      department_id: selectedDep,
      division_id: selectedDiv,
    });
  }, [selectedDep, selectedDiv, authData]);


  useEffect(() => { setFilteredData(dataOvertime); }, [dataOvertime]);

  /* ---------- view file ---------- */
  const onViewDoc = useCallback(async (file_path: any) => {
    console.log("onViewDoc: ", file_path);
    const fileDoc = await getFile("Overtime", file_path);

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

  /* ---------- global search ---------- */
  const searchGlobal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filterValue = e.target.value;
    setGlobalFilter(filterValue);

    if (typingTimeout.current) clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => filterData(filterValue), 300);
  };

  const filterData = (filter: string) => {
    if (!filter.trim()) {
      setFilteredData(applyDateRangeFilter(dataOvertime, dateRange));
      return;
    }
    const lower = filter.toLowerCase();
    const searched = dataOvertime?.filter((r: any) =>
      r?.leave_req_id?.toString().toLowerCase().includes(lower) ||
      r?.emp_code?.toString().toLowerCase().includes(lower) ||
      r?.reasons?.toLowerCase().includes(lower),
    );
    setFilteredData(applyDateRangeFilter(searched, dateRange));
  };

  /* ---------- date‑range filter ---------- */
  useEffect(() => {
    setFilteredData(applyDateRangeFilter(dataOvertime, dateRange));
  }, [dateRange, dataOvertime]);

  const applyDateRangeFilter = (data: any[] = [], rng: (Date | null)[] | null) => {
    if (!rng || rng.length < 2 || !rng[0] || !rng[1]) return data;

    // always make start ≤ end
    let [start, end] = rng as [Date, Date];
    if (start > end) [start, end] = [end, start];

    // start 00:00, end 23:59
    const startDay = new Date(start); startDay.setHours(0, 0, 0, 0);
    const endDay = new Date(end); endDay.setHours(23, 59, 59, 999);

    return data.filter((item) => {
      // use whichever date field your API returns
      const d = new Date(item.punch_time ?? item.punch_time);
      return d >= startDay && d <= endDay;
    });
  };

  const justifyTemplate = (option: JustifyOption) => (
    <div className="flex align-items-center gap-2 py-0">
      <i className={option.icon}></i>
      <span className="font-semibold text-sm">{option.name}</span>
    </div>
  );

  /* ---------- table header ---------- */
  const header = (
    <div className="flex flex-wrap md:flex-nowrap justify-between items-start md:items-center gap-2">
      <div className="header-table flex flex-wrap gap-2 flex-1">
        <InputText
          type="search"
          placeholder="ລະຫັດ"
          className="input-text w-full md:w-10rem "
          value={globalFilter}
          onChange={searchGlobal}
        />

        <Calendar
          placeholder="ໄລຍະ ເລີ່ມ - ສຸດທ້າຍ"
          value={dateRange}
          onChange={(e) => setDateRange(e.value as (Date | null)[] | null)}
          selectionMode="range"
          readOnlyInput
          showButtonBar
          showIcon
          className="w-full md:w-12rem  calendar-search"
        />
        {authData.role === "admin" &&
          <>
            <Dropdown
              showClear
              options={finaldep}
              value={selectedDep}
              onChange={(e: any) => {
                const depId = e.value;
                setSelectedDep(depId);
                setSelectedDiv(null); // reset division if department changes
                getDivisionByDepId(depId || null);
              }}
              optionLabel="option_name"
              optionValue="id"
              placeholder="ເລືອກ ຝ່າຍ"
              className="w-full sm:ml-2 md:w-10rem mt-2 md:mt-0"
            />
            <Dropdown
              showClear
              options={finaldiv}
              value={selectedDiv}
              onChange={(e: any) => {
                setSelectedDiv(e.value)
              }}
              optionLabel="option_name"
              optionValue="id"
              placeholder="ເລືອກ ພະແນກ"
              className="w-full sm:ml-2 md:w-10rem mt-2 md:mt-0"
            />
          </>
        }
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

  /* ---------- render ---------- */
  return (
    <div>
      {header}

      <DataTable
        dataKey="ot_id"
        rows={10}
        paginator
        ref={dt}
        sortField="ot_id"
        sortOrder={-1}
        value={filteredData?.map((r, i) => ({ ...r, _key: `${r.leave_req_id ?? 'row'}-${i}` }))}
        selection={selectedItem}
        onSelectionChange={(e) => setSelectedItem(e.value as any)}
        rowsPerPageOptions={[10, 25, 30, 40, 50, 100]}
        className="datatable-responsive"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Max"
        emptyMessage={<EmptyData />}
        responsiveLayout="scroll"
      >
        {GetColumns({ onViewDoc }).map((col, i) => React.cloneElement(col, { key: `column-${i}` }))}
      </DataTable>
    </div>
  );
}
