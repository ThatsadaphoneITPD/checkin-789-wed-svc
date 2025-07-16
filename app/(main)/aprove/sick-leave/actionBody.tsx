import React, { useEffect } from 'react';
import { useFileCheckStore } from '@/app/store';
import GlobalPhotoView from '@/app/shared/photo-view/container';
import CreateSickLeave from './create-sick-leave';
import { Checkin } from '@/types';

type Props = {
  rowData: Checkin.SickLeave;
  onViewDoc: (file_path: string) => void;
};

export default function ActionBody({ rowData, onViewDoc }: Props) {
  const { fileUrl, getFileCheckin } = useFileCheckStore();
  const isPDF = rowData?.file_path?.toLowerCase().endsWith('.pdf');

  return (
    <div className="wrap-button">
      {!isPDF ? (
        <GlobalPhotoView
          image={fileUrl}
          render={() => (
            <button
              className="button"
              onClick={() =>
                getFileCheckin('LeaveRequest', rowData?.file_path)
              }
            >
              <i className="pi pi-images" />
            </button>
          )}
        />
      ) : (
        <button
          className="button"
          onClick={() => onViewDoc(rowData?.file_path)}
        >
          <i className="pi pi-file-pdf" />
        </button>
      )}
      <CreateSickLeave rowItem={rowData} />
    </div>
  );
}
