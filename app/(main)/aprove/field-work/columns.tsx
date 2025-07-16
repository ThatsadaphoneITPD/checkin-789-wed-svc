'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Checkin } from '@/types';
import { formatDate, formatDayMonth, formatDay, formatMonth, formatDateLao } from '@/app/(main)/utilities/format-date';
import { statusCases, statusTypeField } from '../../utilities/format-status';
import { Tag } from 'primereact/tag';
import CreateFiledWork from './create-field-work';
import { Tooltip } from 'primereact/tooltip';
import moment from 'moment';
import GlobalPhotoView from '@/app/shared/photo-view/container';
import { useFileCheckStore } from '@/app/store';
import ActionBody from './actionBody';
type ColumnsProps = {
    onViewDoc?: (file_path: string) => void;
    onEditItem?: (rowData: Checkin.FieldWork) => void;
};

// Column body templates
const codeBody = (rowData: Checkin.FieldWork) => {
    return (
        <>
            <span className="p-column-title">ID</span>
            <div className="rownew-container">
                <div>
                    <span>{rowData?.fw_req_id}</span>
                </div>
            </div>
        </>
    );
};

const titleBody = (rowData: Checkin.FieldWork) => (
    <>
        <span className="p-column-title">emp_code</span>
        {rowData?.fullName ? <>{rowData?.fullName}[{rowData?.emp_code}]</>: rowData?.emp_code }
    </>
);

const descBody = (rowData: Checkin.FieldWork) => (
    <>
        <div>
            <Tooltip target=".custom-target-des" />
            <span className="custom-target-des"   data-pr-tooltip={rowData?.description === "" ? "---" : rowData?.description}   data-pr-position="bottom"  >
                <span style={{ display: "inline-block",  maxWidth: "8rem",  whiteSpace: "nowrap",  overflow: "hidden",  textOverflow: "ellipsis",  verticalAlign: "middle" }}>
                    {rowData?.description === "" ? "---" : rowData?.description}
                </span>
            </span>
        </div>
    </>
);

const workplaceBody = (rowData: Checkin.FieldWork) => (
    <>
        <span className="p-column-title">created_at</span>
        <Tag style={{background: `#d6e4ff`, color: `#2f54eb`}} value={`${rowData?.workplace}`}/>
    </>
);

const reqestTimeBody = (rowData: Checkin.FieldWork) => (
    <>
        <span className="p-column-title">created_at</span>
         <Tag style={{background: `#d6e4ff`, color: `#2f54eb`}} value={`${formatDateLao(rowData?.created_at)}`}/>
    </>
);
const StatusBody = (rowData: Checkin.FieldWork) => (
    <>
        <span className="p-column-title">status</span>
        <Tag
            style={{background: `${statusCases(rowData?.status).bgcolor}`, color: `${statusCases(rowData?.status).color}`}}
            icon={`pi ${statusCases(rowData?.status).icon}`}
            value={statusCases(rowData?.status).statusla}
        />
    </>
);
const TypeBody = (rowData: Checkin.FieldWork) =>{
    const {bgcolor, color, statusla, icon} = statusTypeField(rowData?.field_work_type)
    return (
        <>
            <span className="p-column-title">field_work_type</span>
            <Tag icon={`pi ${icon}`}  style={{background: `${bgcolor}`, color: `${color}`}} value={statusla}/>
        </>)
    };
const reqestStartEndBody = (rowData: Checkin.FieldWork) => (
    <>
        <span className="p-column-title">Complete</span>
        <Tag style={{background: `#d6e4ff`, color: `#2f54eb`}} value={`${formatDate(rowData?.start_date)} - ${formatDate(rowData?.end_date)}`}/>
    </>
);

const totalDaysBody = (rowData: Checkin.FieldWork) => (
    <>
        <span className="p-column-title">total</span>
        <Tag style={{background: `#1d39c4`, color: `#f0f5ff`}} value={`${rowData?.total_days} ວັນ`}/> 
    </>
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
        // <Column key="0" body={(rowData: Checkin.FieldWork) => iconFieldWorkBody(rowData)} headerStyle={{ minWidth: '2rem' }} />,
        <Column key="0" field="fw_req_id" header="ເລກທີ" body={(rowData: Checkin.FieldWork) => codeBody(rowData)} headerStyle={{ minWidth: '3rem' }} />,
        <Column key="1" field="emp_code" header="ລະຫັດ" body={titleBody} headerStyle={{ minWidth: '2rem' }} />,
        <Column key="2" field="field_work_type" header="ປະເພດ" body={TypeBody} headerStyle={{ maxWidth: '2rem' }} />,
        <Column key="2" field="workplace" header="ສະຖານທີ" body={workplaceBody} headerStyle={{ maxWidth: '2rem' }} />,
        <Column key="3" field="description" header="ລາຍລະອຽດ" body={descBody} headerStyle={{ minWidth: '8rem' }} />,
        <Column key="4" field="start_date" header="ໄລຍະ-ອອກສະໜາມ" body={reqestStartEndBody} headerStyle={{ minWidth: '5rem' }} />,
        <Column key="5" field="total_days" header="ຈຳນວນ" body={totalDaysBody} headerStyle={{ minWidth: '1rem' }} />,
        <Column key="6" field="create_at" header="ວັນທີຮ້ອງຂໍ" body={reqestTimeBody} headerStyle={{ minWidth: '2rem' }} />,
        <Column key="7" field="status" header="ສະຖານະ" body={StatusBody} headerStyle={{ minWidth: '5rem' }} />,
        <Column key="8" body={(rowData: Checkin.FieldWork) => <ActionBody rowData={rowData} onViewDoc={onViewDoc} />} headerStyle={{ minWidth: '5rem' }} />,
    ];
};
