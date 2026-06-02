"use client";

import { CourseProps } from "@/src/entity/course";
import { api } from "@/src/shared/api";
import { createFieldProps } from "@/src/shared/libs/form-utils";
import { Button } from "@/src/shared/ui/button";
import { Input } from "@/src/shared/ui/input";
import { toast } from "@/src/shared/ui/toast";
import { Typography } from "@/src/shared/ui/typography";
import { UploadFile } from "@/src/shared/ui/upload-file";
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
      img_url: course.img_url || "",
    },
    validators: {
      onChange: z.object({
        title: z.string({ error: "Курс не может быть без названия" }),
        description: z.string().nullable().nonoptional(),
        img_url: z.string(),
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

  const handleFilesChange = async (files: File[]) => {
    if (files.length === 0) {
      form.setFieldValue("img_url", "");
      return;
    }

    try {
      const uploadedFile = await api.teacher.uploadFile(files[0]);
      const fileUrl = api.getFile(uploadedFile.file_url);
      form.setFieldValue("img_url", fileUrl);
    } catch {
      toast({
        title: "Ошибка загрузки",
        description: "Не удалось загрузить изображение.",
        variant: "error",
      });
    }
  };

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
        <div className="flex flex-col gap-2 w-full">
          <Typography.Body bold className="text-dark-gray select-none">
            Изображение курса
          </Typography.Body>
          <UploadFile
            onFilesChange={handleFilesChange}
            accept="image/*"
            maxSize={10 * 1024 * 1024}
          />
        </div>
        <form.AppField
          {...createFieldProps(
            "title",
            "Название курса",
            "text",
            "Название курса",
          )}
        />
        <form.AppField
          {...createFieldProps(
            "description",
            "Описание курса...",
            "text",
            "Описание курса",
          )}
        />
      </div>
      <div className="flex gap-1">
        <form.AppForm>
          <form.Button type="submit" className="w-min">
            Изменить
          </form.Button>
        </form.AppForm>
        {Act && <Act course={course} />}
      </div>
    </form>
  );
};
