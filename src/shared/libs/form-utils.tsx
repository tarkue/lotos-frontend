import { AnyFieldApi } from "@tanstack/react-form";
import { FormField } from "../ui/field";
import { Typography } from "../ui/typography";

export const createFieldProps = <T, V extends AnyFieldApi>(
  name: T,
  placeholder: string,
  type: "text" | "email" | "password" | "number" = "text",
  label: string = ""
) => ({
  name,
  children: (field: V) => (
    <div className="flex flex-col gap-2">
      {label && (
        <Typography.Body className="p-0 text-black">{label}</Typography.Body>
      )}
      <FormField field={field} placeholder={placeholder} type={type} />
    </div>
  ),
});
