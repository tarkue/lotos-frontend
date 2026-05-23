import { api } from "@/src/shared/api";
import { Button } from "@/src/shared/ui/button";
import { Input } from "@/src/shared/ui/input";
import { toast } from "@/src/shared/ui/toast";
import { createFieldProps } from "@/src/shared/libs/form-utils";
import { getClientSideCookie } from "@/src/shared/libs/cookie";
import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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

export const CommentSendForm = ({
  courseId,
  moduleId,
  materialId,
}: {
  courseId: number;
  moduleId: number;
  materialId: number;
}) => {
  const queryClient = useQueryClient();
  const accessToken = getClientSideCookie("access_token");

  const createCommentMutation = useMutation({
    mutationFn: async (content: string) =>
      api.student.createCommentForMaterial(
        courseId,
        moduleId,
        materialId,
        {
          content,
        },
        { accessToken },
      ),
    onSuccess: () => {
      // Инвалидируем кэш комментариев, чтобы обновить список
      queryClient.invalidateQueries({
        queryKey: ["Comments", courseId, moduleId, materialId],
      });
    },
  });

  const form = useAppForm({
    defaultValues: {
      content: "",
    },
    validators: {
      onChange: z.object({
        content: z
          .string()
          .min(1, { error: "Вы ничего не ввели..." })
          .max(2000, { error: "Вы превысили лимит в 2000" }),
      }),
    },
    onSubmit: async (data) => {
      try {
        await createCommentMutation.mutateAsync(data.value.content);
        form.reset();
      } catch {
        toast({
          title: "Ошибка отправки",
          description: "Попробуйте ввести данные заново.",
          variant: "warning",
        });
      }
    },
  });

  return (
    <form
      className="flex gap-3 w-full"
      onSubmit={async (e) => {
        e.preventDefault();
        e.stopPropagation();
        await form.handleSubmit();
      }}
    >
      <form.AppField {...createFieldProps("content", "Комментарий", "text")} />
      <form.Button disabled={createCommentMutation.isPending}>
        {createCommentMutation.isPending ? "Отправка..." : "Отправить"}
      </form.Button>
    </form>
  );
};
