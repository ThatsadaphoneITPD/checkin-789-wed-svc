'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Column } from 'primereact/column';
import { Checkin } from '@/types';
import {formatDayMonth } from '@/app/(main)/utilities/format-date';
import { statusCases, statusLeaveType} from '../../utilities/format-status';
import { Tag } from 'primereact/tag';
import CreateSickLeave from './create-sick-leave';
import { useSickLeaveStore } from '@/app/store/sick-leave/sickLeaveStore';
type ColumnsProps = {
    onViewDoc?: (fw_req_id: number) => void;
    onEditItem?: (rowData: Checkin.SickLeave) => void;
};

const headerStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center' };
const bodyStyle: React.CSSProperties = { display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", height: "100%" }

// Column body templates
const codeBody = (rowData: Checkin.SickLeave) => {
    return (
        <>
            <span className="p-column-title">ID</span>
            <div className="rownew-container">
                <div>
                    <span>{rowData?.leave_req_id}</span>
                </div>
            </div>
        </>
    );
};

const titleBody = (rowData: Checkin.SickLeave) => (
    <>
        <span className="p-column-title">emp_code</span>
        {rowData?.emp_code}
    </>
);

const descBody = (rowData: Checkin.SickLeave) => (
    <>
        <span className="p-column-title">description</span>
        {rowData?.reasons}
    </>
);

const StatusBody = (rowData: Checkin.SickLeave) => (
    <>
        <span className="p-column-title">status</span>
        <Tag
            style={{background: `${statusCases(rowData?.status).bgcolor}`, color: `${statusCases(rowData?.status).color}`}}
            icon={`pi ${statusCases(rowData?.status).icon}`}
            value={statusCases(rowData?.status).statusla}
        />
    </>
);
const TypeBody = (rowData: Checkin.SickLeave, dataType?: Checkin.LeaveType[]) => {
    const leaveTypeName = dataType?.find(type => type.leave_type_id === rowData.leave_type_id)?.leave_type_name || 'N/A';
    const { color, bgcolor, icon }  = statusLeaveType(rowData.leave_type_id)
    return (
        <div style={{...bodyStyle}}>
            <Tag 
                style={{background: `${bgcolor}`, color: `${color}`}} 
                icon={`pi ${icon}`} 
                value={leaveTypeName}
            />
        </div>
    );
};
const reqestStartEndBody = (rowData: Checkin.SickLeave) => (
    <div style={{...bodyStyle}}>
        <Tag style={{background: `#d6e4ff`, color: `#2f54eb`}} value={`${formatDayMonth(rowData?.start_date)} - ${formatDayMonth(rowData?.end_date)}`}/>
    </div>
);

const totalDaysBody = (rowData: Checkin.SickLeave) => (
<>
    <span style={{ color: "red", fontWeight: "bold" }}>{rowData?.total_days}</span>
</>
);

// Action body with dropdown menu
const actionBody = (
    rowData: Checkin.SickLeave,
    openViewDoc: (fw_req_id: number) => void,
    // editSickLeave: (rowData: Checkin.SickLeave) => any,
) => {
    return (
        <>
            <CreateSickLeave rowItem={rowData}/>
        </>
    );
};




export const GetColumns = ({
    onViewDoc,
}: ColumnsProps) => {
    const openViewDoc = (fw_req_id: number) => {
        if (onViewDoc) {
            onViewDoc(fw_req_id);
        }
    };
    const {dataType}= useSickLeaveStore()

    return [
        // <Column key="0" body={(rowData: Checkin.SickLeave) => iconSickLeaveBody(rowData)} headerStyle={{ minWidth: '2rem' }} />,
        <Column key="0" field="leave_req_id" header="ເລກທີ" body={(rowData: Checkin.SickLeave) => codeBody(rowData)} headerStyle={{ minWidth: '3rem' }}  />,
        <Column key="1" field="emp_code" header="ລະຫັດ" body={titleBody} headerStyle={{ minWidth: '2rem' }} />,
        <Column key="2" field="leave_type_id" header="ປະເພດລາພັກ" body={(rowData: Checkin.SickLeave) => TypeBody(rowData, dataType)} headerStyle={{ minWidth: '2rem' }} alignHeader='center'/>,
        <Column key="3" field="reasons" header="ເຫດຜົນ" body={descBody} headerStyle={{ minWidth: '8rem' }} />,
        <Column key="4" field="start_date" header="ວັນທີເລີ່ມ-ວັນທີສີ້ນສຸດ" body={reqestStartEndBody} headerStyle={{ minWidth: '5rem' }} alignHeader='center'/>,
        <Column key="5" field="total_days" header="ຈຳນວນວັນ" body={totalDaysBody} headerStyle={{ minWidth: '2rem' }} alignHeader='center' />,
        <Column key="7" field="status" header="ສະຖານະ" body={StatusBody} headerStyle={{ minWidth: '5rem' }} alignHeader='center'/>,
        <Column key="8" body={(rowData: Checkin.SickLeave) => actionBody(rowData, openViewDoc)} headerStyle={{ minWidth: '5rem' }} alignHeader='center'/>,
    ];
};
