// ActionButtons.tsx
'use client';

import React, { useState } from 'react';
import { Checkin } from '@/types';
import Create from './create';

type Props = {
  rowData: Checkin.MobileUser;
  openViewDoc: (file_path: string) => void;
};

const ActionButtons: React.FC<Props> = ({ rowData, openViewDoc }) => {
  const [unlockLoad, setUnload] = useState(false);
  const [Resetload, setResetload] = useState(false);
  const [ResetIDload, setResetIDload] = useState(false);

  const handleUnload = () => {
    setUnload(true);
    setTimeout(() => setUnload(false), 800);
  };

  const handleReset = () => {
    setResetload(true);
    setTimeout(() => setResetload(false), 800);
  };

  const handleResetID = () => {
    setResetIDload(true);
    setTimeout(() => setResetIDload(false), 800);
  };

  return (
    <div className="wrap-button">
      <button className="button unlock-button custom-target-des" data-pr-tooltip="ປົດລ໋ອກ" onClick={handleUnload} disabled={unlockLoad}>
        {unlockLoad ? <i className="pi pi-spin pi-cog" /> : <i className="pi pi-unlock" />}
      </button>
      <button className="button reset-button custom-target-des" data-pr-tooltip="ຣີ່ເຊັດ ລະຫັດຜ່ານ" onClick={handleReset} disabled={Resetload}>
        {Resetload ? <i className="pi pi-spin pi-cog" /> : <i className="pi pi-refresh" />}
      </button>
      <button className="button resetMobileId-button custom-target-des" data-pr-tooltip="ລ້າງ Id ອຸປະກອບ" onClick={handleResetID} disabled={ResetIDload}>
        {ResetIDload ? <i className="pi pi-spin pi-cog" /> : <i className="pi pi-mobile" />}
      </button>
      <Create rowItem={rowData} />
    </div>
  );
};

export default ActionButtons;
