'use client';
import React, { useEffect } from 'react'
import Table from './table/index';
import { useDepartmentStore } from '@/app/store/departments/deparmentStore';

interface Props {

}

const header = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
        <span style={{ color: "#2f54eb" }} className="text-xl font-bold">ລ່ວງເວລາ ວັນເຂົ້າການ</span>
    </div>)

const Page = (props: Props) => {
    const { getDepartmentData } = useDepartmentStore()
    useEffect(() => {
        getDepartmentData()
    }, []);
    return (
        <>
            {header}
            <Table />
        </>
    )
}
export default Page;
