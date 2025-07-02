/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { GetColumns } from './columns';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { Nullable } from 'primereact/ts-helpers';
import EmptyData from '@/app/shared/empty-table/container';
import { useUsersStore } from '@/app/store/user/usersStore';

export default function MobileUserTable() {
//    const { loading, emplpyeedata, getEmployeeReportData } = usereportCheckInStore();
    const {loading, dataUser, getUserByUserId} = useUsersStore();
    const users = [
        {
            id: 1,
            emp_code: "44476",
            ful_name: "ທ່ານ ທັດສະດາພອນ",
            status: "",
            department: { 
                            id: 1,
                            department_name: "ຝ່າຍບຸກຄະລະກອນ",
                            department_code: "808",
                            department_status: "A",
                        }
        },
        {   id: 1,
            emp_code: "44481",
            ful_name: "ທ່ານ ສອນວິໄຊ",
            status: "",
            department: { 
                            id: 1,
                            department_name: "ຝ່າຍບຸກຄະລະກອນ",
                            department_code: "808",
                            department_status: "A",
                        }
        },
    ]
    const { openModal } = useModal();
    const [selectedItem, setSelectedItem] = useState<any[]>([]);
    const dt = useRef<DataTable<any>>(null);
    const [emcode, setEmcode] = useState<Nullable<string>>('');
    const [debouncedEmcode, setDebouncedEmcode] = useState<Nullable<string>>('');

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
            // getEmployeeReportData(debouncedEmcode);
        } catch (error) {
            console.log(error);
        }
    };

    // Fetch data whenever `debouncedEmcode` changes
    useEffect(() => {
        getData();
    }, [debouncedEmcode]);

    

    const onViewDoc = useCallback(
        async (id: any) => {
            console.log("onViewDoc: ", id);
            openModal({
                view: <div style={{ height: '100vh', maxHeight: '80vh' }}>{id}</div>,
                className: "",
                header: "ເອກະສານ",
                customSize: "1000px",
                dialogFooter: null,
            });
        },
        [openModal]
    );

    const header = (
        <div className="card-no-bro flex justify-content-start">
            <div className='m-4'>
                <InputText
                    type="search"
                    style={{height: "2.5rem"}}
                    placeholder="ລະຫັດ ພະນັກງານ"
                    className="input-text"
                    value={emcode}
                    onChange={(e: any) => setEmcode(e.target.value)}
                />
            </div>
        </div>
    );

    return (
        
        <div>
            {header}
            <DataTable dataKey="_key" size='small' rows={10} paginator ref={dt}
                sortField="_key" sortOrder={1} 
                value={users?.map((item, index) => ({ ...item, _key: item?.emp_code }))}
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
