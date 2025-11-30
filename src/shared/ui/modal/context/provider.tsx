"use client";
import { cn } from "@/src/shared/libs/utils";
import { useEffect, useState } from "react";
import { DefaultFormModalProps } from "../models/form-modal-props";
import { ModalContainer } from "../ui/container";
import { DefaultFormModal } from "../ui/form";
import { ModalContext } from "./context";

const MAX_MODALS = 2 as const;

export const ModalProvider = ({ children }: { children?: React.ReactNode }) => {
  const [modals, setModals] = useState<DefaultFormModalProps[]>([]);

  useEffect(() => {
    if (modals.length > 0) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      document.body.style.overflowX = "hidden";
    }
  }, [modals]);

  const genId = () => {
    const maxId = modals.reduce((max, modal) => Math.max(max, modal.id), 0);

    return (maxId + 1) % MAX_MODALS;
  };

  const clear = () => setModals([]);

  const addModal = (modal: Omit<DefaultFormModalProps, "id">) => {
    const id = genId();
    const newModal = {
      id,
      isOpen: true,
      ...modal,
    };

    if (modals.length == MAX_MODALS) {
      removeModal(modals[0].id);
    }
    setModals((prevModals) => [...prevModals, newModal]);
    return id;
  };

  const removeModal = (id: number) => {
    setModals((prevModals) => prevModals.filter((modal) => modal.id !== id));
  };

  return (
    <ModalContext.Provider value={{ modals, addModal, removeModal, clear }}>
      {children}
      {modals.map((modal, key) => (
        <ModalContainer key={key} id={modal.id}>
          <DefaultFormModal
            {...modal}
            className={cn("w-full", modal.className)}
          />
        </ModalContainer>
      ))}
    </ModalContext.Provider>
  );
};
