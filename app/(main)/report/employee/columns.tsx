'use client';

import React from 'react';
import { Column } from 'primereact/column';
import { Checkin } from '@/types';
import moment from "moment";
import { employeea } from './../../checkin-manual/table/dummy-data';
type ColumnsProps = {
    onViewDoc?: (fw_req_id: number) => void;
    onEditItem?: (rowData: Checkin.EmployeeReport) => void;
};

const bodyStyle: React.CSSProperties = { display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", height: "100%" }


const EmCodeBody = (rowData: Checkin.EmployeeReport) => (
    <>
        <span className="p-column-title">emp_code</span>
        <span style={{ color: "#030852" }}>{rowData?.emp_code}</span>
    </>
);

const late_leave_minutes = (rowData: Checkin.EmployeeReport) => {
    const early_leaveMinutes = rowData?.early_leave_minutes || 0;
    const early_leave = early_leaveMinutes;
    // const lateMinutes = rowData?.late_minutes || 0;
    // const late_minutes = lateMinutes;

    return (
        <div style={{ ...bodyStyle }}>
            <span style={{ color: "#f5222d" }}>
                {early_leave}ນາທີ
            </span>
        </div>
    );
};

const employee = (rowData: Checkin.EmployeeReport) => (
    <div style={{ ...bodyStyle }}>
        <span style={{ color: "#030852" }}>
            {rowData?.fullname ? rowData.fullname : "-"}
        </span>
    </div>
);
const punch_date = (rowData: Checkin.EmployeeReport) => (
    <div style={{ ...bodyStyle }}>
        <span style={{ color: "#030852" }}>
            {rowData?.punch_date ? moment(rowData.punch_date).format("YYYY/MM/DD") : ""}
        </span>
    </div>
);
const first_punch = (rowData: Checkin.EmployeeReport) => (
    <div style={{ ...bodyStyle }}>
        <span style={{ color: "#2f54eb" }}>
            {rowData?.first_punch ? moment(rowData.first_punch, "HH:mm:ss").format("HH:mm") : ""}
        </span>
    </div>
);
const last_punch = (rowData: Checkin.EmployeeReport) => (
    <div style={{ ...bodyStyle }}>
        <span style={{ color: "#2f54eb" }}>
            {rowData?.last_punch ? moment(rowData.last_punch, "HH:mm:ss").format("HH:mm") : ""}
        </span>
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
        <Column
            key="emp_code"
            field="emp_code"
            header="ລະຫັດ"
            body={EmCodeBody}
            headerClassName="hidden md:block text-xs sm:text-xs md:text-base"
            bodyClassName="hidden md:block text-xs sm:text-xs md:text-base px-1 sm:px-2"
        />,
        <Column
            key="fullname"
            field="fullname"
            alignHeader="center"
            header="ຊື່ ພະນັກງານ"
            body={employee}
            headerClassName="text-xs sm:text-xs md:text-base"
            bodyClassName="text-xs sm:text-xs md:text-base px-1 sm:px-2"
        />,
        <Column
            key="2"
            field="punch_date"
            header="ວັນທີ"
            body={punch_date}
            alignHeader="center"
            headerClassName="text-xs sm:text-xs md:text-base"
            bodyClassName="text-xs sm:text-xs md:text-base px-1 sm:px-2"
        />,
        <Column
            key="3"
            field="first_punch"
            header="ເຂົ້າ"
            body={first_punch}
            alignHeader="center"
            headerClassName="text-xs sm:text-xs md:text-base"
            bodyClassName="text-xs sm:text-xs md:text-base px-1 sm:px-2"
        />,
        <Column
            key="4"
            field="last_punch"
            header="ອອກ"
            body={last_punch}
            alignHeader="center"
            headerClassName="text-xs sm:text-xs md:text-base"
            bodyClassName="text-xs sm:text-xs md:text-base px-1 sm:px-2"
        />,
        <Column
            key="5"
            field="early_leave_minutes"
            header="ເວລາຕັດ"
            body={late_leave_minutes}
            alignHeader="center"
            headerClassName="hidden md:block text-xs sm:text-xs md:text-base"
            bodyClassName="hidden md:block text-xs sm:text-xs md:text-base px-1 sm:px-2"
        />
    ];
};
