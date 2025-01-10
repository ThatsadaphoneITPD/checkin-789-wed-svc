'use client';
import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Checkin } from '@/types';
import MapMarkerWithPathIcon from '@/app/components/icons/map-marker-with-path';
import GoogleMapShow from '@/app/shared/google-map/displaymap';

interface LocateOutSideWorkProps {
    rowItem: Checkin.OutSideWork;
}


export default function OpenMapOutSideWork({ rowItem }: LocateOutSideWorkProps) {

  const [openModal, setopenModal] = useState(false)
  const handOpen = () => { setopenModal(true) }
  const handClose = () => { setopenModal(false) }

  const DialogFooter = (
    <>
      {/* <Button label="ສ້າງ" icon="pi pi-check" form="createExportForm" type="submit" /> */}
    </>
  );
  const header = (<div style={{ width: "100%", display: "flex", justifyContent: "center", color: "#2684FF" }}><div>ພິກັດ ວຽກນອກ ({rowItem?.emp_code})</div></div>)

  return (
    <>
      <Dialog visible={openModal} header={header} footer={DialogFooter} onHide={handClose} style={{ width: "80%", padding: "none", marginBottom: "none" }} modal className={`modal-form `}>
        <GoogleMapShow lat={rowItem?.latitude} lng={rowItem?.longitude} height='600px' />
      </Dialog>
       <MapMarkerWithPathIcon style={{width: "2.1rem", height: "2.1rem"}} onClick={handOpen}/> 
    </>
  );
}
