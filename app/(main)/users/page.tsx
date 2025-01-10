'use client';

import React, { useState } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import { contant, translate } from './contant-import.data';


const DateComponent = () => {
    return (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <span className="text-xl text-900 font-bold">ເອກະສານຂາເຂົ້າ </span>
        </div>
    );
};

const ImportDocument = () => {
    const [lang, setLang] = useState("LA");

    return (
        <>
            <DateComponent />
            <TabView>
                <TabPanel header={translate(contant, 'tabview', 'import', 'l_name', lang)} style={{ marginRight: "0.5rem" }}>
                <div>Hi</div>
                </TabPanel>
                <TabPanel header={translate(contant, 'tabview', 'department_department', 'l_name', lang)} style={{ marginRight: "0.5rem" }}>
                <div>Hi</div>
                </TabPanel>
            </TabView>
        </>
    );
};

export default ImportDocument;
