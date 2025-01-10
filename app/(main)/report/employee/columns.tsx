'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Column } from 'primereact/column';
import { Checkin } from '@/types';
import {formatDayMonth } from '@/app/(main)/utilities/format-date';
import { statusCases, statusLeaveType} from '../../utilities/format-status';
import { Tag } from 'primereact/tag';
type ColumnsProps = {
    onViewDoc?: (fw_req_id: number) => void;
    onEditItem?: (rowData: Checkin.EmployeeReport) => void;
};

const bodyStyle: React.CSSProperties = { display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", height: "100%" }


const EmCodeBody = (rowData: Checkin.EmployeeReport) => (
    <>
        <span className="p-column-title">emp_code</span>
        <span style={{ color: "#030852", fontWeight: "bold" }}>{rowData?.emp_code}</span>
    </>
);

const late_leave_minutes = (rowData: Checkin.EmployeeReport) => {
    const early_leaveMinutes = rowData?.early_leave_minutes || 0;
    const early_leave = early_leaveMinutes;
    const lateMinutes = rowData?.late_minutes || 0;
    const late_minutes = lateMinutes;

    return (
        <div style={{ ...bodyStyle }}>
            <span style={{ color: "#f5222d", fontWeight: "bold" }}>
                {late_minutes}m - {early_leave}m
            </span>
        </div>
    );
};
const punch_date = (rowData: Checkin.EmployeeReport) => (
    <div style={{...bodyStyle}}>
        <span style={{ color: "#030852", fontWeight: "bold" }}>{rowData?.punch_date}</span>
    </div>
);
const first_punch = (rowData: Checkin.EmployeeReport) => (
    <div style={{...bodyStyle}}>
        <span style={{ color: "#2f54eb", fontWeight: "bold" }}>{rowData?.first_punch}</span>
    </div>
);
const last_punch = (rowData: Checkin.EmployeeReport) => (
    <div style={{...bodyStyle}}>
        <span style={{ color: "#2f54eb", fontWeight: "bold" }}>{rowData?.last_punch}</span>
    </div>
);


export const GetColumns = ({
   onViewDoc,
}: ColumnsProps) => {
    const openViewDoc = (emp_code: number) => {
        if (onViewDoc) {
            onViewDoc(emp_code);
        }
    };

    return [
        <Column key="1" field="emp_code" header="ລະຫັດ" body={EmCodeBody}  />,
        <Column key="1" field="punch_date" header="ມື້ກົດ" body={punch_date} alignHeader='center'/>,
        <Column key="1" field="first_punch" header="ເວລາ ເຂົ້າວຽກ" body={first_punch} alignHeader='center'/>,
        <Column key="1" field="last_punch" header="ເວລາ ອອກວຽກ" body={last_punch} alignHeader='center'/>,
        <Column key="2" field="early_leave_minutes" header="ມາຊ້າ-ກັບໄວ (ນາທີ)" body={late_leave_minutes} alignHeader='center' />,
    ];
};
