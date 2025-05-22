'use client';
import React from 'react'

interface Props {

}

const page = (props: Props) => {

    const header = (<div className="flex flex-wrap align-items-center justify-content-between gap-2"><span className="text-xl text-900 font-bold">ລວງເວລາ ວັນພັກການ</span></div>)

    return (
        <>
            {header}
        </>
    )
}

export default page;
