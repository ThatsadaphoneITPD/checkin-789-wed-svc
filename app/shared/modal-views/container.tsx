'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Dialog } from '@/app/components/ui/modal';
import { useModal } from './use-modal';

export default function GlobalModal() {
  const { isOpen, view, closeModal, customSize, header, dialogFooter, formComponent, className } = useModal();
  const pathname = usePathname();

  useEffect(() => {
    closeModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname,]);
  useEffect(() => {
    view
  }, [formComponent ,view]);

  return (
     <Dialog
       visible={isOpen}
       header={header}
       footer={dialogFooter}
       onHide={closeModal}
       style={{ width: customSize, padding: "none", marginBottom: "none" }}
       modal
       className={`modal-form ${className}`}>
       {view}
      </Dialog>
  );
}
