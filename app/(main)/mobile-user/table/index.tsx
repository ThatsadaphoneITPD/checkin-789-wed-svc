'use client';

import React, { useEffect, useRef, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Nullable } from 'primereact/ts-helpers';

import { GetColumns } from './columns';
import EmptyData from '@/app/shared/empty-table/container';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { authenStore, useLocationStore, useWorkAreaStore } from '@/app/store';
import { useUsersStore } from '@/app/store/user/usersStore';
import { useDepartmentStore } from '@/app/store/departments/deparmentStore';
import { useDivisionStore } from '@/app/store/divisions/divisionStore';

export default function MobileUserTable() {
    const { authData } = authenStore();
    const { dataUser, getUsersData, page, totalCount, pageSize } = useUsersStore();
    const { getzWorkAreaData } = useWorkAreaStore();
    const { getzLocationData } = useLocationStore();
    const { datadep } = useDepartmentStore();
    const { datadiv, getDivisionByDepId } = useDivisionStore();
    const { openModal } = useModal();

    const dt = useRef<DataTable<any>>(null);

    // 🔹 State
    const [emcode, setEmcode] = useState<Nullable<string>>('');
    const [debouncedEmcode, setDebouncedEmcode] = useState<Nullable<string>>('');
    const [filtered, setFiltered] = useState<any[]>([]);
    const [selectedItem, setSelectedItem] = useState<any[]>([]);
    const [selectedDep, setSelectedDep] = useState<Nullable<string>>(null);
    const [selectedDiv, setSelectedDiv] = useState<Nullable<string>>(null);

    // 🔹 Role-based dropdown disable logic
    const buttonDisableDepartment = !['admin'].includes(authData?.role ?? '');
    const buttonDisableDiv = !['admin', 'deptadmin'].includes(authData?.role ?? '');

    // 🔹 Dropdown options
    const finaldep = datadep.map((dep) => ({
        option_name: `${dep.department_name}[${dep.id}]`,
        id: dep.id,
    }));

    const finaldiv = datadiv.map((div) => ({
        option_name: `${div.division_name}[${div.id}]`,
        id: div.id,
    }));

    // 🔹 Initial data fetch
    useEffect(() => {
        getzLocationData();
        getzWorkAreaData();
    }, [getzWorkAreaData, getzLocationData]);

    // 🔹 Debounce empcode
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedEmcode(emcode), 300);
        return () => clearTimeout(handler);
    }, [emcode]);

    // 🔹 Fetch users when filters change
    useEffect(() => {
        if (!authData?.role) return;

        const baseParams = { page, pageSize, role: authData.role };
        let params: any = { ...baseParams };

        switch (authData.role) {
            case 'admin':
                params = {
                    ...params,
                    empCode: debouncedEmcode || undefined,
                    department_id: selectedDep || undefined,
                    division_id: selectedDiv || undefined,
                };
                break;
            case 'deptadmin':
                params = {
                    ...params,
                    department_id: authData.department_id,
                    division_id: selectedDiv || undefined,
                    ...(debouncedEmcode ? { empCode: debouncedEmcode } : {}),
                };
                setSelectedDep(authData.department_id);
                getDivisionByDepId(Number(authData.department_id) || null);
                break;
            case 'branchadmin':
                params = {
                    ...params,
                    department_id: authData.department_id,
                    division_id: authData.division_id,
                    ...(debouncedEmcode ? { empCode: debouncedEmcode } : {}),
                };
                break;
            default:
                break;
        }

        getUsersData(params);
    }, [debouncedEmcode, selectedDep, selectedDiv, page, pageSize, authData]);

    // 🔹 Update filtered state after data fetch
    useEffect(() => {
        const delay = setTimeout(() => setFiltered(dataUser), 150);
        return () => clearTimeout(delay);
    }, [dataUser]);

    // 🔹 Handle pagination
    const onPage = (e: any) => {
        const { role, department_id: authDeptId, division_id: authDivId } = authData || {};

        let department_id: string | undefined;
        let division_id: string | undefined;

        switch (role) {
            case "admin":
                department_id = selectedDep || undefined;
                division_id = selectedDiv || undefined;
                break;

            case "deptadmin":
                department_id = authDeptId;
                division_id = selectedDiv || undefined;
                break;

            default: // branchadmin or others
                department_id = authDeptId;
                division_id = authDivId;
                break;
        }

        getUsersData({
            empCode: debouncedEmcode || undefined,
            department_id,
            division_id,
            page: e.page + 1,
            pageSize: e.rows,
        });
    };


    // 🔹 Open modal
    const onViewDoc = (id: any) => {
        openModal({
            view: <div style={{ height: '100vh', maxHeight: '80vh' }}>{id}</div>,
            className: '',
            header: 'ເອກະສານ',
            customSize: '1000px',
            dialogFooter: null,
        });
    };

    // 🔹 Table header
    const header = (
        <div className="card-no-bro flex flex-column md:flex-row gap-2 justify-content-start">
            <div className="m-4 flex flex-col md:flex-row gap-2">
                <InputText
                    type="search"
                    placeholder="ລະຫັດ ພະນັກງານ"
                    className="w-full md:w-20rem"
                    value={emcode || ''}
                    onChange={(e) => setEmcode(e.target.value)}
                />
                <Dropdown
                    showClear
                    disabled={buttonDisableDepartment}
                    options={finaldep}
                    value={selectedDep}
                    onChange={(e: any) => {
                        const depId = e.value;
                        setEmcode('');
                        setSelectedDep(depId);
                        setSelectedDiv(null);
                        getDivisionByDepId(depId || null);
                    }}
                    optionLabel="option_name"
                    optionValue="id"
                    placeholder="ເລືອກ ຝ່າຍ"
                    className="w-full md:w-20rem"
                />
                <Dropdown
                    showClear
                    disabled={buttonDisableDiv}
                    options={finaldiv}
                    value={selectedDiv}
                    onChange={(e: any) => {
                        setEmcode('');
                        setSelectedDiv(e.value);
                    }}
                    optionLabel="option_name"
                    optionValue="id"
                    placeholder="ເລືອກ ພະແນກ"
                    className="w-full md:w-20rem"
                />
            </div>
        </div>
    );

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
