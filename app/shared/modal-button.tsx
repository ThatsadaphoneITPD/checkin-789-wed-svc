'use client';

import { PiPlusBold } from 'react-icons/pi';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { Button, ButtonProps } from 'primereact/button'; // Importing ButtonProps directly from primereact

interface ModalButtonProps extends ButtonProps {
  header?: string;
  label?: string;
  className?: string;
  customSize?: string;
  icon?: React.ReactNode;
  view: React.ReactNode;
  dialogFooter?: React.ReactNode;
  formComponent?: (children: React.ReactNode) => React.ReactNode;
}

export default function ModalButton({
  header = "",
  label = 'Add New',
  className,
  customSize = '500px',
  view,
  dialogFooter,
  formComponent,
  icon = <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />,
  ...rest
}: ModalButtonProps) {
  const { openModal } = useModal();

  return (
    <Button
      label={label}
      icon={icon}
      className={className}
      onClick={() =>
        openModal({
          view,
          header,
          className: '',
          customSize,
          dialogFooter,
          formComponent,
        })
      }
      {...rest}
    />
  );
}
