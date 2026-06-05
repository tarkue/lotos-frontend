import { Test } from "@/src/entity/test";
import { api } from "@/src/shared/api";
import {
  SubmitAnswerRequestDTO,
  SubmitTestRequestDTO,
  QuestionResultDTO,
} from "@/src/shared/api/dto/student.dto";
import { getClientSideCookie } from "@/src/shared/libs/cookie";
import { toast } from "@/src/shared/ui/toast";

export interface TestSubmissionResult {
  feedbackText?: string | null;
  questionResults?: QuestionResultDTO[];
  score?: number | null;
  passed?: boolean | null;
}

export const useSubmitTestComplete = (
  test: Test,
  courseId: number,
  moduleId: number,
  materialId: number,
  attemptId: number,
) => {
  return async (
    formData: FormData,
  ): Promise<TestSubmissionResult | undefined> => {
    const data: SubmitAnswerRequestDTO[] = [];

    for (const el of test.questions || []) {
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
    }

    if (test.questions?.length !== data.length) {
      return;
    }

    const submitPayload: SubmitTestRequestDTO = {
      answers: data,
    };

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
        submitPayload,
        true,
        { accessToken: access_token },
      );

      // Получаем детальные результаты теста
      const result = await api.student.getTestResult(attemptId, access_token);

      if (submit.blocked) {
        toast({
          title: `Ваш результат ${result.score}/100`,
          description: `Тест разблокируется через ${(
            (Number(new Date()) -
              Number(new Date(submit.blocked_until as string))) /
            1000 /
            60 /
            60
          ).toFixed(0)} минут.`,
          variant: "warning",
        });
        return {
          feedbackText: submit.feedback_text,
          questionResults: result.questions_results,
          score: result.score,
          passed: result.passed,
        };
      }

      if (result.passed) {
        if (submit.feedback_text) {
          toast({
            title: `Ваш результат ${result.score}/100`,
            variant: "success",
          });
          return {
            feedbackText: submit.feedback_text,
            questionResults: result.questions_results,
            score: result.score,
            passed: result.passed,
          };
        } else {
          toast({
            title: `Ваш результат ${result.score}/100`,
            description: "Доступ к следущему урок открыт.",
            variant: "success",
          });
        }
        return {
          feedbackText: null,
          questionResults: result.questions_results,
          score: result.score,
          passed: result.passed,
        };
      } else {
        toast({
          title: `Ваш результат ${result.score}/100`,
          description: "Тест не пройден.",
          variant: "warning",
        });
        return {
          feedbackText: submit.feedback_text,
          questionResults: result.questions_results,
          score: result.score,
          passed: result.passed,
        };
      }
    } catch {
      return undefined;
    }
  };
};
