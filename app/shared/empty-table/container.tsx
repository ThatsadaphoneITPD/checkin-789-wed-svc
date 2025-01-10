'use client';

import React from 'react'

interface empty {
    emptytext? : string
}

function EmptyData({emptytext = "No Data"} : empty) 
    {
  return (
    <div className='table-body'> 
        <div className='table-empty '/> 
        <span>{emptytext}</span>
    </div>
  )
}

export default EmptyData
