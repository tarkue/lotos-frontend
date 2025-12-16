"use client";
import { Test } from "@/src/entity/test";
import { api } from "@/src/shared/api";
import { SubmitAnswerRequestDTO } from "@/src/shared/api/dto/student.dto";
import { getClientSideCookie } from "@/src/shared/libs/cookie";
import { formatEndpoint } from "@/src/shared/libs/endpoint";
import { Endpoint } from "@/src/shared/models/endpoint-enum";
import { toast } from "@/src/shared/ui/toast";
import { useRouter } from "next/navigation";

export const useSubmitTestComplete = (
  test: Test,
  courseId: number,
  moduleId: number,
  materialId: number,
  attemptId: number
) => {
  const router = useRouter();
  return async (formData: FormData) => {
    const data: SubmitAnswerRequestDTO[] = [];

    test.questions?.map(async (el) => {
      if (el.type === "text") {
        const res = formData.get(el.id.toString());

        if (res === null) {
          toast({
            title: "Вы не ответили на вопрос",
            description: el.text,
            variant: "warning",
          });
          return;
        }
        try {
          data.push({
            question_id: el.id,
            answer: {
              text: res as string,
            },
          });
        } catch {}
      } else {
        const res = formData
          .getAll(el.id.toString())
          .map((i) => Number.parseInt(i as string));

        if (res.length === 0) {
          toast({
            title: "Вы не ответили на вопрос",
            description: el.text,
            variant: "warning",
          });
          return;
        }
        try {
          data.push({
            question_id: el.id,
            answer: {
              selected_option_ids: res,
            },
          });
        } catch {}
      }
    });

    if (test.questions?.length !== data.length) {
      return;
    }

    try {
      const { access_token } = await api.auth.forceRefreshToken({
        refresh_token: getClientSideCookie("refresh_token")!,
      });
      const submit = await api.student.submitAnswerAll(
        courseId,
        moduleId,
        materialId,
        test.id,
        attemptId,
        data,
        access_token
      );

      const res = await api.student.getTestResult(attemptId, access_token);

      if (submit.blocked) {
        toast({
          title: `Ваш результат ${res.score}/100`,
          description: `Попробуйте повторить урок. Тест разблокируется через ${
            ((Number(new Date()) - Number(new Date(submit.blocked_until as string))) / 1000 / 60 / 60).toFixed(0)
          } минут.`,
          variant: "warning",
        });
        router.push(
          formatEndpoint(Endpoint.MATERIAL, [courseId, moduleId, materialId])
        );
      }

      if (res.passed) {
        if (submit.message) {
          toast({
            title: `Ваш результат ${res.score}/100`,
            description: submit.message,
            variant: "neuro",
          });
        } else {
          toast({
            title: `Ваш результат ${res.score}/100`,
            description: "Доступ к следущему урок открыт.",
            variant: "success",
          });
        }

        router.push(
          formatEndpoint(Endpoint.MATERIAL, [courseId, moduleId, materialId])
        );
      }
    } catch {
      router.push(
        formatEndpoint(Endpoint.MATERIAL, [courseId, moduleId, materialId])
      );
    }
  };
};
