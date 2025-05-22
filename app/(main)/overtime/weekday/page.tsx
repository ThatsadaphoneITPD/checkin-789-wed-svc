'use client';
import React from 'react'
import Table from './table';

interface Props {

}

const header = (<div className="flex flex-wrap align-items-center justify-content-between gap-2"><span className="text-xl text-900 font-bold">ລວງເວລາ ວັນເຂົ້າການ</span></div>)

const page = (props: Props) => {
    return (
        <>
            {header}
            <Table />
        </>
    )
}
export default page;
