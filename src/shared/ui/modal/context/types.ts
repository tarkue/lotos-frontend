import { DefaultFormModalProps } from "../models/form-modal-props";

export interface ModalContextType {
  modals: DefaultFormModalProps[];
  addModal: (modal: Omit<DefaultFormModalProps, "id">) => number;
  removeModal: (id: number) => void;
  clear: () => void;
}
