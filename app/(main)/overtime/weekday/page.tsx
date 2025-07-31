'use client';
import React from 'react'
import Table from './table/index';

interface Props {

}

const header = (
<div className="flex flex-wrap align-items-center justify-content-between gap-2">
    <span style={{color: "#2f54eb"}} className="text-xl font-bold">ລ່ວງເວລາ ວັນເຂົ້າການ</span>
</div>)

const page = (props: Props) => {
    return (
        <>
            {header}
            <Table />
        </>
    )
}
export default page;
