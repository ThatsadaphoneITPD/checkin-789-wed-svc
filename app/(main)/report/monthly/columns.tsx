'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Column } from 'primereact/column';
import { Checkin } from '@/types';
type ColumnsProps = {
    onViewDoc?: (fw_req_id: number) => void;
    onEditItem?: (rowData: Checkin.MonthlyReport) => void;
};

const bodyStyle: React.CSSProperties = { display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", height: "100%" }

const EmCodeBody = (rowData: Checkin.MonthlyReport) => (
    <>
        <span className="p-column-title">emp_code</span>
       <span style={{ color: "#030852", fontWeight: "bold" }} >{rowData?.empCode}</span> 
    </>
);

const LateMinBody = (rowData: Checkin.MonthlyReport) => {
    const totalLateMinutes = rowData?.totalLateMinute || 0;
    const hours = Math.floor(totalLateMinutes / 60);
    const minutes = totalLateMinutes;

    return (
        <div style={{ ...bodyStyle }}>
            <span style={{ color: "#f5222d", fontWeight: "bold" }}>
                {minutes}m = {hours}h
            </span>
        </div>
    );
};


const totalDaysBody = (rowData: Checkin.MonthlyReport) => (
    <div style={{...bodyStyle}}>
        <span style={{ color: "#52c41a", fontWeight: "bold" }}>{rowData?.totalFingerScanDays == null ? 0 : rowData?.totalFingerScanDays}</span>
    </div>
);
const LeaveDaysBody = (rowData: Checkin.MonthlyReport) => (
    <div style={{...bodyStyle}}>
        <span style={{ color: "#fa541c", fontWeight: "bold" }}>{rowData?.totalLeaveDays == null ? 0 : rowData?.totalLeaveDays}</span>
    </div>
);

export const GetColumns = ({
   onViewDoc,
}: ColumnsProps) => {
    const openViewDoc = (fw_req_id: number) => {
        if (onViewDoc) {
            onViewDoc(fw_req_id);
        }
    };

    return [
        <Column key="1" field="emp_code" header="ລະຫັດ" body={EmCodeBody}  />,
        <Column key="2" field="totalLateMinute" header="ມາຊ້າ-ກັບໄວ (ນາທີ = ຊົ່ວໂມງ)" body={LateMinBody}  alignHeader='center' />,
        <Column key="3" field="totalFingerScanDays" header="ຈຳນວນມື້ ສະແກນ" body={totalDaysBody} alignHeader='center' />,
        <Column key="4" field="totalLeaveDays" header="ຈຳນວນມື້ ຄອບວຽກ" body={LeaveDaysBody} alignHeader='center' />,
    ];
};
