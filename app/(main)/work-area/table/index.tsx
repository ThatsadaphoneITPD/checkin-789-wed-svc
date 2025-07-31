'use client';

import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Nullable } from 'primereact/ts-helpers';
import EmptyData from '@/app/shared/empty-table/container';
import { GetColumns } from './columns';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { useUsersStore } from '@/app/store/user/usersStore';
import Create from './create';
import { useLocationStore, useWorkAreaStore } from '@/app/store';
import { Dropdown } from 'primereact/dropdown';

export default function MobileUserTable() {
  const { loading } = useUsersStore();
  const { dataworkarea, getzWorkAreaData } = useWorkAreaStore();
  const { dataLocation, getzLocationData } = useLocationStore();
  const [selectedDep, setSelectedDep] = useState<Nullable<number>>(null);

  const { openModal } = useModal();
  const [selectedItem, setSelectedItem] = useState<any[]>([]);
  const dt = useRef<DataTable<any>>(null);

  const [workplace, setWorkplace] = useState<Nullable<string>>('');
  const [filteredWorkarea, setFilteredWorkarea] = useState<any[]>([]);

  // Fetch initial data
  useEffect(() => {
    getzLocationData()
    getzWorkAreaData();
  }, [getzWorkAreaData]);

  const optionLocations = useMemo(
    () =>
      Object?.values(dataLocation).map(e => ({
        option_name: `${e.location_name}`,
        id: e.location_id
      })),
    [dataLocation]
  );

  // Debounce + filter logic
  useEffect(() => {
    const timeout = setTimeout(() => {
      const keyword = workplace?.toLowerCase().trim() || '';
      let filtered = [...dataworkarea];

      if (keyword) {
        filtered = filtered.filter((w) =>
          w.area_name.toLowerCase().includes(keyword)
        );
      }

      if (selectedDep !== null) {
        filtered = filtered.filter((w) => w.location_id === selectedDep);
      }

      setFilteredWorkarea(filtered);
    }, 150);

    return () => clearTimeout(timeout);
  }, [workplace, dataworkarea, selectedDep]);



  // Open modal to view document
  const onViewDoc = useCallback(
    async (fw_req_id: any) => {
      openModal({
        view: <div style={{ height: '100vh', maxHeight: '80vh' }}>{fw_req_id}</div>,
        className: '',
        header: 'ເອກະສານ',
        customSize: '1000px',
        dialogFooter: null,
      });
    },
    [openModal]
  );

  // Header UI
  const header = (
    <div className="card-no-bro">
      <div className="p-3 flex flex-wrap md:flex-nowrap justify-between items-start md:items-center gap-2">
        <div className="header-table flex flex-wrap gap-2 flex-1">
          <InputText
            type="search"
            placeholder="ຄົ້ນຫາ ຊື່ສະຖານທີ"
            className="input-text"
            value={workplace ?? ''}
            onChange={(e) => setWorkplace(e.target.value)}
          />
          <Dropdown
            showClear
            options={optionLocations}
            value={selectedDep}
            onChange={(e: any) => {
              setSelectedDep(e.value ?? null);
            }}
            optionLabel="option_name"
            optionValue="id"
            placeholder="ເລືອກ ຝ່າຍ/ສາຂາ"
            className="w-full ml-0 md:ml-2 md:w-10rem"
          />
        </div>
        <div className="flex gap-2">
          <Create />
        </div>
      </div>
    </div>
  );

  const TitleComponent = () => {
    return (
      <div className="flex flex-wrap align-items-center justify-content-between gap-2">
        <span style={{color: "#2f54eb"}} className="text-xl font-bold">ຈັດການ-ຕັ້ງຄ່າ ພີກັດຫ້ອງການ</span>
      </div>
    );
  };

  return (
    <div>
      <TitleComponent/>
      {header}
      <DataTable
        dataKey="_key"
        size="small"
        rows={10}
        paginator
        ref={dt}
        sortField="id"
        sortOrder={1}
        value={filteredWorkarea.map((w, index) => ({
          ...w,
          _key: index + 1, // Ensure unique key per row
        }))}
        selection={selectedItem}
        onSelectionChange={(e) => setSelectedItem(e.value)}
        rowsPerPageOptions={[10, 25, 50]}
        className="datatable-responsive"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        emptyMessage={<EmptyData emptytext="ຂໍ້ມູນ ວ່າງເປົ່າ" />}
        loading={loading}
        responsiveLayout="scroll"
      >
        {GetColumns({ onViewDoc }).map((col, idx) =>
          React.cloneElement(col, { key: `col-${idx}` })
        )}
      </DataTable>
    </div>
  );
}
