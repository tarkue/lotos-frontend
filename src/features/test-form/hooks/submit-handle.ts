"use client";
import { Test } from "@/src/entity/test";
import { api } from "@/src/shared/api";
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
          await api.student.submitAnswer(
            courseId,
            moduleId,
            materialId,
            test.id,
            attemptId,
            {
              question_id: el.id,
              answer: {
                text: res as string,
              },
            }
          );
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
          await api.student.submitAnswer(
            courseId,
            moduleId,
            materialId,
            test.id,
            attemptId,
            {
              question_id: el.id,
              answer: {
                selected_option_ids: res,
              },
            }
          );
        } catch {}
      }
    });

    try {
      const res = await api.student.finishTest(
        courseId,
        moduleId,
        materialId,
        test.id,
        attemptId
      );

      if (res.blocked) {
        router.push(
          formatEndpoint(Endpoint.MATERIAL, [courseId, moduleId, materialId])
        );
        toast({
          title: "Вы не сдали тест",
          description: `Попробуйте повторить урок. Тест разблокируется через ${res.blocked_until} минут.`,
          variant: "warning",
        });
      }

      if (res.passed) {
        router.push(
          formatEndpoint(Endpoint.MATERIAL, [courseId, moduleId, materialId])
        );
        toast({
          title: "Вы сдали тест!",
          description: "Доступ к следущему урок открыт.",
          variant: "success",
        });
      }
    } catch {
      router.push(
        formatEndpoint(Endpoint.MATERIAL, [courseId, moduleId, materialId])
      );
    }
  };
};
