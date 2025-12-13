import { api } from "@/src/shared/api";
import { formatEndpoint } from "@/src/shared/libs/endpoint";
import { createFieldProps } from "@/src/shared/libs/form-utils";
import { Endpoint } from "@/src/shared/models/endpoint-enum";
import { Button } from "@/src/shared/ui/button";
import { Input } from "@/src/shared/ui/input";
import { useModals } from "@/src/shared/ui/modal";
import { toast } from "@/src/shared/ui/toast";
import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { useRouter } from "next/router";
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

const CourseCreateForm = () => {
  const router = useRouter();
  const { clear } = useModals();
  const form = useAppForm({
    defaultValues: {
      title: "",
      description: "",
    },
    validators: {
      onChange: z.object({
        title: z.string({ error: "Курс не может быть без названия" }),
        description: z.string(),
      }),
    },
    onSubmit: async ({ value }) => {
      try {
        const course = await api.teacher.createCourse(value);
        clear();
        router.push(formatEndpoint(Endpoint.COURSE, [course.id]));
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

      <form.AppForm>
        <form.Button type="submit" size="large" className="w-min">
          Изменить
        </form.Button>
      </form.AppForm>
    </form>
  );
};

export const AddCourse = () => {
  const { addModal } = useModals();

  const handle = () => {
    addModal({
      title: "Создать курс",
      fields: <CourseCreateForm />,
    });
  };

  return (
    <Button variant="primary" size="large" onClick={handle}>
      Создать курс
    </Button>
  );
};
