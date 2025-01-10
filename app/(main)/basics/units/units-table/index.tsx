'use client';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useRef, useState } from 'react';
import { GetColumns } from './columns';
import { useUnitStore } from '@/app/store/units/unitStore';
import EmptyData from '@/app/shared/empty-table/container';

export default function UnitTable() {
    const [lang, setLang] = useState("LA");
    const { data, getUnitData } = useUnitStore();
    const [selectedItem, setSelectedItem] = useState<any[]>([]);
    const dt = useRef<DataTable<any>>(null);
    const [globalFilter, setGlobalFilter] = useState<string>(''); // Global search term
    const [filteredData, setFilteredData] = useState<any[]>([]); // State to hold filtered data
    const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);

    // Fetch Unit data on component mount
    useEffect(() => {
        getUnitData();
    }, [getUnitData]);

    // Update filtered data when 'data' is loaded or the global filter changes
    useEffect(() => {
        setFilteredData(data); // Set initial data once it is loaded
    }, [data]);

    // Handle global search input changes with debouncing
    const searchGlobal = (e: React.ChangeEvent<HTMLInputElement>) => {
        const filterValue = e.target.value;
        setGlobalFilter(filterValue);

        // Clear the existing timeout
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        // Set a new timeout to trigger filterData after 300ms of inactivity
        const newTimeout = setTimeout(() => {
            filterData(filterValue);
        }, 300); // Adjust this delay to your preference
        setTypingTimeout(newTimeout);
    };

    // Filter data based on global filter (only on id and name)
    const filterData = (filter: string) => {
        if (filter.trim() === '') {
            setFilteredData(data); // If no filter, show all data
        } else {
            const lowercasedFilter = filter.toLowerCase();

            const filtered = data.filter(item => {
                // Check if either the id or name contains the filter string
                return (
                    item.id.toString().toLowerCase().includes(lowercasedFilter) || 
                    item.name.toLowerCase().includes(lowercasedFilter)
                );
            });

            setFilteredData(filtered);
        }
    };

    // Table header with search input
    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <div className="header-table flex flex-wrap gap-2 m-0">
                <InputText
                    type="search"
                    placeholder="ຊື່ ຫ້ອອງການ-ສູນບໍລິການ"
                    className="input-text"
                    value={globalFilter}
                    onChange={searchGlobal}
                />
            </div>
        </div>
    );

    return (
        <div>
            <DataTable
                dataKey="id"
                rows={10}
                paginator
                ref={dt}
                selection={selectedItem}
                value={filteredData.map((item, index) => ({ ...item, _key: item?.id || index }))} // Add unique keys
                onSelectionChange={(e: any) => setSelectedItem(e.value)}
                rowsPerPageOptions={[10, 25, 30, 40, 50, 100]}
                className="datatable-responsive p-datatable-gridlines"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                emptyMessage={<EmptyData/>} 
                header={header}
                responsiveLayout="scroll"
            >
                {GetColumns().map((column, index) => (
                    React.cloneElement(column, { key: index }) // Ensure unique keys for columns
                ))}
            </DataTable>
        </div>
    );
}
