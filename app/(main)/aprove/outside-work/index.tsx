/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { GetColumns } from './columns';
import toast from 'react-hot-toast';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { Nullable } from 'primereact/ts-helpers';
import { Calendar } from 'primereact/calendar';
import { useOutSideWorkStore } from '@/app/store/outside-work/outSideWorkStore';
import EmptyData from '@/app/shared/empty-table/container';


export default function OutSideWorkTable() {
    const {data, getOutSideWorkData }= useOutSideWorkStore()
    const { openModal } = useModal();
    const [lang, setlang] = useState("LA");
    // const [data, setData] = useState<any[]>([]);
    const [selectedItem, setSelectedItem] = useState<any[]>([]);
    const dt = useRef<DataTable<any>>(null);
    const [date, setDate] = useState<Nullable<Date>>(null);
    const [globalFilter, setGlobalFilter] = useState<string>(''); // Ensure this is always a string

    const getData = async () => {
        try {
            getOutSideWorkData()
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => { getData(); }, []);

    const onViewDoc = useCallback(async (file_path: any) => {
        console.log("onViewDoc: ", file_path)
    }, [openModal, getData]);



    const searchGolbal = (e: any) => {
        setGlobalFilter(e?.currentTarget?.value ?? '')
        console.log("globalFilter", globalFilter)
    }



    const header = (
        <>
            <div className="card-no-bro flex justify-content-center">
                <InputText type="search" placeholder="ຄົ້ນຫາ ເລກທີ - ຫົວຂໍ້ເອກະສານ" className="input-text" value={globalFilter} onChange={searchGolbal} />
                <Calendar showIcon inputStyle={{ width: "8rem" }} value={date} onChange={(e: any) => setDate(e.value)} view="month" dateFormat="mm/yy" />
            </div>
        </>
    );

    return (
        <div>
            {header}
            <DataTable dataKey="work_out_id" 
                sortField="work_out_id" sortOrder={1} 
                rows={10} paginator ref={dt}
                value={data?.map((item, index) => ({ ...item, _key: `${item?.work_out_id ?? 'row'}-${index}` }))}
                selection={selectedItem}
                onSelectionChange={(e: any) => setSelectedItem(e.value as any)}
                rowsPerPageOptions={[10, 25, 30, 40, 50, 100]}
                className="datatable-responsive"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Max"
                // globalFilter={globalFilter || ''}
                emptyMessage={<EmptyData/>} 
                responsiveLayout="scroll"
            >
               {GetColumns({onViewDoc}).map((column, index) => React.cloneElement(column, { key: `column-${index}` }))}
            </DataTable>
        </div>
    );
}
