// components/form-field.tsx
import { Input } from "@/src/shared/ui/input";
import { Label } from "@/src/shared/ui/label";
import { AnyFieldApi } from "@tanstack/react-form";

interface FormFieldProps {
  field: AnyFieldApi;
  placeholder?: string;
  type?: "text" | "email" | "password" | "number";
}

export const FormField = ({
  field,
  placeholder,
  type = "text",
}: FormFieldProps) => {
  const hasError =
    !field.state.meta.isValid && field.state.meta.errors.length > 0;

  return (
    <div className="flex flex-col gap-1">
      <Input
        id={field.name}
        placeholder={placeholder}
        type={type}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.currentTarget.value)}
        onBlur={field.handleBlur}
        isValid={field.state.meta.isValid}
        className={hasError ? "border-red-500" : ""}
      />
      {hasError && (
        <Label className="text-red-500 text-sm">
          {field.state.meta.errors.map((el) => el.message).join(", ")}
        </Label>
      )}
    </div>
  );
};
