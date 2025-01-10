'use client';
import React from 'react';
import { Column } from 'primereact/column';
import { ColumnBodyOptions } from 'primereact/column';
import { Basics} from '@/types';
import CreateOffice from '../create-office';
type ColumnsProps = {
    onViewDoc?: (pathurl: string) => void;
};

const codeBody = (rowData: Basics.Office) => {
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

const titleBody = (rowData: Basics.Office) => (
    <>
        <span className="p-column-title">Title</span>
        {rowData?.name}
    </>
);

const  divisionBody = (rowData: Basics.Unit) => (
    <>
        <span className="p-column-title">division</span>
        {rowData?.division?.name}-[{rowData?.division?.id}]
    </>
);

const ActionBody = (rowData: Basics.Office, { rowIndex }: ColumnBodyOptions) => {
    return <CreateOffice data={rowData} key={rowIndex} />;
};


export const GetColumns = ({ onViewDoc }: ColumnsProps = {}) => {
    return [
        <Column key="column-id" field="id" header="ລຳດັບ" body={(rowData: Basics.Office) => codeBody(rowData)} headerStyle={{ width: '2rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center' }} />,
        <Column key="column-name" field="name" header="ຊື້ ຫ້ອງການ-ສູນບໍລິການ" body={titleBody} />,
        <Column key="column-division" field="division" header="ພະແນກ-ສູນ-ສາຂາ" body={divisionBody} />,
        <Column key="column-action" body={(rowData, rowIndex) => ActionBody(rowData as Basics.Office, rowIndex) } headerStyle={{ textAlign: 'center' }} bodyStyle={{ textAlign: 'center', width: '5rem' }} />,
    ];
};

