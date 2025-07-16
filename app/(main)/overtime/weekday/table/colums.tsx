import React, { useEffect, useRef, useState } from 'react';
import { Column } from 'primereact/column';
import { Checkin } from '@/types';
import { formatDateLao, formatDayMonth } from '@/app/(main)/utilities/format-date';
import { Tag } from 'primereact/tag';
import CreateOvertime from './create';
import { useFileCheckStore, useOvertimeStore } from '@/app/store';
import { Tooltip } from 'primereact/tooltip';
import { statusCases, statusLeaveType } from '@/app/(main)/utilities/format-status';
import OpenMapOutSideWork from './open-map';
import GlobalPhotoView from '@/app/shared/photo-view/container';
import ActionBody from './actionBody';
type ColumnsProps = {
    onViewDoc?: (file_path: string) => void;
    onEditItem?: (rowData: Checkin.Overtime) => void;
};

const bodyStyle: React.CSSProperties = { display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", height: "100%" }

// Column body templates
const codeBody = (rowData: Checkin.Overtime) => {
    return (
        <>
            <span className="p-column-title">ID</span>
            <div className="rownew-container">
                <div>
                    <span>{rowData?.ot_id}</span>
                </div>
            </div>
        </>
    );
};

const titleBody = (rowData: Checkin.Overtime) => (
    <>
        <span className="p-column-title">emp_code</span>
        {rowData?.fullName ? <>{rowData?.fullName}[{rowData?.emp_code}]</>: rowData?.emp_code }
    </>
);

const descBody = (rowData: Checkin.Overtime) => (
    <>
        <span className="p-column-title">description</span>
        <div>
            <Tooltip target=".custom-target-des" />
            <span className="custom-target-des" data-pr-tooltip={rowData?.description === "" ? "---" : rowData?.description} data-pr-position="bottom"  >
                <span style={{ display: "inline-block", maxWidth: "8rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", verticalAlign: "middle" }}>
                    {rowData?.description === "" ? "---" : rowData?.description}
                </span>
            </span>
        </div>
    </>
);

const StatusBody = (rowData: Checkin.Overtime) => (
    <div style={{ ...bodyStyle }}>
        <Tag
            style={{ background: `${statusCases(rowData?.status).bgcolor}`, color: `${statusCases(rowData?.status).color}` }}
            icon={`pi ${statusCases(rowData?.status).icon}`}
            value={statusCases(rowData?.status).statusla}
        />
    </div>
);

const LocateBody = (rowData: Checkin.Overtime) => (
    <div style={{ ...bodyStyle }}>
        <OpenMapOutSideWork rowItem={rowData} />
    </div>
);

const reqestTimeBody = (rowData: Checkin.Overtime) => (
    <>
        <span className="p-column-title">created_at</span>
        <Tag style={{ background: `#d6e4ff`, color: `#2f54eb` }} value={`${formatDateLao(rowData?.punch_time)}`} />
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
        // <Column key="0" body={(rowData: Checkin.Overtime) => iconOvertimeBody(rowData)} headerStyle={{ minWidth: '2rem' }} />,
        <Column key="0" field="leave_req_id" header="ເລກທີ" body={(rowData: Checkin.Overtime) => codeBody(rowData)} headerStyle={{ minWidth: '3rem' }} />,
        <Column key="1" field="emp_code" header="ລະຫັດ" body={titleBody} headerStyle={{ minWidth: '2rem' }} />,
        <Column key="2" field="description" header="ເຫດຜົນ" body={descBody} headerStyle={{ minWidth: '8rem' }} />,
        <Column key="3" field="longitude" header="ສະຖານທີກົດ" body={LocateBody} headerStyle={{ minWidth: '2rem' }} alignHeader='center' />,
        <Column key="4" field="status" header="ສະຖານະ" body={StatusBody} headerStyle={{ minWidth: '5rem' }} alignHeader='center' />,
        <Column key="5" field="create_at" header="ເວລາ OT ກົດເຂົ້າ-ອອກ" body={reqestTimeBody} headerStyle={{ minWidth: '2rem' }} />,
        <Column key="6" body={(rowData: Checkin.Overtime) => <ActionBody rowData={rowData} onViewDoc={onViewDoc} />} headerStyle={{ minWidth: '5rem' }} alignHeader='center' />,
    ];
};
