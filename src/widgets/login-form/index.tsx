"use client";
import { useAuth } from "@/src/shared/api/context/auth-context";
import { createFieldProps } from "@/src/shared/libs/form-utils";
import { Endpoint } from "@/src/shared/models/endpoint-enum";
import { Button } from "@/src/shared/ui/button";
import { Input } from "@/src/shared/ui/input";
import { Label } from "@/src/shared/ui/label";
import { toast } from "@/src/shared/ui/toast";
import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import Link from "next/link";
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
        router.push(Endpoint.ALL_COURSES);
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
        <div className="flex flex-col gap-2">
          <Label className="text-dark-gray">Почта</Label>
          <form.AppField
            {...createFieldProps("email", "example@mail.ru", "email")}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-dark-gray">Пароль</Label>
          <form.AppField
            {...createFieldProps("password", "Пароль", "password")}
          />
          <Link href={Endpoint.FORGET_PASSWORD} className="text-light-gray">
            Забыли пароль?
          </Link>
        </div>
      </div>

      <form.AppForm>
        <form.Button type="submit">Вход</form.Button>
      </form.AppForm>
    </form>
  );
};
