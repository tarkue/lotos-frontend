"use client";

import { CourseProps } from "@/src/entity/course";
import { api } from "@/src/shared/api";
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

export const CourseSettingsForm = ({
  course,
  action,
}: CourseProps & { action?: React.FC<CourseProps> }) => {
  const Act = action;
  const form = useAppForm({
    defaultValues: {
      title: course.title,
      description: course.description,
    },
    validators: {
      onChange: z.object({
        title: z.string({ error: "Курс не может быть без названия" }),
        description: z.string().nullable().nonoptional(),
      }),
    },
    onSubmit: async ({ value }) => {
      try {
        await api.teacher.updateCourse(course.id, value);
        toast({
          title: "Изменения применены",
          variant: "success",
        });
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
          {...createFieldProps(
            "title",
            "Название курса",
            "text",
            "Название курса"
          )}
        />
        <form.AppField
          {...createFieldProps(
            "description",
            "Описание курса...",
            "text",
            "Описание курса"
          )}
        />
      </div>
      <div className="flex gap-1">
        <form.AppForm>
          <form.Button type="submit" size="large" className="w-min">
            Изменить
          </form.Button>
        </form.AppForm>
        {Act && <Act course={course} />}
      </div>
    </form>
  );
};
