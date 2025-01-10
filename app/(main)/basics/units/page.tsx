'use client';
import React, { useState } from 'react';
import UnitTable from './units-table';
import { contant, translate } from './contant.data';


const Department = () => {
    const [lang, setLang] = useState("LA");

    return (
        <div className="card">
            <h5>ຫ່ວຍງານ-ຈຸງານ</h5>
            <UnitTable/>
        </div>
    );
};

export default Department;
