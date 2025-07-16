import React from 'react';
import { Column } from 'primereact/column';
import { Checkin } from '@/types';
import { formatDateLao } from '@/app/(main)/utilities/format-date';
import { Tag } from 'primereact/tag';
import { Tooltip } from 'primereact/tooltip';
import { status_in_out } from '@/app/(main)/utilities/format-status';
type ColumnsProps = {
    onViewDoc?: (rowData: Checkin.CheckinManual) => void;
    onEditItem?: (rowData: Checkin.CheckinManual) => void;
};

const bodyStyle: React.CSSProperties = { display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", height: "100%" }

// Column body templates
const codeBody = (rowData: Checkin.CheckinManual) => {
    return (
        <>
            <span className="p-column-title">ID</span>
            <div className="rownew-container">
                <div>
                    <span>{rowData?.id}</span>
                </div>
            </div>
        </>
    );
};

const titleBody = (rowData: Checkin.CheckinManual) => (
    <>
        <span className="p-column-title">emp_code</span>
        {rowData?.emp_code}
    </>
);

const descBody = (rowData: Checkin.CheckinManual) => (
    <>
        <span className="p-column-title">description</span>
        <div>
            <Tooltip target=".custom-target-des" />
            <span className="custom-target-des"   data-pr-tooltip={rowData?.comments === "" ? "---" : rowData?.comments}   data-pr-position="bottom"  >
                <span style={{ display: "inline-block",  maxWidth: "8rem",  whiteSpace: "nowrap",  overflow: "hidden",  textOverflow: "ellipsis",  verticalAlign: "middle" }}>
                    {rowData?.comments === "" ? "---" : rowData?.comments}
                </span>
            </span>
        </div>
    </>
);

const StatusBody = (rowData: Checkin.CheckinManual) => (
    <div style={{ ...bodyStyle }}>
        <Tag
            style={{ background: `${status_in_out(rowData?.status_in_out).bgcolor}`, color: `${status_in_out(rowData?.status_in_out).color}` }}
            icon={`pi ${status_in_out(rowData?.status_in_out).icon}`}
            value={status_in_out(rowData?.status_in_out).statusla}
        />
    </div>
);

const LocateBody = (rowData: Checkin.CheckinManual) => (
    <div style={{ ...bodyStyle }}>
        {/* <OpenMapOutSideWork rowItem={rowData} /> */}
    </div>
);

const reqestTimeBody = (rowData: Checkin.CheckinManual) => (
    <>
        <span className="p-column-title">created_at</span>
         <Tag style={{background: `#d6e4ff`, color: `#2f54eb`}} value={`${formatDateLao(rowData?.check_date)}`}/>
    </>
);

// Action body with dropdown menu
const actionBody = (
    rowData: Checkin.CheckinManual,
    openViewDoc: (rowData: Checkin.CheckinManual,) => void,
    // editCheckinManual: (rowData: Checkin.CheckinManual) => any,
) => {

     const urltest = 'https://res.cloudinary.com/dp3zeejct/image/upload/v1679296309/Emagi/chedar_SourCream_yw9meg.jpg'
        return (
            <div className="wrap-button">
                <button className="button" onClick={()=> openViewDoc(rowData)}>
                    <i className="pi pi-pencil" />
                </button>
            </div>
        );
};




export const GetColumns = ({
    onViewDoc,
}: ColumnsProps) => {
   const openViewDoc = (rowData: Checkin.CheckinManual) => {
        if (onViewDoc) {
            onViewDoc(rowData);
        }
    };

    return [
        // <Column key="0" body={(rowData: Checkin.CheckinManual) => iconCheckinManualBody(rowData)} headerStyle={{ minWidth: '2rem' }} />,
        <Column key="0" field="leave_req_id" header="ເລກທີ" body={(rowData: Checkin.CheckinManual) => codeBody(rowData)} headerStyle={{ minWidth: '1rem' }} />,
        <Column key="1" field="emp_code" header="ລະຫັດ" body={titleBody} headerStyle={{ minWidth: '2rem' }} />,
        <Column key="2" field="reson" header="ເຫດຜົນ" body={descBody} headerStyle={{ minWidth: '5rem' }} />,
        <Column key="4" field="status" header="ການກົດ" body={StatusBody} headerStyle={{ minWidth: '2rem' }} alignHeader='center' />,
        <Column key="5" field="create_at" header="ເວລາ ເຂົ້າ-ອອກ" body={reqestTimeBody} headerStyle={{ minWidth: '2rem' }} />,
        <Column key="6" body={(rowData: Checkin.CheckinManual) => actionBody(rowData, openViewDoc)}  alignHeader='center' />,
    ];
};
