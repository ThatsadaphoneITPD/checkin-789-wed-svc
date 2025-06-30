'use client';
import React, { useEffect } from 'react'
import CheckinManual from './table';

export default function Page() {
  // const {getUsersData} = useUsersStore();

  // useEffect(() => {
  //   getUsersData();
  // }, []);
  return (
    <div style={{color: "black"}}>
     <CheckinManual/>
    </div>
  )
}
