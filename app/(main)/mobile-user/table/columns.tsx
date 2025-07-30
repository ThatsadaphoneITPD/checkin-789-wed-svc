'use client';

import React, { useState } from 'react';
import { Column } from 'primereact/column';
import { Checkin } from '@/types';
// import { statusCases } from '../../utilities/format-status';
// import { Tag } from 'primereact/tag';
// import Create from './create';
import { Tooltip } from 'primereact/tooltip';
import ActionButtons from './actionButtons';

type ColumnsProps = {
    onViewDoc?: (work_out_id: string) => void;
    onEditItem?: (rowData: Checkin.MobileUser) => void;
};

const bodyStyle: React.CSSProperties = { display: "flex", justifyContent: "start", alignItems: "start", flexDirection: "column", height: "100%" }

const titleID = (rowData: Checkin.MobileUser) => (
    <>
        <span className="p-column-title">ID</span>
        {rowData?._key}
    </>
);
const titleBody = (rowData: Checkin.MobileUser) => (
    <>
        <div>
            <Tooltip target=".custom-target-emcode" />
            <span className="custom-target-emcode" data-pr-tooltip={rowData?.device_id === "" ? "ບໍ່ໄດ້ Login ເຄື່ອງ" : rowData?.device_id} data-pr-position="bottom"  >
                <span style={{ marginLeft: "0.2rem" }}> {rowData?.emp_code}</span>
            </span>
        </div>
    </>
);

const descBody = (rowData: Checkin.MobileUser) => (
    <>
        <div>
            <Tooltip target=".custom-target-des" />
            <span className="custom-target-des" data-pr-tooltip={rowData?.fullname === "" ? "---" : rowData?.fullname} data-pr-position="bottom"  >
                <span style={{ display: "inline-block", maxWidth: "13rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", verticalAlign: "middle" }}>
                    {rowData?.fullname === "" ? "---" : rowData?.fullname}
                </span>
            </span>
        </div>
    </>
);

const positionBody = (rowData: Checkin.MobileUser) => (
    <>
        <div>
            <span className="custom-target-des" >
                <span >{rowData?.position}</span>
            </span>
        </div>
    </>
);

const LocateWorkArea = (rowData: Checkin.MobileUser) => (
    <div>
        {rowData?.workAreas?.length ? `${rowData?.workAreas?.[0]?.area_name}` : ""} 
    </div>
);
const LocateDivision = (rowData: Checkin.MobileUser) => (
    <div style={{ ...bodyStyle }}>
        <Tooltip target=".custom-target-dep" />
        <span className="custom-target-dep" data-pr-tooltip={rowData?.department === "" ? "---" : rowData?.department} data-pr-position="bottom"  >
            <span style={{ display: "inline-block", maxWidth: "13rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", verticalAlign: "middle" }}>
                {rowData?.division != null ? ` ${rowData?.division != null ? `${rowData?.division}` : ""} `: "--" }
            </span>
        </span>
    </div>
);
// const StatusBody = (rowData: Checkin.MobileUser) => (
//     <div style={{ ...bodyStyle }}>
//         {rowData?.device_id}
//     </div>
// );

export const GetColumns = ({
    onViewDoc,
}: ColumnsProps) => {
    const openViewDoc = (file_path: string) => {
        if (onViewDoc) {
            onViewDoc(file_path);
        }
    };

    return [
        <Column key="1" field="ID" header="No" body={titleID} headerStyle={{ minWidth: '2rem' }} />,
        <Column key="2" field="emp_code" header="ລະຫັດ" body={titleBody} headerStyle={{ minWidth: '2rem' }} />,
        <Column key="3" field="description" header="ຊື່ - ນາມສະກຸນ" body={descBody} headerStyle={{ minWidth: '8rem' }} />,
        <Column key="4" field="position" header="ຕຳແໜ່ງ" body={positionBody} headerStyle={{ minWidth: '8rem' }} />,
        // <Column key="4" field="longitude" header="ຝ່າຍ" body={LocateDepartment} headerStyle={{ minWidth: '2rem' }} />,
        <Column key="5" field="longitude" header="ພະແນກ" body={LocateDivision} headerStyle={{ minWidth: '2rem' }} />,
        <Column key="6" field="work_area_id" header="ສະຖານທີ ເຮັດວຽກ" body={LocateWorkArea} headerStyle={{ minWidth: '2rem' }} />,
        <Column key="7" body={(rowData: Checkin.MobileUser) => (<ActionButtons rowData={rowData} openViewDoc={openViewDoc} />)} headerStyle={{ minWidth: '5rem' }} />
    ];
};
