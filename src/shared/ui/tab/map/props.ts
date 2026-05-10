export interface TabListProps<T extends readonly string[]> {
  elements: T;
  onChange?: (value: T[number]) => void;
  className?: string;
  width?: `${string}px`;
}
