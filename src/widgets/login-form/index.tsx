"use client";
import { useAuth } from "@/src/shared/api/context/auth-context";
import { createFieldProps } from "@/src/shared/libs/form-utils";
import { Endpoint } from "@/src/shared/models/endpoint-enum";
import { Button } from "@/src/shared/ui/button";
import { Input } from "@/src/shared/ui/input";
import { toast } from "@/src/shared/ui/toast";
import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { useRouter } from "next/navigation";

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

export const LoginForm = () => {
  const router = useRouter();
  const { login } = useAuth();

  const form = useAppForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onChange: z.object({
        email: z.email({ error: "Неправильно написана электронная почта" }),
        password: z
          .string()
          .min(8, { error: "Пароль должен быть больше 8-ми символов" }),
      }),
    },
    onSubmit: async ({ value }) => {
      try {
        await login(value);
        router.push(Endpoint.MY_COURSES);
      } catch {
        toast({
          title: "Некорректные данные",
          description: "Попробуйте ввести данные заново.",
          variant: "warning",
        });
      }
    },
  });

  return (
    <form
      className="flex flex-col gap-4 w-full"
      onSubmit={async (e) => {
        e.preventDefault();
        e.stopPropagation();
        await form.handleSubmit();
      }}
    >
      <div className="flex flex-col gap-3 w-full">
        <form.AppField {...createFieldProps("email", "Email", "email")} />
        <form.AppField
          {...createFieldProps("password", "Пароль", "password")}
        />
      </div>

      <form.AppForm>
        <form.Button type="submit" size="large" className="w-min">
          Вход
        </form.Button>
      </form.AppForm>
    </form>
  );
};
