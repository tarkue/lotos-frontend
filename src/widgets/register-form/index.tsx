"use client";
import { useAuth } from "@/src/shared/api/context/auth-context";
import { createFieldProps } from "@/src/shared/libs/form-utils";
import { Endpoint } from "@/src/shared/models/endpoint-enum";
import { Button } from "@/src/shared/ui/button";
import { CheckboxField } from "@/src/shared/ui/checkbox";
import { Label } from "@/src/shared/ui/label";
import { toast } from "@/src/shared/ui/toast";
import {
  AnyFieldApi,
  createFormHook,
  createFormHookContexts,
} from "@tanstack/react-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import z from "zod";

const { fieldContext, formContext } = createFormHookContexts();

const { useAppForm } = createFormHook({
  fieldComponents: {},
  formComponents: {
    Button,
  },
  fieldContext,
  formContext,
});

export const RegisterForm = () => {
  const router = useRouter();
  const [confirmWithDocs, setConfirmWithDocs] = useState<boolean>(false);
  const { register } = useAuth();
  const form = useAppForm({
    defaultValues: {
      last_name: "",
      first_name: "",
      patronymic: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validators: {
      onChange: z.object({
        last_name: z
          .string()
          .min(2, "Фамилия должна содержать минимум 2 символа"),
        first_name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
        patronymic: z.string(),
        email: z.email("Введите корректный email"),
        password: z
          .string()
          .min(8, "Пароль должен содержать минимум 8 символов"),
        confirmPassword: z.string().min(8, "Подтвердите пароль"),
      }),
    },
    onSubmit: async ({ value }) => {
      if (!confirmWithDocs) {
        toast({
          description:
            "Регистрация возможно только при принятии условий Пользовательского соглашения и Политики конфиденциальности",
          variant: "warning",
        });
        return;
      }
      try {
        await register(value);
        router.push(Endpoint.ALL_COURSES);
      } catch {
        toast({
          title: "Возникла ошибка",
          description: "Пользователь с такой почтой уже существует",
          variant: "error",
        });
      }
    },
  });

  return (
    <form
      className="flex flex-col gap-5 w-full"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-2 w-full">
          <Label required>Фамилия</Label>
          <form.AppField {...createFieldProps("last_name", "Фамилия")} />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <Label required>Имя</Label>
          <form.AppField {...createFieldProps("first_name", "Имя")} />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <Label>Отчество</Label>
          <form.AppField {...createFieldProps("patronymic", "Отчество")} />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <Label required>Электронная почта</Label>
          <form.AppField
            {...createFieldProps("email", "example@mail.ru", "email")}
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <Label required>Пароль</Label>
          <form.AppField
            {...createFieldProps("password", "Пароль", "password")}
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <Label required>Подтверждение пароля</Label>
          <form.AppField
            validators={{
              onChangeListenTo: ["password"],
              onChange: ({
                value,
                fieldApi,
              }: {
                value: string;
                fieldApi: AnyFieldApi;
              }) => {
                if (value !== fieldApi.form.getFieldValue("password")) {
                  return { message: "Пароли не совпадают" };
                }
                return undefined;
              },
            }}
            {...createFieldProps(
              "confirmPassword",
              "Подтвердите пароль",
              "password",
            )}
          />
        </div>
      </div>

      <div>
        <CheckboxField
          onChange={() => setConfirmWithDocs(!confirmWithDocs)}
          checked={confirmWithDocs}
          field={
            <>
              Я принимаю условия{" "}
              <Link href="/terms-of-service" className="text-link">
                Пользовательского соглашения
              </Link>{" "}
              и{" "}
              <Link href="/privacy-policy" className="text-link">
                Политики конфиденциальности
              </Link>
            </>
          }
        />
      </div>

      <div className="flex justify-between items-center w-full">
        <Link href={Endpoint.LOGIN} className="text-light-gray">
          Уже есть аккаунт?
        </Link>
        <form.Button>Зарегистрироваться</form.Button>
      </div>
    </form>
  );
};
