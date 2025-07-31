'use client';
import React, { useEffect } from 'react'
import MobileUserTable from './table';
import { useDepartmentStore } from '@/app/store/departments/deparmentStore';
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";

export default function Page() {
  const { getDepartmentData } = useDepartmentStore()
  useEffect(() => {
    getDepartmentData()
  }, []);

  const TitleComponent = () => {
    return (
      <div className="flex items-center justify-between flex-wrap gap-2">
        <span style={{color: "#2f54eb"}} className="text-xl font-bold flex items-center">
          <HiOutlineDevicePhoneMobile size={24} className="mr-2 mt-1" />
          ຈັດການ ຂໍ້ມູນພະນັກງານ
        </span>
      </div>
    );
  };

  return (
    <div>
      <TitleComponent />
      <MobileUserTable />
    </div>
  )
}
