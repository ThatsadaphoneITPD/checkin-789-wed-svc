'use client';
import React from 'react';
import { atom, useAtomValue, useSetAtom } from 'jotai';


// Define the types for the modal state
type ModalTypes = {
  header?: string;
  className?: string;
  view: React.ReactNode;
  isOpen: boolean;
  customSize?: string;
  dialogFooter?: React.ReactNode;

  formComponent?: ((children: React.ReactNode) => React.ReactNode) | null;
};

const modalAtom = atom<ModalTypes>({
  header: "",
  className: "p-fluid",
  isOpen: false,
  view: null,
  dialogFooter: null,
  formComponent: null,
  customSize: '450px',
});

// Define the custom hook for modal management
export function useModal() {
  const state = useAtomValue(modalAtom);
  const setState = useSetAtom(modalAtom);

  // Function to open the modal
  const openModal = ({
    header,
    className,
    view,
    dialogFooter,
    formComponent,
    customSize,
  }: {
    header?: string;
    className: string | undefined;
    view: React.ReactNode;
    dialogFooter: React.ReactNode;
    formComponent?: (children: React.ReactNode) => React.ReactNode;
    customSize?: string;
  }) => {
    setState({
      ...state,
      isOpen: true,
      header,
      className,
      view,
      dialogFooter,
      formComponent,
      customSize,
    });
  };

  // Function to close the modal
  const closeModal = () => {
    setState({
      ...state,
      isOpen: false,
    });
  };

  return {
    ...state,
    openModal,
    closeModal,
  };
}
