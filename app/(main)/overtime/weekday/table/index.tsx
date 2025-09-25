import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { GetColumns } from './columns';
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
  name: string;
  value: string;
}

export default function SickLeaveTable() {
  const { authData } = authenStore();
  const { getOvertimePath, dataOvertime } = useOvertimeStore();
  const { openModal } = useModal();
  const { getFile } = useFileCheckStore();
  const { datadep } = useDepartmentStore();
  const { datadiv, getDivisionByDepId } = useDivisionStore();

  /* ---------- dropdown options ---------- */
  const finaldep = datadep.map(dep => ({
    option_name: `${dep?.department_name}[${dep?.id}]`,
    id: dep?.id,
  }));

  const finaldiv = datadiv.map(div => ({
    option_name: `${div?.division_name}[${div?.id}]`,
    id: div?.id,
  }));

  /* ---------- local state ---------- */
  const [selectedDep, setSelectedDep] = useState<Nullable<string>>(null);
  const [selectedDiv, setSelectedDiv] = useState<Nullable<string>>(null);
  const [selectedItem, setSelectedItem] = useState<any[]>([]);
  const [dateRange, setDateRange] = useState<(Date | null)[] | null>(null);
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);
  const dt = useRef<DataTable<any>>(null);

  /* ---------- status options ---------- */
  const items: JustifyOption[] = useMemo(
    () => [
      { value: 'GetAllPending', name: 'ລໍຖ້າອະນຸມັດ', icon: 'pi pi-hourglass' },
      { value: 'GetOvertimes', name: 'ທັງໝົດ', icon: 'pi pi-check-circle' },
    ],
    []
  );
  const [activeIndex, setActiveIndex] = useState<JustifyOption>(items[0]);

  /* ---------- fetch data ---------- */
  useEffect(() => {
    if (!authData?.role) return;

    // admin: requires filter selections
    if (authData.role === 'admin') {
      getOvertimePath(activeIndex.value, {
        ...(selectedDep ? { department_id: selectedDep } : {}),
        ...(selectedDiv ? { division_id: selectedDiv } : {}),
      });
    }

    // branch admin: always tied to their department/division
    if (authData.role === 'branchadmin') {
      getOvertimePath(activeIndex.value, {
        department_id: authData.department_id,
        division_id: authData.division_id,
      });
    }

    if (authData.role === 'deptadmin') {
      getOvertimePath(activeIndex.value, {
        department_id: authData.department_id,
      });
    }
  }, [authData, activeIndex, selectedDep, selectedDiv, getOvertimePath]);

  /* ---------- filter helpers ---------- */
  const applyDateRangeFilter = (data: any[] = [], rng: (Date | null)[] | null) => {
    if (!rng || rng.length < 2 || !rng[0] || !rng[1]) return data;

    let [start, end] = rng as [Date, Date];
    if (start > end) [start, end] = [end, start];

    const startDay = new Date(start); startDay.setHours(0, 0, 0, 0);
    const endDay = new Date(end); endDay.setHours(23, 59, 59, 999);

    return data.filter(item => {
      const d = new Date(item.punch_time);
      return d >= startDay && d <= endDay;
    });
  };

  const applyAllFilters = (data: any[], search: string, rng: (Date | null)[] | null) => {
    let result = data;
    if (search.trim()) {
      const lower = search.toLowerCase();
      result = result.filter(r =>
        r?.leave_req_id?.toString().toLowerCase().includes(lower) ||
        r?.emp_code?.toString().toLowerCase().includes(lower) ||
        r?.reasons?.toLowerCase().includes(lower)
      );
    }
    return applyDateRangeFilter(result, rng);
  };

  /* ---------- handle filters ---------- */
  useEffect(() => {
    setFilteredData(applyAllFilters(dataOvertime, globalFilter, dateRange));
  }, [dataOvertime, globalFilter, dateRange]);

  const searchGlobal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setGlobalFilter(value);

    if (typingTimeout.current) clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      setFilteredData(applyAllFilters(dataOvertime, value, dateRange));
    }, 300);
  };

  /* ---------- view file ---------- */
  const onViewDoc = useCallback(async (file_path: string) => {
    const fileDoc = await getFile('Overtime', file_path);
    if (!fileDoc) return toast.error('ຮູບບໍ່ພົບເຫັນ 🔍');

    const fileUrl = URL.createObjectURL(fileDoc);
    if (file_path.toLowerCase().endsWith('.pdf')) {
      openModal({
        view: <embed src={fileUrl} type="application/pdf" width="100%" height="100%" style={{ border: 'none' }} />,
        className: "", 
        header: 'ເອກະສານ',
        customSize: '1000px',
        dialogFooter: null,
      });
    }
  }, [getFile, openModal]);


  /* ---------- UI ---------- */
  const header = (
    <div className="flex flex-wrap md:flex-nowrap justify-between items-start md:items-center gap-2">
      <div className="header-table flex flex-wrap gap-2 flex-1">
        <InputText
          type="search"
          placeholder="ລະຫັດ"
          className="input-text w-full md:w-10rem"
          value={globalFilter}
          onChange={searchGlobal}
        />
        <Calendar
          placeholder="ໄລຍະ ເລີ່ມ - ສຸດທ້າຍ"
          value={dateRange}
          onChange={e => setDateRange(e.value as (Date | null)[] | null)}
          selectionMode="range"
          readOnlyInput
          showButtonBar
          showIcon
          className="w-full md:w-12rem calendar-search"
        />
        {authData?.role === 'admin' && (
          <>
            <Dropdown
              showClear
              options={finaldep}
              value={selectedDep}
              onChange={e => {
                setSelectedDep(e.value);
                setSelectedDiv(null);
                getDivisionByDepId(e.value || null);
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
              onChange={e => setSelectedDiv(e.value)}
              optionLabel="option_name"
              optionValue="id"
              placeholder="ເລືອກ ພະແນກ"
              className="w-full sm:ml-2 md:w-10rem mt-2 md:mt-0"
            />
          </>
        )}
        <SelectButton
          className="p-button-outlined"
          value={activeIndex.value}
          onChange={(e: SelectButtonChangeEvent) => {
            const option = items.find(item => item.value === e.value);
            if (option) setActiveIndex(option);
            setSelectedDep(null)
            setSelectedDiv(null)
          }}
          itemTemplate={o => (
            <div className="flex items-center gap-2">
              <i className={o.icon}></i>
              <span className="font-semibold text-sm">{o.name}</span>
            </div>
          )}
          options={items}
          optionLabel="name"
        />
      </div>
    </div>
  );

  return (
    <div>
      {header}
      <DataTable
        ref={dt}
        dataKey="ot_id"
        rows={10}
        paginator
        value={filteredData.map((r, i) => ({ ...r, _key: `${r.leave_req_id ?? 'row'}-${i}` }))}
        selection={selectedItem}
        onSelectionChange={e => setSelectedItem(e.value as any)}
        rowsPerPageOptions={[10, 25, 30, 40, 50, 100]}
        className="datatable-responsive"
        sortField="ot_id"
        sortOrder={-1}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        // currentPageReportTemplate="Max"
        emptyMessage={<EmptyData />}
        responsiveLayout="scroll"
      >
        {GetColumns({ onViewDoc }).map((col, i) => React.cloneElement(col, { key: `column-${i}` }))}
      </DataTable>
    </div>
  );
}
