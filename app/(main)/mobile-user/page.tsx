'use client';
import React, { useEffect } from 'react'
import MobileUserTable from './table';
import { useDepartmentStore } from '@/app/store/departments/deparmentStore';
import { useEffectOnce } from 'react-use';

export default function Page() {
  const {getDepartmentData} = useDepartmentStore()
  useEffect(() => {
    getDepartmentData()
  }, []);

  return (
    <div>
      <MobileUserTable />
    </div>
  )
}
