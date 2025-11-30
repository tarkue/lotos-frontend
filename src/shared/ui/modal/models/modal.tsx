import { DefaultFormModalProps } from "./form-modal-props";

export interface Modal {
  id: number;
  form: DefaultFormModalProps;
  isOpen: boolean;
}
