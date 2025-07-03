'use client';

import React, { useState } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import { contant, translate } from '../utilities/contant-text.data';
import MonthlyTable from './monthly';
import EmployeeTable from './employee';


const DateComponent = () => {
    return (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <span className="text-xl text-900 font-bold">ລາຍງານ ການເຂົ້າ-ອອກວຽກ</span>
        </div>
    );
};

const DriveDocument = () => {
    const [lang, setLang] = useState("LA");

    return (
        <>
            <DateComponent />
            <TabView>
                {/* <TabPanel header={translate(contant, 'tabview', 'monthly_report', 'l_name', lang)} style={{ marginRight: "0.5rem" }}>
                    <MonthlyTable/>
                </TabPanel> */}
                <TabPanel header={translate(contant, 'tabview', 'employee_daily', 'l_name', lang)} style={{ marginRight: "0.5rem" }}>
                    <EmployeeTable/>
                </TabPanel>
            </TabView>
        </>
    );
};

export default DriveDocument;
