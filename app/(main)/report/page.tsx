'use client';

import React, { useState } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import { contant, translate } from '../utilities/contant-text.data';
import MonthlyTable from './monthly';
import EmployeeTable from './employee';


const DateComponent = () => {
    return (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <span style={{ color: "black" }} className="text-xl font-bold">ລາຍງານ ການເຂົ້າ-ອອກວຽກ</span>
        </div>
    );
};

const DriveDocument = () => {
    const [lang, setLang] = useState("LA");

    return (
        <>
            <DateComponent />
            <EmployeeTable />
        </>
    );
};

export default DriveDocument;
