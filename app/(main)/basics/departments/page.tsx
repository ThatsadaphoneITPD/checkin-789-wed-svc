'use client';
import React, { useState } from 'react';
import DepartmentsTable from './departments-table';
import { contant, translate } from './contant.data';


const Department = () => {
    const [lang, setLang] = useState("LA");

    return (
        <div className="card">
            <h5>ຝ່າຍ-ຫ້ອງການ-ສະຖາບັນ</h5>
            <DepartmentsTable/>
        </div>
    );
};

export default Department;
