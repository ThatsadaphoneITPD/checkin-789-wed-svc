'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Checkin } from '@/types';
import { formatDate, formatDayMonth, formatDay, formatMonth, formatDateTime, formatDateLao } from '@/app/(main)/utilities/format-date';
import { statusCases, statusTypeField } from '../../utilities/format-status';
import { Tag } from 'primereact/tag';
import CreateOutSideWork from './create-outside-work';
import GoogleMapShow from '@/app/shared/google-map/displaymap';
import OpenMapOutSideWork from './open-map';
import { Tooltip } from 'primereact/tooltip';
import GlobalPhotoView from '@/app/shared/photo-view/container';
import { useFileCheckStore } from '@/app/store';
import ActionBody from './actionBody';

type ColumnsProps = {
    onViewDoc?: (work_out_id: string) => void;
    onEditItem?: (rowData: Checkin.OutSideWork) => void;
};


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
        {rowData?.fullName ? <>{rowData?.fullName}[{rowData?.emp_code}]</>: rowData?.emp_code }
    </>
);

const descBody = (rowData: Checkin.OutSideWork) => (
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

const LocateBody = (rowData: Checkin.OutSideWork) => (
    <div style={{ ...bodyStyle }}>
        <OpenMapOutSideWork rowItem={rowData} />
    </div>
);
const StatusBody = (rowData: Checkin.OutSideWork) => (
    <div style={{ ...bodyStyle }}>
        <Tag
            style={{ background: `${statusCases(rowData?.status).bgcolor}`, color: `${statusCases(rowData?.status).color}` }}
            icon={`pi ${statusCases(rowData?.status).icon}`}
            value={statusCases(rowData?.status).statusla}
        />
    </div>
);

const reqestStartEndBody = (rowData: Checkin.OutSideWork) => (
    <div style={{ ...bodyStyle }}>
        <Tag style={{ background: `#d6e4ff`, color: `#2f54eb` }} value={`${formatDateLao(rowData?.punch_time)}`} />
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
        <Column key="0" field="work_out_id" header="ເລກທີ" body={(rowData: Checkin.OutSideWork) => codeBody(rowData)} headerStyle={{ minWidth: '3rem' }} />,
        <Column key="1" field="emp_code" header="ຊື່-ນາມສະກຸນ ລະຫັດ" body={titleBody} headerStyle={{ minWidth: '2rem' }} />,
        <Column key="3" field="description" header="ລາຍລະອຽດ" body={descBody} headerStyle={{ minWidth: '8rem' }} />,
        <Column key="4" field="punch_time" header="ເວລາ-ຮ້ອງຂໍ" body={reqestStartEndBody} headerStyle={{ minWidth: '2rem' }} alignHeader='center' />,
        <Column key="6" field="longitude" header="ສະຖານທີກົດ" body={LocateBody} headerStyle={{ minWidth: '2rem' }} alignHeader='center' />,
        <Column key="7" field="status" header="ສະຖານະ" body={StatusBody} headerStyle={{ minWidth: '2rem' }} alignHeader='center' />,
        <Column key="8" body={(rowData: Checkin.OutSideWork) => <ActionBody rowData={rowData} onViewDoc={onViewDoc} />} headerStyle={{ minWidth: '5rem' }} />,
    ];
};
