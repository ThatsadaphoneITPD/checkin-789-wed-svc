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
import { usereportCheckInStore} from '@/app/store//reports/reportCheckInStore';
import EmptyData from '@/app/shared/empty-table/container';
import { getDayMonthYear } from '../../utilities/format-date';

export default function MonthlyTable() {
    const {loading, monthlydata, getMonthyReportData}= usereportCheckInStore()
    const { openModal } = useModal();
    const [selectedItem, setSelectedItem] = useState<any[]>([]);
    const dt = useRef<DataTable<any>>(null);
    const [date, setDate] = useState<Nullable<Date>>(new Date());
    // const [globalFilter, setGlobalFilter] = useState<string>(''); // Ensure this is always a string

    const getData = async () => {
        try {
            const {month, year} = getDayMonthYear(date)
            getMonthyReportData(month, year);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => { getData(); }, [date]);

    const onViewDoc = useCallback(async (fw_req_id: any) => {
        console.log("onViewDoc: ", fw_req_id)
        openModal({ view: <div style={{ height: '100vh', maxHeight: '80vh' }}>{fw_req_id}</div>, className: "", header: "ເອກະສານ", customSize: "1000px", dialogFooter: null });
    }, [openModal, getData]);


    // const searchGolbal = (e: any) => {
    //     setGlobalFilter(e?.currentTarget?.value ?? '')
    //     console.log("globalFilter", globalFilter)
    // }

    const header = (
        <>
            <div className="card-no-bro flex justify-content-center">
                <Calendar  style={{height: "2.5rem"}} showIcon value={date} onChange={(e: any) => setDate(e.value)} view="month" dateFormat="mm/yy" />
            </div>
        </>
    );

    return (
        
        <div>
            {header}
            <DataTable dataKey="_key" size='small' rows={10} paginator ref={dt}
                sortField="_key" sortOrder={1} 
                value={monthlydata?.map((item, index) => ({ ...item, _key: index }))}
                selection={selectedItem}
                onSelectionChange={(e: any) => setSelectedItem(e.value as any)}
                rowsPerPageOptions={[10, 25, 30, 40, 50, 100]}
                className="datatable-responsive"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Max"
                // globalFilter={globalFilter || ''}
                loading={loading}
                emptyMessage={<EmptyData emptytext="ຂໍ້ມູນ ວ່າງເປົ່າ"/>}
                responsiveLayout="scroll"
            >
               {GetColumns({onViewDoc}).map((column, index) => React.cloneElement(column, { key: `column-${index}` }))}
            </DataTable>
        </div>
    );
}
