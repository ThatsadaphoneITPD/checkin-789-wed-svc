'use client';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column'; // Ensure Column is imported
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useRef, useState } from 'react';
import { GetColumns } from './columns';
// import { useDepartmentStore } from '@/app/store/departments/deparmentStore';
import EmptyData from '@/app/shared/empty-table/container';

export default function DepartmentsTable() {
    const [lang, setlang] = useState("LA");
    // const { data, getDepartmentData } = useDepartmentStore();
    const [selectedItem, setSelectedItem] = useState<any[]>([]);
    const dt = useRef<DataTable<any>>(null);
    const [globalFilter, setGlobalFilter] = useState<string>(''); // Ensure this is always a string

    useEffect(() => {
        // getDepartmentData();
    }, []);

    const searchGolbal = (e: any) => {
        setGlobalFilter(e?.currentTarget?.value ?? '');
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <div className="header-table flex flex-wrap gap-2 m-0 ">
                <InputText
                    type="search"
                    placeholder="ຊື່ ຝ່າຍ/ຫ້ອງການ/ສະຖາບັນ"
                    className="input-text"
                    value={globalFilter}
                    onChange={searchGolbal}
                />
            </div>
        </div>
    );

    return (
        <div>
            <DataTable
                dataKey="id" rows={10} paginator ref={dt} selection={selectedItem}
                // value={data?.map((item, index) => ({ ...item, _key: item?.id || index }))}
                onSelectionChange={(e: any) => setSelectedItem(e.value as any)}
                rowsPerPageOptions={[10, 25, 30, 40, 50, 100]}
                className="datatable-responsive p-datatable-gridlines"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Max" 
                emptyMessage={<EmptyData emptytext="No Found" />} 
                header={header} responsiveLayout="scroll"
            >
                {GetColumns().map((column, index) => (React.cloneElement(column, { key: index })))}
            </DataTable>
        </div>
    );
}
