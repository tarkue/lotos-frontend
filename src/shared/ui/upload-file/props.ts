import { InputProps } from "../input/props";

export interface UploadFileProps extends InputProps {
  onFilesChange?: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // в байтах
}
