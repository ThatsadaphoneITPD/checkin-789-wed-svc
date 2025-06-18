'use client';

import React, {useState } from 'react';
import { Column } from 'primereact/column';
import { Checkin } from '@/types';
import { statusCases } from '../../utilities/format-status';
import { Tag } from 'primereact/tag';
import Create from './create';
import { Tooltip } from 'primereact/tooltip';
import ActionButtons from './actionButtons';

type ColumnsProps = {
    onViewDoc?: (work_out_id: string) => void;
    onEditItem?: (rowData: Checkin.MobileUser) => void;
};

const bodyStyle: React.CSSProperties = { display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", height: "100%" }

const titleBody = (rowData: Checkin.MobileUser) => (
    <>
        <span className="p-column-title">emp_code</span>
        {rowData?.emp_code}
    </>
);

const descBody = (rowData: Checkin.MobileUser) => (
    <>
        <div>
            <Tooltip target=".custom-target-des" />
            <span className="custom-target-des"   data-pr-tooltip={rowData?.ful_name === "" ? "---" : rowData?.ful_name}   data-pr-position="bottom"  >
                <span style={{ display: "inline-block",  maxWidth: "8rem",  whiteSpace: "nowrap",  overflow: "hidden",  textOverflow: "ellipsis",  verticalAlign: "middle" }}>
                    {rowData?.ful_name === "" ? "---" : rowData?.ful_name}
                </span>
            </span>
        </div>
    </>
);

const LocateBody = (rowData: Checkin.MobileUser) => (
    <div style={{ ...bodyStyle }}>
        {rowData?.department != null ? `
            ${rowData?.department != null ? `${rowData?.department?.department_name}, ` : ""} 
            ${rowData?.division != null ? `${rowData?.division?.division_name}, ` : ""}
            ${rowData?.office != null ? `${rowData?.office?.office_name}, ` : ""}
            ${rowData?.unit != null ? `${rowData?.unit?.unit_name} ` : ""} 
        `: "" }
    </div>
);
const StatusBody = (rowData: Checkin.MobileUser) => (
    <div style={{ ...bodyStyle }}>
        <Tag
            style={{ background: `${statusCases(rowData?.status).bgcolor}`, color: `${statusCases(rowData?.status).color}` }}
            icon={`pi ${statusCases(rowData?.status).icon}`}
            value={statusCases(rowData?.status).statusla}
        />
    </div>
);

export const GetColumns = ({
    onViewDoc,
}: ColumnsProps) => {
    const openViewDoc = (file_path: string) => {
        if (onViewDoc) {
            onViewDoc(file_path);
        }
    };

    return [
        <Column key="1" field="emp_code" header="ລະຫັດ" body={titleBody} headerStyle={{ minWidth: '2rem' }} />,
        <Column key="2" field="description" header="ຊື່ - ນາມສະກຸນ" body={descBody} headerStyle={{ minWidth: '8rem' }} />,
        <Column key="3" field="longitude" header="ສັງກັດ" body={LocateBody} headerStyle={{ minWidth: '2rem' }} alignHeader='center' />,
        <Column key="4" field="status" header="ສະຖານະ" body={StatusBody} headerStyle={{ minWidth: '2rem' }} alignHeader='center' />,
       <Column key="5"  body={(rowData: Checkin.MobileUser) => (   <ActionButtons rowData={rowData} openViewDoc={openViewDoc}  />  )} headerStyle={{ minWidth: '5rem' }}/>
    ];
};
