import { AnyFieldApi } from "@tanstack/react-form";
import { FormField } from "../ui/field";

export const createFieldProps = <T, V extends AnyFieldApi>(
  name: T,
  label: string,
  type: "text" | "email" | "password" | "number" = "text"
) => ({
  name,
  children: (field: V) => (
    <FormField field={field} placeholder={label} type={type} />
  ),
});
