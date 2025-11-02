export interface TabListProps<T extends readonly string[]> {
  elements: T;
  defaultValue?: T[number];
  onChange?: (value: T[number]) => void;
  size?: "small" | "large";
  className?: string;
}
