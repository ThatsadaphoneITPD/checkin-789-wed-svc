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

const titleID = (rowData: Checkin.MobileUser) => (
    <>
        <span className="p-column-title">ID</span>
        {rowData?.user_id}
    </>
);
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
            <span className="custom-target-des"   data-pr-tooltip={rowData?.fullname === "" ? "---" : rowData?.fullname}   data-pr-position="bottom"  >
                <span style={{ display: "inline-block",  maxWidth: "13rem",  whiteSpace: "nowrap",  overflow: "hidden",  textOverflow: "ellipsis",  verticalAlign: "middle" }}>
                    {rowData?.fullname === "" ? "---" : rowData?.fullname} 
                </span>
                <span style={{ marginLeft: "0.2rem"}}>[{rowData?.position}]</span>
            </span>
        </div>
    </>
);

const LocateBody = (rowData: Checkin.MobileUser) => (
    <div style={{ ...bodyStyle }}>
        {rowData?.department != null ? `
            ${rowData?.department != null ? `${rowData?.department}, ` : ""} 
            ${rowData?.division != null ? `${rowData?.division}, ` : ""}
        `: "" }
    </div>
);
const StatusBody = (rowData: Checkin.MobileUser) => (
    <div style={{ ...bodyStyle }}>
        {/* <Tag
            style={{ background: `${statusCases(rowData?.device_id).bgcolor}`, color: `${statusCases(rowData?.status).color}` }}
            icon={`pi ${statusCases(rowData?.status).icon}`}
            value={statusCases(rowData?.status).statusla}
        /> */}
        {rowData?.device_id}
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
        <Column key="1" field="ID" header="ID" body={titleID} headerStyle={{ minWidth: '2rem' }} />,
        <Column key="2" field="emp_code" header="ລະຫັດ" body={titleBody} headerStyle={{ minWidth: '2rem' }} />,
        <Column key="3" field="description" header="ຊື່ - ນາມສະກຸນ" body={descBody} headerStyle={{ minWidth: '8rem' }} />,
        <Column key="4" field="longitude" header="ສັງກັດ" body={LocateBody} headerStyle={{ minWidth: '2rem' }} alignHeader='center' />,
        <Column key="5" field="ລະຫັດ ເຄື່ຶັອງ" header="ເລກເຄື່ອງ" body={StatusBody} headerStyle={{ minWidth: '2rem' }} alignHeader='center' />,
        <Column key="6"  body={(rowData: Checkin.MobileUser) => (   <ActionButtons rowData={rowData} openViewDoc={openViewDoc}  />  )} headerStyle={{ minWidth: '5rem' }}/>
    ];
};
