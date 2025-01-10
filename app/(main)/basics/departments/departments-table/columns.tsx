'use client';
import React from 'react';
import { Column } from 'primereact/column';
import { ColumnBodyOptions } from 'primereact/column';
import { Basics} from '@/types';
import CreateDepatment from '../create-department';
type ColumnsProps = {
    onViewDoc?: (pathurl: string) => void;
};

const codeBody = (rowData: Basics.Department) => {
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

const titleBody = (rowData: Basics.Department) => (
    <>
        <span className="p-column-title">Title</span>
        {rowData?.name}
    </>
);

const ActionBody = (rowData: Basics.Department, { rowIndex }: ColumnBodyOptions) => {
    return <CreateDepatment data={rowData} key={rowIndex} />;
};


export const GetColumns = ({ onViewDoc }: ColumnsProps = {}) => {
    return [
        <Column key="column-id" field="id" header="ລຳດັບ" body={(rowData: Basics.Department) => codeBody(rowData)} headerStyle={{ width: '2rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center' }} />,
        <Column key="column-name" field="name" header="ຊື້ ຝ່າຍ/ຫ້ອງການ/ສະຖາບັນ" body={titleBody} />,
        <Column key="column-action" body={(rowData, rowIndex) => ActionBody(rowData as Basics.Department, rowIndex) } headerStyle={{ textAlign: 'center' }} bodyStyle={{ textAlign: 'center', width: '5rem' }} />,
    ];
};

