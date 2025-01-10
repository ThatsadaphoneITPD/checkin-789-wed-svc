'use client';
import React from 'react';
import { Column } from 'primereact/column';
import { ColumnBodyOptions } from 'primereact/column';
import { Basics} from '@/types';
import CreateDivision from '../create-division';
type ColumnsProps = {
    onViewDoc?: (pathurl: string) => void;
};

const codeBody = (rowData: Basics.Division) => {
    return (
        <>
            <span className="p-column-title">Code</span>
            <div className="rownew-container">
                <div>
                    <span>{rowData?.id}</span>
                </div>
            </div>
        </>
    );
};

const titleBody = (rowData: Basics.Division) => (
    <>
        <span className="p-column-title">Title</span>
        {rowData?.name}
    </>
);

const  departmentBody = (rowData: Basics.Division) => (
    <>
        <span className="p-column-title">department</span>
        {rowData?.department?.name}-[{rowData?.department?.id}]
    </>
);

const ActionBody = (rowData: Basics.Division, { rowIndex }: ColumnBodyOptions) => {
    return <CreateDivision data={rowData} key={rowIndex} />;
};


export const GetColumns = ({ onViewDoc }: ColumnsProps = {}) => {
    return [
        <Column key="column-id" field="id" header="ລຳດັບ" body={(rowData: Basics.Division) => codeBody(rowData)} headerStyle={{ width: '2rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center' }} />,
        <Column key="column-name" field="name" header="ຊື້ ພະແນກ/ສູນ/ສາຂາ" body={titleBody} />,
        <Column key="column-department" field="department" header="ຝ່າຍ/ຫ້ອງການ/ສະຖາບັນ" body={departmentBody} />,
        <Column key="column-action" body={(rowData, rowIndex) => ActionBody(rowData as Basics.Division, rowIndex) } headerStyle={{ textAlign: 'center' }} bodyStyle={{ textAlign: 'center', width: '5rem' }} />,
    ];
};

