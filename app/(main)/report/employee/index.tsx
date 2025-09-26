/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { DataTable } from 'primereact/datatable';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { GetColumns } from './columns';
import toast from 'react-hot-toast';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { Nullable } from 'primereact/ts-helpers';
import { Calendar } from 'primereact/calendar';
import { usereportCheckInStore } from '@/app/store/reports/reportCheckInStore';
import EmptyData from '@/app/shared/empty-table/container';
import { InputText } from 'primereact/inputtext';

export default function EmployeeTable() {
    const { loading, emplpyeedata, getEmployeeReportData } = usereportCheckInStore();
    const { openModal } = useModal();
    const [selectedItem, setSelectedItem] = useState<any[]>([]);
    const dt = useRef<DataTable<any>>(null);
    const [emcode, setEmcode] = useState<Nullable<string>>('');
    const [debouncedEmcode, setDebouncedEmcode] = useState<Nullable<string>>('');
    const [date, setDate] = useState<Nullable<Date>>(new Date());

    // Debounce effect to delay updates to `debouncedEmcode`
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedEmcode(emcode);
        }, 500); // Adjust the delay as needed (300ms is standard for debouncing)

        return () => {
            clearTimeout(handler);
        };
    }, [emcode]);

    const getData = async () => {
        try {
            console.log("Fetching data for emcode:", debouncedEmcode);
            getEmployeeReportData(debouncedEmcode);
        } catch (error) {
            console.log(error);
        }
    };

    // Fetch data whenever `debouncedEmcode` changes
    useEffect(() => {
        getData();
    }, [debouncedEmcode]);

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


    const header = (
        <div className="card-no-bro">
            <div className="flex flex-wrap gap-1 justify-content-start">
               <InputText
                type="search"
                style={{height: "2.5rem"}}
                placeholder="ລະຫັດ ພະນັກງານ"
                className="input-text w-full md:w-14rem mb-2"
                value={emcode}
                onChange={(e: any) => setEmcode(e.target.value)}
            />
              <Calendar
                value={date}
                style={{height: "2.5rem"}}
                onChange={(e: any) => setDate(e.value)}
                view="month"
                placeholder="ເລືອກເດືອນ"
                showIcon
                showButtonBar
                className="calendar-search w-full md:w-14rem mb-2"
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
                rows={10}
                paginator
                ref={dt}
                sortField="_key"
                sortOrder={1}
                value={emplpyeedata?.map((item, index) => ({ ...item, _key: index }))}
                selection={selectedItem}
                onSelectionChange={(e: any) => setSelectedItem(e.value as any)}
                rowsPerPageOptions={[10, 25, 30, 40, 50, 100]}
                className="datatable-responsive"
                paginatorTemplate="PrevPageLink CurrentPageReport NextPageLink RowsPerPageDropdown"
                currentPageReportTemplate="({currentPage} > {totalPages})"
                loading={loading}
                emptyMessage={<EmptyData emptytext="ຂໍ້ມູນ ວ່າງເປົ່າ" />}
                responsiveLayout="scroll"
            >
                {GetColumns({ onViewDoc }).map((column, index) => React.cloneElement(column, { key: `column-${index}` }))}
            </DataTable>
        </div>
    );
}
