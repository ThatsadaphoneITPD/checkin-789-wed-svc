'use client';
import React, { useEffect } from 'react'
import WorkAreaTable from './table';
// import { useUsersStore } from '@/app/store/user/usersStore';

export default function Page() {
//   const {getUsersData} = useUsersStore();

  useEffect(() => {
    // getUsersData();
  }, []);
  return (
    <div>
      <WorkAreaTable/>
    </div>
  )
}
