"use client";
import { useAuth } from "@/src/shared/api/context/auth-context";
import { createFieldProps } from "@/src/shared/libs/form-utils";
import { Endpoint } from "@/src/shared/models/endpoint-enum";
import { Button } from "@/src/shared/ui/button";
import { toast } from "@/src/shared/ui/toast";
import {
  AnyFieldApi,
  createFormHook,
  createFormHookContexts,
} from "@tanstack/react-form";
import { useRouter } from "next/navigation";

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
      try {
        await register(value);
        router.push(Endpoint.MY_COURSES);
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
      className="flex flex-col gap-4 w-full"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <div className="flex flex-col gap-3 w-full">
        <form.AppField {...createFieldProps("last_name", "Фамилия")} />
        <form.AppField {...createFieldProps("first_name", "Имя")} />
        <form.AppField {...createFieldProps("patronymic", "Отчество")} />
        <form.AppField
          {...createFieldProps("email", "example@mail.ru", "email")}
        />
        <form.AppField
          {...createFieldProps("password", "Пароль", "password")}
        />
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
            "password"
          )}
        />
      </div>

      <form.AppForm>
        <form.Button size="large" className="w-min">
          Зарегистрироваться
        </form.Button>
      </form.AppForm>
    </form>
  );
};
