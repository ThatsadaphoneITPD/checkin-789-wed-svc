'use client';
import React, { useState } from 'react';
import OfficesTable from './offices-table';
import { contant, translate } from './contant.data';


const Department = () => {
    const [lang, setLang] = useState("LA");

    return (
        <div className="card">
            <h5>ຫ້ອງການ-ສູນບໍລິການ</h5>
            <OfficesTable/>
        </div>
    );
};

export default Department;
