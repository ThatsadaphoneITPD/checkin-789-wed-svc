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
import Create from './create';
import EmptyData from '@/app/shared/empty-table/container';
import { GetColumns } from './columns';
import { Checkin } from '@/types';
import { useCheckinManualStore } from '@/app/store';

interface JustifyOption {
  icon: string;
  name: string;
  value: string;
}

export default function CheckinManual() {
  const { dataCheckinManual, getzCheckinManualData, } = useCheckinManualStore();

  /* ------------------------------------------------------------------ */
  const [selectedItem, setSelectedItem] = useState<any[]>([]);
  const [rowData, setRowdata] = useState<Checkin.CheckinManual | null>(null);
  const [dateRange, setDateRange] = useState<(Date | null)[] | null>(null);
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);
  const dt = useRef<DataTable<any>>(null);

  /* ------------------------------------------------------------------ */
  // 🔁 Initial API fetch once
  useEffect(() => {
    getzCheckinManualData('');
  }, []);

  /* 🔍 Filter by date range */
  const applyFilters = useCallback(() => {
    let data = dataCheckinManual;

    if (dateRange && dateRange.length === 2 && dateRange[0] && dateRange[1]) {
      let [start, end] = dateRange;
      if (start > end) [start, end] = [end, start];

      const startDay = new Date(start); startDay.setHours(0, 0, 0, 0);
      const endDay = new Date(end); endDay.setHours(23, 59, 59, 999);

      data = data.filter((item) => {
        const d = new Date(item.punch_time);
        return d >= startDay && d <= endDay;
      });
    }

    setFilteredData(data);
  }, [dataCheckinManual, dateRange]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  /* ------------------------------------------------------------------ */
  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setGlobalFilter(val);

    if (typingTimeout.current) clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      getzCheckinManualData(val.trim());
    }, 300);
  };

  const onDateChange = (e: { value: (Date | null)[] | null }) => {
    setDateRange(e.value);
  };

  const onViewDoc = useCallback((rowData: any) => {
    setRowdata(rowData);
  }, []);

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
          placeholder='ໄລຍະ ເລີ່ນ - ສຸດທ້າຍ'
          value={dateRange}
          onChange={onDateChange}
          selectionMode="range"
          readOnlyInput
          showButtonBar
          showIcon
          className="w-auto calendar-search"
        />

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
            dataKey="checkin_id"
            value={filteredData}
            rows={10}
            paginator
            ref={dt}
            sortField="checkin_id"
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
