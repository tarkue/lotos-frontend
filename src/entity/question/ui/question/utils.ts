import { CheckBoxFieldProps } from "@/src/shared/ui/checkbox/props";
import { RadioFieldProps } from "@/src/shared/ui/radio";

export const getVariant = (
  isCorrect: boolean | undefined,
): RadioFieldProps["variant"] | CheckBoxFieldProps["variant"] => {
  if (isCorrect === undefined) return "default";
  return isCorrect ? "success" : "error";
};
