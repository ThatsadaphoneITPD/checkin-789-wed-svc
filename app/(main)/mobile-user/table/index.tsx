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
import { authenStore, useLocationStore, useWorkAreaStore } from '@/app/store';

export default function MobileUserTable() {
    const { authData } = authenStore();
    const { dataUser, getUsersData, page, totalCount, pageSize } = useUsersStore();
    const { getzWorkAreaData } = useWorkAreaStore();
    const { getzLocationData } = useLocationStore();
    const { datadep } = useDepartmentStore();
    const { datadiv, getDivisionByDepId } = useDivisionStore();
    const buttonDisable = (() => {
        switch (authData?.role) {
            case "admin":
                return false;
            case "branchadmin":
                return true;
            default:
                return true;
        }
    })();


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
        // Only run if authData is fully loaded
        if (!authData || !authData.role) return;

        const baseParams = { page, pageSize, role: authData.role };
        let params: any = {};

        if (authData.role === "admin") {
            params = {
                ...baseParams,
                empCode: debouncedEmcode || undefined,
                department_id: selectedDep || undefined,
                division_id: selectedDiv || undefined,
            };
        } else if (authData.role === "branchadmin") {
            params = {
                ...baseParams,
                department_id: authData.department_id,
                division_id: authData.division_id,
                ...(debouncedEmcode ? { empCode: debouncedEmcode } : {}),
            };
        } else if (authData.role === "deptadmin") {
            params = {
                ...baseParams,
                department_id: authData.department_id,
                ...(debouncedEmcode ? { empCode: debouncedEmcode } : {}),
            };
        }

        getUsersData(params);
    }, [debouncedEmcode, selectedDep, selectedDiv, page, pageSize, authData]);


    // Update filtered state after data fetched
    useEffect(() => {
        const delay = setTimeout(() => {
            setFiltered(dataUser);
        }, 150);
        return () => clearTimeout(delay);
    }, [dataUser]);

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
                department_id = authDeptId; //  deptadmin’s own dept
                division_id = undefined;    // ignore division
                break;

            default:
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
                    disabled={buttonDisable}
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
                    disabled={buttonDisable}
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
