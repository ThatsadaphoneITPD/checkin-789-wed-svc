'use client';

import React, { useState } from 'react';
import { Column } from 'primereact/column';
import { Checkin } from '@/types';
import { statusCases } from '../../utilities/format-status';
import { Tag } from 'primereact/tag';
import Create from './create';
import { Tooltip } from 'primereact/tooltip';
import OpenMapOutSideWork from './open-map';

type ColumnsProps = {
    onViewDoc?: (work_out_id: string) => void;
    onEditItem?: (rowData: Checkin.MobileUser) => void;
};

const bodyStyle: React.CSSProperties = { display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", height: "100%" }

const titleBody = (rowData: Checkin.WorkArea) => (
    <>
        <span className="p-column-title">emp_code</span>
        {rowData?._key}
    </>
);

const descBody = (rowData: Checkin.WorkArea) => (
    <>
        <div>
            <Tooltip target=".custom-target-des" />
            <span className="custom-target-des" data-pr-tooltip={rowData?.area_name === "" ? "---" : rowData?.area_name} data-pr-position="bottom"  >
                <span style={{ display: "inline-block", maxWidth: "15rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", verticalAlign: "middle" }}>
                    {rowData?.area_name === "" ? "---" : rowData?.area_name}
                </span>
            </span>
        </div>
    </>
);

const LocateBody = (rowData: Checkin.WorkArea) => (
    <div style={{ ...bodyStyle }}>
        <OpenMapOutSideWork rowItem={rowData} />
    </div>
);

const LocateDepBranchBody = (rowData: Checkin.WorkArea) => (
    <div >
        {rowData?.location_name ? `${rowData?.location_name} [${rowData?.location_id}]` : '---'}
    </div>
);


const actionBody = (
    rowData: Checkin.WorkArea,
    openViewDoc: (fw_req_id: string) => void,
    // editSickLeave: (rowData: Checkin.SickLeave) => any,
) => {
    return (
        <div className="wrap-button">
            <Create rowItem={rowData} />
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
        <Column key="1" field="emp_code" header="ລະຫັດ" body={titleBody} headerStyle={{ minWidth: '2rem' }} />,
        <Column key="2" field="description" header="ສະຖານທີ່ ເຮັດວຽກ" body={descBody} headerStyle={{ minWidth: '10rem' }} />,
        <Column key="2" field="description" header="ສະຖານທີ່ ເຮັດວຽກ" body={LocateDepBranchBody} headerStyle={{ minWidth: '4rem' }} />,
        <Column key="3" field="longitude" header="ສັງກັດ" body={LocateBody} headerStyle={{ minWidth: '2rem' }} alignHeader='center' />,
        <Column key="9" body={(rowData: Checkin.WorkArea) => actionBody(rowData, openViewDoc)} headerStyle={{ minWidth: '5rem' }} alignHeader='center' />,
    ];
};
