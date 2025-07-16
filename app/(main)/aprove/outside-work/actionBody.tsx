import React, { useEffect } from 'react';
import { useFileCheckStore } from '@/app/store';
import GlobalPhotoView from '@/app/shared/photo-view/container';
import CreateOutSideWork from './create-outside-work';
import { Checkin } from '@/types';

type Props = {
  rowData: Checkin.OutSideWork;
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
                getFileCheckin('WorkOutside', rowData?.file_path)
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
      <CreateOutSideWork rowItem={rowData} />
    </div>
  );
}
