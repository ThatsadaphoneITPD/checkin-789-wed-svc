'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Checkin } from '@/types';
import { formatDate, formatDayMonth, formatDay, formatMonth, formatDateTime } from '@/app/(main)/utilities/format-date';
import { statusCases, statusTypeField } from '../../utilities/format-status';
import { Tag } from 'primereact/tag';
import CreateOutSideWork from './create-outside-work';
import GoogleMapShow from '@/app/shared/google-map/displaymap';
import OpenMapOutSideWork from './open-map';
type ColumnsProps = {
    onViewDoc?: (work_out_id: number) => void;
    onEditItem?: (rowData: Checkin.OutSideWork) => void;
};


const headerStyle: React.CSSProperties = { display: 'flex', justifyContent: 'center', alignItems: 'center' };
const bodyStyle: React.CSSProperties = { display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", height: "100%" }


// Column body templates
const codeBody = (rowData: Checkin.OutSideWork) => {
    return (
        <>
            <span className="p-column-title">ID</span>
            <div className="rownew-container">
                <div>
                    <span>{rowData?.work_out_id}</span>
                </div>
            </div>
        </>
    );
};

const titleBody = (rowData: Checkin.OutSideWork) => (
    <>
        <span className="p-column-title">emp_code</span>
        {rowData?.emp_code}
    </>
);

const descBody = (rowData: Checkin.OutSideWork) => (
    <>
        <span className="p-column-title">description</span>
        <span style={{ maxWidth: '7rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'inline-block',}} >
            {rowData?.description}
        </span>
    </>
);

const LocateBody = (rowData: Checkin.OutSideWork) => (
    <>
        <span className="p-column-title">Local</span>
        <OpenMapOutSideWork rowItem={rowData}/>
    </>
);
const StatusBody = (rowData: Checkin.OutSideWork) => (
    <>
        <span className="p-column-title">status</span>
        <Tag
            style={{background: `${statusCases(rowData?.status).bgcolor}`, color: `${statusCases(rowData?.status).color}`}}
            icon={`pi ${statusCases(rowData?.status).icon}`}
            value={statusCases(rowData?.status).statusla}
        />
    </>
);

const reqestStartEndBody = (rowData: Checkin.OutSideWork) => (
    <div style={{...bodyStyle}}>
        <Tag style={{background: `#d6e4ff`, color: `#2f54eb`}} value={`${formatDateTime(rowData?.punch_time)}`}/>
    </div>
);


// Action body with dropdown menu
const actionBody = (
    rowData: Checkin.OutSideWork,
    openViewDoc: (fw_req_id: number) => void,
    // editOutSideWork: (rowData: Checkin.OutSideWork) => any,
) => {
    return (
        <>
            {/* <Button
                icon={<i className='pi pi-briefcase' style={{fontSize: '1.5rem', color: "#ffff"}} />}
                rounded
                style={{height: "2.5rem", width: "2.5rem", backgroundColor: "#3a6cb7"}}
                text
                raised
                severity="secondary"
                className="p-button-rounded"
                onClick={() => openViewDoc(rowData?.fw_req_id)}
            /> */}
            <CreateOutSideWork rowItem={rowData}/>
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

    return [
        <Column key="0" field="work_out_id" header="ເລກທີ" body={(rowData: Checkin.OutSideWork) => codeBody(rowData)} headerStyle={{ minWidth: '3rem' }} />,
        <Column key="1" field="emp_code" header="ລະຫັດ" body={titleBody} headerStyle={{ minWidth: '2rem' }} />,
        <Column key="3" field="description" header="ອະທິບາຍ" body={descBody} headerStyle={{ minWidth: '8rem' }} />,
        <Column key="4" field="punch_time" header="ເວລາກົດ" body={reqestStartEndBody} headerStyle={{ minWidth: '2rem', ...headerStyle }} />,
        <Column key="6" field="longitude" header="ສະຖານທີກົດ" body={LocateBody} headerStyle={{ minWidth: '2rem', textAlign: 'center'}} />,
        <Column key="7" field="status" header="ສະຖານະ" body={StatusBody} headerStyle={{ minWidth: '2rem' }} />,
        <Column key="8" body={(rowData: Checkin.OutSideWork) => actionBody(rowData, openViewDoc)} headerStyle={{ minWidth: '5rem' }} />,
    ];
};
