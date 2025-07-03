'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Column } from 'primereact/column';
import { Checkin } from '@/types';
type ColumnsProps = {
    onViewDoc?: (fw_req_id: number) => void;
    onEditItem?: (rowData: Checkin.Attendance) => void;
};

const bodyStyle: React.CSSProperties = { display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", height: "100%" }

const EmCodeBody = (rowData: Checkin.Attendance) => (
    <>
        <span className="p-column-title">emp_code</span>
        <span style={{ color: "#030852" }} >{rowData?.empCode}</span> 
    </>
);
const FullName = (rowData: Checkin.Attendance) => (
    <>
        <span className="p-column-title">fullname</span>
        <span >{rowData?.fullname}</span> 
    </>
);

const LateMinBody = (rowData: Checkin.Attendance) => {
    const totalLateMinutes = rowData?.totalLateMinute || 0;
    // const hours = Math.floor(totalLateMinutes / 60);
    const minutes = totalLateMinutes;

    return (
        <div style={{ ...bodyStyle }}>
            <span style={{ color: "#f5222d" }}>
                {minutes}
            </span>
        </div>
    );
};


const totalDaysBody = (rowData: Checkin.Attendance) => (
    <div style={{...bodyStyle}}>
        <span style={{ color: "#52c41a", fontWeight: "bold" }}>{rowData?.totalFingerScanDays == null ? 0 : rowData?.totalFingerScanDays}</span>
    </div>
);
const totalDaysOvertime = (rowData: Checkin.Attendance) => {
    const totalLateMinutes = rowData?.totalOvertime || 0;
    // const hours = Math.floor(totalLateMinutes / 60);
    const minutes = totalLateMinutes;

    return (
        <div style={{ ...bodyStyle }}>
            <span style={{ color: "#52c41a" }}>
                {minutes}
            </span>
        </div>
    );
};
const LeaveDaysBody = (rowData: Checkin.Attendance) => (
    <div style={{...bodyStyle}}>
        <span style={{ color: "#fa541c", fontWeight: "bold" }}>{rowData?.totalLeaveDays == null ? 0 : rowData?.totalLeaveDays}</span>
    </div>
);

const workplaceBody = (rowData: Checkin.Attendance) => (
    <div >
        {rowData?.department != null ? `
            ${rowData?.department != null ? `${rowData?.department},` : ""} 
            ${rowData?.division != null ? `${rowData?.division},` : ""}
            ${rowData?.office != null ? `${rowData?.office},` : ""}
            ${rowData?.unit != null ? `${rowData?.unit},` : ""} 
        `: "" }
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
        <Column key="1" field="fullname" header="ຊື່ ແລະ ນາມສະກຸນ" body={FullName} style={{width: "15rem"}} />,
        <Column key="4" field="workplace" header="ຝ່າຍ/ສາຂາ, ພະແນກ/ຫ້ອງການ" body={workplaceBody} />,
        <Column key="2" field="totalLateMinute" header="ລວມເວລາ ມາຊ້າ-ກັບໄວ (ນາທີ)" body={LateMinBody}  alignHeader='center' />,
        <Column key="4" field="totalLeaveDays" header="ລວມມື້ລາພັກ (ວັນ)" body={LeaveDaysBody} alignHeader='center' />,
        <Column key="3" field="totalOvertime" header="ລວມເວລາ OT (ນາທີ)" body={totalDaysOvertime} alignHeader='center' />,
        <Column key="3" field="totalFingerScanDays" header="ລວມມື້ ກົດເຂົ້າ-ອອກ (ວັນ)" body={totalDaysBody} alignHeader='center' />,
    ];
};
