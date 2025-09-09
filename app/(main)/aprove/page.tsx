'use client';

import React, { useEffect, useState } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import FieldWorkTable from './field-work';
import { contant, translate } from '../utilities/contant-text.data';
import SickLeaveTable from './sick-leave';
import OutSideWorkTable from './outside-work';
import { useDepartmentStore } from '@/app/store/departments/deparmentStore';


const DateComponent = () => {
    return (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <span style={{ color: "#2f54eb" }} className="text-xl font-bold">ການຮ້ອງຂໍ</span>
        </div>
    );
};

const DriveDocument = () => {
    const { getDepartmentData } = useDepartmentStore()
    const [lang, setLang] = useState("LA");
    useEffect(() => {
        getDepartmentData()
    }, []);

    return (
        <>
            <DateComponent />
            <TabView>
                <TabPanel header={translate(contant, 'tabview', 'outside_work', 'l_name', lang)} style={{ marginRight: "0.5rem" }}>
                    <OutSideWorkTable />
                </TabPanel>
                <TabPanel header={translate(contant, 'tabview', 'field_work', 'l_name', lang)} style={{ marginRight: "0.5rem" }}>
                    <FieldWorkTable />
                </TabPanel>
                <TabPanel header={translate(contant, 'tabview', 'sick_leave', 'l_name', lang)} style={{ marginRight: "0.5rem" }}>
                    <SickLeaveTable />
                </TabPanel>
            </TabView>
        </>
    );
};

export default DriveDocument;
