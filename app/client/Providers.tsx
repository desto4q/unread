import { createContext, useContext, useEffect, useRef, useState } from "react";
import Dialog from "~/components/Dialog";
const DialogContext = createContext<{
  openModal: () => void;
  closeModal: () => void;
} | null>(null);
export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  let ref = useRef<HTMLDialogElement>(null);
  let closeModal = () => ref.current?.close();
  let openModal = () => ref.current?.showModal();

  let values = {
    openModal,
    closeModal,
  };

  return (
    <DialogContext.Provider value={values}>
      {children}
      <Dialog dialogRef={ref}></Dialog>
    </DialogContext.Provider>
  );
};

export const useDialogContext = () => {
  let ctx = useContext(DialogContext);
  if (!ctx)
    throw new Error("useDialogContext must be used inside DialogProvider");
  return ctx;
};
