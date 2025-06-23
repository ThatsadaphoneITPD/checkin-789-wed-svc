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
        {rowData?.emp_code}
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


// Action body with dropdown menu
const actionBody = (
    rowData: Checkin.OutSideWork,
    openViewDoc: (file_path: string) => void,
    // editOutSideWork: (rowData: Checkin.OutSideWork) => any,
) => {
    const urltest = 'https://res.cloudinary.com/dp3zeejct/image/upload/v1679296309/Emagi/chedar_SourCream_yw9meg.jpg'
    return (
         <div className="wrap-button">
            <GlobalPhotoView
                image={urltest}
                // image={rowData?.file_path}
                render={() => (
                    <button className="button">
                    <i className="pi pi-images" />
                    </button>
                )}
            />
            <CreateOutSideWork rowItem={rowData} />
        </div>
    );
};


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
        <Column key="1" field="emp_code" header="ລະຫັດ" body={titleBody} headerStyle={{ minWidth: '2rem' }} />,
        <Column key="3" field="description" header="ລາຍລະອຽດ" body={descBody} headerStyle={{ minWidth: '8rem' }} />,
        <Column key="4" field="punch_time" header="ເວລາ-ຮ້ອງຂໍ" body={reqestStartEndBody} headerStyle={{ minWidth: '2rem' }} alignHeader='center' />,
        <Column key="6" field="longitude" header="ສະຖານທີກົດ" body={LocateBody} headerStyle={{ minWidth: '2rem' }} alignHeader='center' />,
        <Column key="7" field="status" header="ສະຖານະ" body={StatusBody} headerStyle={{ minWidth: '2rem' }} alignHeader='center' />,
        <Column key="8" body={(rowData: Checkin.OutSideWork) => actionBody(rowData, openViewDoc)} headerStyle={{ minWidth: '5rem' }} />,
    ];
};
