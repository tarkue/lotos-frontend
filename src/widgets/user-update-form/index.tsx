"use client";
import { api } from "@/src/shared/api";
import { UserResponseDTO } from "@/src/shared/api/dto/auth.dto";
import { createFieldProps } from "@/src/shared/libs/form-utils";
import { Button } from "@/src/shared/ui/button";
import { Input } from "@/src/shared/ui/input";
import { toast } from "@/src/shared/ui/toast";
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

export const UserUpdateForm = ({
  defaultValues,
}: {
  defaultValues: Pick<
    UserResponseDTO,
    "email" | "last_name" | "first_name" | "patronymic"
  >;
}) => {
  const form = useAppForm({
    defaultValues: defaultValues,
    validators: {
      onChange: z.object({
        first_name: z
          .string({ error: "Имя обязательно." })
          .min(2, { error: "Отчество должно быть больше 2 символов." }),
        last_name: z
          .string({ error: "Фамилия обязательна." })
          .min(2, { error: "Отчество должно быть больше 2 символов." }),
        patronymic: z
          .string()
          .min(2, { error: "Отчество должно быть больше 2 символов." })
          .optional()
          .nullable()
          .nonoptional(),
        email: z.email({ error: "Неправильно написана электронная почта." }),
      }),
    },
    onSubmit: async ({ value }) => {
      try {
        await api.users.updateMyProfile(value);
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
        <form.AppField
          {...createFieldProps("last_name", "Фамилия", "text", "Фамилия")}
        />
        <form.AppField
          {...createFieldProps("first_name", "Имя", "text", "Имя")}
        />
        <form.AppField
          {...createFieldProps("patronymic", "Отчество", "text", "Отчество")}
        />
        <form.AppField
          {...createFieldProps(
            "email",
            "example@mail.ru",
            "email",
            "Почтовый адрес"
          )}
        />
      </div>

      <form.AppForm>
        <form.Button type="submit" size="large" className="w-min">
          Изменить данные
        </form.Button>
      </form.AppForm>
    </form>
  );
};
