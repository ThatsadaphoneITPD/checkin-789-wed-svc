'use client';

import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useRef, useState } from 'react';
import { GetColumns } from './columns';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { Nullable } from 'primereact/ts-helpers';
import EmptyData from '@/app/shared/empty-table/container';
import { useUsersStore } from '@/app/store/user/usersStore';
import { useDepartmentStore } from '@/app/store/departments/deparmentStore';
import { Dropdown } from 'primereact/dropdown';
import { useDivisionStore } from '@/app/store/divisions/divisionStore';
import { useLocationStore, useWorkAreaStore } from '@/app/store';

export default function MobileUserTable() {
    const { dataUser, getUsersData, page, totalCount, pageSize } = useUsersStore();
    const { getzWorkAreaData } = useWorkAreaStore();
    const { getzLocationData } = useLocationStore();
    const { datadep } = useDepartmentStore();
    const { datadiv, getDivisionByDepId } = useDivisionStore();

    const [emcode, setEmcode] = useState<Nullable<string>>('');
    const [filtered, setFiltered] = useState<any[]>([]);
    const [debouncedEmcode, setDebouncedEmcode] = useState<Nullable<string>>('');
    const [selectedItem, setSelectedItem] = useState<any[]>([]);
    const [selectedDep, setSelectedDep] = useState<Nullable<string>>(null);
    const [selectedDiv, setSelectedDiv] = useState<Nullable<string>>(null);

    const { openModal } = useModal();
    const dt = useRef<DataTable<any>>(null);

    const finaldep = datadep.map(dep => ({
        option_name: `${dep?.department_name}[${dep?.id}]`,
        id: dep?.id
    }));

    const finaldiv = datadiv.map(div => ({
        option_name: `${div?.division_name}[${div?.id}]`,
        id: div?.id
    }));

    useEffect(() => {
        getzLocationData()
        getzWorkAreaData();
    }, [getzWorkAreaData, getzLocationData]);

    // Debounce empcode input
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedEmcode(emcode), 300);
        return () => clearTimeout(handler);
    }, [emcode]);

    // Fetch users when filters change
    useEffect(() => {
        getUsersData({
            empCode: debouncedEmcode,
            department_id: selectedDep || undefined,
            division_id: selectedDiv || undefined,
            page,
            pageSize,
        });
    }, [debouncedEmcode, selectedDep, selectedDiv, page, pageSize]);

    // Update filtered state after data fetched
    useEffect(() => {
        const delay = setTimeout(() => {
            setFiltered(dataUser);
        }, 150);
        return () => clearTimeout(delay);
    }, [dataUser]);

    const onPage = (e: any) => {
        getUsersData({
            empCode: debouncedEmcode,
            department_id: selectedDep || undefined,
            division_id: selectedDiv || undefined,
            page: e.page + 1,
            pageSize: e.rows,
        });
    };

    const header = (
        <div className="card-no-bro flex flex-column md:flex-row gap-2 justify-content-start">
            <div className="m-4">
                <InputText
                    type="search"
                    placeholder="ລະຫັດ ພະນັກງານ"
                    className="w-full md:w-20rem"
                    value={emcode || ''}
                    onChange={(e) => setEmcode(e.target.value)}
                />
                <Dropdown
                    showClear
                    options={finaldep}
                    value={selectedDep}
                    onChange={(e: any) => {
                        const depId = e.value;
                        setEmcode('');
                        setSelectedDep(depId);
                        setSelectedDiv(null); // reset division if department changes
                        getDivisionByDepId(depId || null);
                    }}
                    optionLabel="option_name"
                    optionValue="id"
                    placeholder="ເລືອກ ຝ່າຍ"
                    className="w-full sm:ml-2 md:w-20rem mt-2 md:mt-0"
                />
                <Dropdown
                    showClear
                    options={finaldiv}
                    value={selectedDiv}
                    onChange={(e: any) => {
                        setEmcode('');
                        setSelectedDiv(e.value)
                    }}
                    optionLabel="option_name"
                    optionValue="id"
                    placeholder="ເລືອກ ພະແນກ"
                    className="w-full sm:ml-2 md:w-20rem mt-2 md:mt-0"
                />
            </div>
        </div>
    );

    const onViewDoc = (id: any) => {
        openModal({
            view: <div style={{ height: '100vh', maxHeight: '80vh' }}>{id}</div>,
            className: '',
            header: 'ເອກະສານ',
            customSize: '1000px',
            dialogFooter: null,
        });
    };

    return (
        <div>
            {header}
            <DataTable
                dataKey="_key"
                size="small"
                paginator
                ref={dt}
                lazy
                first={(page - 1) * pageSize}
                rows={pageSize}
                totalRecords={totalCount}
                onPage={onPage}
                value={filtered.map((item, index) => ({
                    ...item,
                    _key: (page - 1) * pageSize + index + 1,
                }))}
                selection={selectedItem}
                onSelectionChange={(e) => setSelectedItem(e.value)}
                rowsPerPageOptions={[10, 25, 50, 100]}
                className="datatable-responsive"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="ສະແດງ {first} ຫາ {last} ຈາກ {totalRecords}"
                emptyMessage={<EmptyData emptytext="ຂໍ້ມູນ ວ່າງເປົ່າ" />}
                responsiveLayout="scroll"
            >
                {GetColumns({ onViewDoc }).map((column, index) =>
                    React.cloneElement(column, { key: `column-${index}` })
                )}
            </DataTable>
        </div>
    );
}
