"use client";
import { api } from "@/src/shared/api";
import { Button } from "@/src/shared/ui/button";
import { Input } from "@/src/shared/ui/input";
import { toast } from "@/src/shared/ui/toast";
import { createFieldProps } from "@/src/shared/libs/form-utils";
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

export const UpdatePasswordForm = () => {
  const form = useAppForm({
    defaultValues: {
      password: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validators: {
      onChange: z.object({
        password: z
          .string()
          .min(8, "Пароль должен содержать минимум 8 символов"),
        newPassword: z
          .string()
          .min(8, "Новый пароль должен содержать минимум 8 символов"),
        confirmNewPassword: z.string().min(8, "Подтвердите новый пароль"),
      }),
    },
    onSubmit: async ({ value }) => {
      if (value.confirmNewPassword != value.newPassword) {
        toast({
          title: "Пароли не совпадают",
          variant: "warning",
        });
      }
      try {
        await api.users.changePassword({
          old_password: value.password,
          new_password: value.newPassword,
        });
        toast({
          title: "Пароль успешно изменён",
          variant: "success",
        });
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
      onSubmit={async (e) => {
        e.preventDefault();
        e.stopPropagation();
        await form.handleSubmit();
      }}
    >
      <div className="flex flex-col gap-3 w-full">
        <form.AppField
          {...createFieldProps(
            "password",
            "Старый пароль",
            "password",
            "Старый пароль",
          )}
        />
        <form.AppField
          {...createFieldProps(
            "newPassword",
            "Новый пароль",
            "password",
            "Новый пароль",
          )}
        />
        <form.AppField
          {...createFieldProps(
            "confirmNewPassword",
            "Новый пароль еще раз",
            "password",
            "Подтвердите новый пароль",
          )}
        />
      </div>

      <form.AppForm>
        <form.Button type="submit" className="w-min">
          Создать
        </form.Button>
      </form.AppForm>
    </form>
  );
};
