// ActionButtons.tsx
'use client';

import React, { useState } from 'react';
import { Checkin } from '@/types';
import Create from './create';
import { useUsersStore } from '@/app/store/user/usersStore';
import toast from 'react-hot-toast';
import { authenStore, useWorkAreaStore } from '@/app/store';

type Props = {
  rowData: Checkin.MobileUser;
  openViewDoc: (file_path: string) => void;
};

const ActionButtons: React.FC<Props> = ({ rowData, openViewDoc }) => {
  const [unlockLoad, setUnload] = useState(false);
  const [Resetload, setResetload] = useState(false);
  const [ResetIDload, setResetIDload] = useState(false);
  const { resetDeviceId } = useUsersStore();
  const { authData } = authenStore();
  const { getzWorkAreaByLocationId } = useWorkAreaStore();

  const handleUnlock = () => {
    setUnload(true);
    setTimeout(() => setUnload(false), 800);
  };
  const AllowChangeLocation = ["admin", "branchadmin"].includes(authData?.role ?? "");

  const handleWorkArea = () => {
    if (!authData?.role) return;
    if (authData?.role === "admin") {
      getzWorkAreaByLocationId(  rowData?.workAreas?.[0]?.location_id ?? null);
    } else if (authData.role === "branchadmin") {
      getzWorkAreaByLocationId( authData?.location ? Number(authData?.location) : null);
    }
  };

  const handleReset = () => {
    setResetload(true);
    setTimeout(() => setResetload(false), 800);
  };

  const handleResetDeviceID = async () => {
    setResetIDload(true);
    resetDeviceId(rowData?.user_id).then((res: any) => {
      setTimeout(() => {
        if (res?.status === 201 || res?.status === 200) {
          toast.success(res.sms);
        } else {
          toast.error(res?.sms);
        }
        setResetIDload(false)
      },
        800);
    })
  }
  return (
    <div className="wrap-button">
      {/* <button className="button unlock-button custom-target-des" data-pr-tooltip="ປົດລ໋ອກ" onClick={handleUnlock} disabled={unlockLoad}>
        {unlockLoad ? <i className="pi pi-spin pi-cog" /> : <i className="pi pi-unlock" />}
      </button> */}
      <button className="button reset-button custom-target-des" data-pr-tooltip="Reset" onClick={handleReset} disabled={Resetload}>
        {Resetload ? <i className="pi pi-spin pi-cog" /> : <i className="pi pi-refresh" />}
      </button>
      <button className="button resetMobileId-button custom-target-des" data-pr-tooltip="Device" onClick={handleResetDeviceID} disabled={ResetIDload}>
        {ResetIDload ? <i className="pi pi-spin pi-cog" /> : <i className="pi pi-mobile" />}
      </button>
      {AllowChangeLocation && <Create rowItem={rowData} handleCallWorkArea={handleWorkArea} />}
    </div>
  );
};

export default ActionButtons;
