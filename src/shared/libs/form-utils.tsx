import { AnyFieldApi } from "@tanstack/react-form";
import { FormField } from "../ui/field";
import { Typography } from "../ui/typography";
import { RadioField } from "../ui/radio";

export const createFieldProps = <T, V extends AnyFieldApi>(
  name: T,
  placeholder: string,
  type: "text" | "email" | "password" | "number" = "text",
  label: string = "",
  as: "input" | "textarea" = "input",
) => ({
  name,
  children: (field: V) => (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <Typography.Body bold className="p-0 text-dark-gray select-none">
          {label}
        </Typography.Body>
      )}
      <FormField field={field} placeholder={placeholder} type={type} as={as} />
    </div>
  ),
});

export const createFieldRadioProps = <T, V extends AnyFieldApi>(
  name: T,
  value: string,
  label: string,
) => ({
  name,

  children: (field: V) => (
    <RadioField
      field={label}
      checked={field.state.value == value}
      value={value}
      onChange={() => field.setValue(value)}
    />
  ),
});
