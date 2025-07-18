'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Nullable } from 'primereact/ts-helpers';
import EmptyData from '@/app/shared/empty-table/container';
import { GetColumns } from './columns';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { useUsersStore } from '@/app/store/user/usersStore';
import Create from './create';
import { useWorkAreaStore } from '@/app/store';

export default function MobileUserTable() {
  const { loading } = useUsersStore();
  const { dataworkarea, getzWorkAreaData } = useWorkAreaStore();

  const { openModal } = useModal();
  const [selectedItem, setSelectedItem] = useState<any[]>([]);
  const dt = useRef<DataTable<any>>(null);

  const [workplace, setWorkplace] = useState<Nullable<string>>('');
  const [filteredWorkarea, setFilteredWorkarea] = useState<any[]>([]);

  // Fetch initial data
  useEffect(() => {
    getzWorkAreaData();
  }, [getzWorkAreaData]);

  // Debounce + filter logic
  useEffect(() => {
    const timeout = setTimeout(() => {
      const keyword = workplace?.toLowerCase().trim() || '';
      if (!keyword) {
        setFilteredWorkarea(dataworkarea);
      } else {
        setFilteredWorkarea(
          dataworkarea.filter((w) =>
            w.area_name.toLowerCase().includes(keyword)
          )
        );
      }
    }, 150);

    return () => clearTimeout(timeout);
  }, [workplace, dataworkarea]);

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
            style={{ height: '2.5rem' }}
            placeholder="ຄົ້ນຫາ ຊື່ສະຖານທີ"
            className="input-text"
            value={workplace ?? ''}
            onChange={(e) => setWorkplace(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Create />
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {header}
      <DataTable
        dataKey="_key"
        size="small"
        rows={10}
        paginator
        ref={dt}
        sortField="id"
        sortOrder={1}
        value={filteredWorkarea.map((w) => ({
          ...w,
          _key: w.id, // Ensure unique key per row
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
