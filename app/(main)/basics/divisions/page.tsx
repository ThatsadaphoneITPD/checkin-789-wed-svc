'use client';
import React, { useState } from 'react';
import DivisionsTable from './divisions-table';
import { contant, translate } from './contant.data';


const Department = () => {
    const [lang, setLang] = useState("LA");

    return (
        <div className="card">
            <h5>ພະແນກ-ສູນ-ສາຂາ</h5>
            <DivisionsTable/>
        </div>
    );
};

export default Department;
