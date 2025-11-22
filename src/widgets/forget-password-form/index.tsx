"use client";
import { createFieldProps } from "@/src/shared/libs/form-utils";
import { Button } from "@/src/shared/ui/button";
import { Input } from "@/src/shared/ui/input";
import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import z from "zod";

const { fieldContext, formContext } = createFormHookContexts();

const { useAppForm } = createFormHook({
  fieldComponents: {
    Input,
  },
  formComponents: {
    Button,
  },
  fieldContext,
  formContext,
});

export const ForgetPasswordForm = () => {
  const form = useAppForm({
    defaultValues: {
      email: "",
    },
    validators: {
      onChange: z.object({
        email: z.email({ error: "Неправильно написана электронная почта" }),
      }),
    },
    onSubmit: ({ value }) => {
      // Do something with form data
      alert(JSON.stringify(value, null, 2));
    },
  });

  return (
    <form
      className="flex flex-col gap-4 w-full"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <div className="flex flex-col gap-3 w-full">
        <form.AppField {...createFieldProps("email", "Email", "email")} />
      </div>

      <form.AppForm>
        <form.Button size="large" className="w-min">
          Восстановить доступ
        </form.Button>
      </form.AppForm>
    </form>
  );
};
