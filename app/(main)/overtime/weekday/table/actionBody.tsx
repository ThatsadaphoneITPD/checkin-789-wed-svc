import React, { useEffect } from 'react';
import { useFileCheckStore } from '@/app/store';
import GlobalPhotoView from '@/app/shared/photo-view/container';
import CreateOvertime from './create';
import { Checkin } from '@/types';

type Props = {
  rowData: Checkin.Overtime;
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
                getFileCheckin('Overtime', rowData?.file_path)
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
      <CreateOvertime rowItem={rowData} />
    </div>
  );
}
