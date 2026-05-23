export interface DefaultFormModalProps {
  id: number;
  maxWidth?: `${number}px`;
  title?: string;
  description?: string;
  className?: string;
  fields?: React.ReactNode;
  buttons?: React.ReactNode;
}
