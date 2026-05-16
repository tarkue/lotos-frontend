export interface TabListProps<T extends readonly string[]> {
  elements: T;
  defaultValue?: T[number];
  onChange?: (value: T[number]) => void;
  className?: string;
  width?: `${string}px`;
}
