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
import { useSickLeaveStore} from '@/app/store/sick-leave/sickLeaveStore';
import EmptyData from '@/app/shared/empty-table/container';

export default function SickLeaveTable() {
    const {data, getSickLeaveData, getLeaveTypeData}= useSickLeaveStore()
    const { openModal } = useModal();
        const [selectedItem, setSelectedItem] = useState<any[]>([]);
        const [date, setDate] = useState<Nullable<Date>>(null);
        const [globalFilter, setGlobalFilter] = useState<string>('');
        const [filteredData, setFilteredData] = useState<any[]>([]);
        const typingTimeout = useRef<NodeJS.Timeout | null>(null);
        const dt = useRef<DataTable<any>>(null);
    
        useEffect(() => {
            getSickLeaveData();
            getLeaveTypeData();
        }, []);
        
        useEffect(() => {
            setFilteredData(data);
        }, [data]);

    const onViewDoc = useCallback(async (fw_req_id: any) => {
        console.log("onViewDoc: ", fw_req_id)
        openModal({ view: <div style={{ height: '100vh', maxHeight: '80vh' }}>{fw_req_id}</div>, className: "", header: "ເອກະສານ", customSize: "1000px", dialogFooter: null });
    }, [openModal]);



     const searchGlobal = (e: React.ChangeEvent<HTMLInputElement>) => {
    
            const filterValue = e?.target.value;
            setGlobalFilter(filterValue);
    
            // Clear previous timeout
            if (typingTimeout.current) {
                clearTimeout(typingTimeout.current);
            }
    
            // Set a new timeout to trigger filterData after 300ms of inactivity
            typingTimeout.current = setTimeout(() => {
                filterData(filterValue);
            }, 300);
        };
        
            // Filter data based on global filter (only on id and name)
        const filterData = (filter: string) => {
            if (!filter.trim()) {
                setFilteredData(data);
            } else {
                const lowercasedFilter = filter.toLowerCase();
    
                const filtered = data?.filter((item: any) =>
                    item?.leave_req_id?.toString().toLowerCase().includes(lowercasedFilter) ||
                    item?.emp_code?.toString().toLowerCase().includes(lowercasedFilter) ||
                    item?.reasons?.toLowerCase().includes(lowercasedFilter)
                );
    
                setFilteredData(filtered);
            }
        };
    
        useEffect(() => {
            if (!date) {
                setFilteredData(data || []);
                return;
            }
            const filtered = (data || []).filter((item: any) => {
                const createdAt = new Date(item.created_at);
                const sameMonth =  createdAt.getMonth() === date.getMonth() &&  createdAt.getFullYear() === date.getFullYear();
                return sameMonth
            });
            setFilteredData(filtered);
        }, [date]);
    
        const header = (
            <div className="flex flex-wrap md:flex-nowrap justify-between items-start md:items-center gap-2">
                <div className="header-table flex flex-wrap gap-2 flex-1">
                    <InputText type="search"  placeholder="ລະຫັດ" className="input-text flex-1 md:max-w-15rem max-w-20rem" value={globalFilter} onChange={searchGlobal} />
                    <Calendar showIcon showButtonBar className="w-auto calendar-search"  value={date}  onChange={(e: any) => setDate(e.value)}  view="month" dateFormat="mm/yy" />
                </div>
            </div>
        );

    return (
        <div>
            {header}
            <DataTable dataKey="leave_req_id" rows={10} paginator ref={dt}
                sortField="leave_req_id" sortOrder={1} 
                value={filteredData?.map((item, index) => ({ ...item, _key: `${item?.leave_req_id ?? 'row'}-${index}` }))}
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
