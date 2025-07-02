/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Nullable } from 'primereact/ts-helpers';
import EmptyData from '@/app/shared/empty-table/container';
import { GetColumns } from './columns';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { useUsersStore } from '@/app/store/user/usersStore';
import Create from './create';

export default function MobileUserTable() {
  const { loading } = useUsersStore();

  /* static sample data */
  const workarea = useMemo(
    () => [
      { id: 1, area_name: 'ສຳນັກງານໃຫຍ່', longitude: 102.629301, latitude: 17.940424, radius_km: 0.18 },
      { id: 2, area_name: 'ໂຮງຮຽນ ອະນຸບານ', longitude: 102.626433, latitude: 17.932805, radius_km: 0.1 },
    ],
    []
  );

  const { openModal } = useModal();
  const [selectedItem, setSelectedItem] = useState<any[]>([]);
  const dt = useRef<DataTable<any>>(null);

  const [workplace, setWorkplace] = useState<Nullable<string>>('');
  const [filteredWorkarea, setFilteredWorkarea] = useState(workarea);

  /* --- debounce + filter ------------------------------------------------ */
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!workplace?.trim()) {
        setFilteredWorkarea(workarea); // reset if empty
      } else {
        const lower = workplace.toLowerCase();
        setFilteredWorkarea(
          workarea.filter((w) => w.area_name.toLowerCase().includes(lower))
        );
      }
    }, 300); // 300‑ms debounce

    return () => clearTimeout(timeout);
  }, [workplace, workarea]);
  /* ---------------------------------------------------------------------- */

  /* open modal callback */
 const onViewDoc = useCallback(
        async (fw_req_id: any) => {
            console.log("onViewDoc: ", fw_req_id);
            openModal({
                view: <div style={{ height: '100vh', maxHeight: '80vh' }}>{fw_req_id}</div>,
                className: "",
                header: "ເອກະສານ",
                customSize: "1000px",
                dialogFooter: null,
            });
        },
        [openModal]
    );

  /* header with search + create button */
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
        value={filteredWorkarea.map((w) => ({ ...w, _key: w.id }))}
        selection={selectedItem}
        onSelectionChange={(e) => setSelectedItem(e.value as any)}
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
