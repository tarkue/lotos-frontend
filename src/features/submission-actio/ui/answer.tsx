"use client";
import { HomeworkSubmissionResponseDTO } from "@/src/shared/api/exports";
import { api } from "@/src/shared/api";
import { Button } from "@/src/shared/ui/button";
import { Icon } from "@/src/shared/ui/icon";
import { useModals } from "@/src/shared/ui/modal";
import { toast } from "@/src/shared/ui/toast";
import { Typography } from "@/src/shared/ui/typography";
import {
  createFieldProps,
  createFieldRadioProps,
} from "@/src/shared/libs/form-utils";
import { Input } from "@/src/shared/ui/input";
import { RadioGroup } from "@/src/shared/ui/radio/group";
import { HomeworkReviewResult } from "@/src/shared/api/enum/homework-review-result.enum";
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

interface ReviewFormProps {
  courseId: number;
  moduleId: number;
  materialId: number;
  submission: HomeworkSubmissionResponseDTO;
}

const ReviewHomeworkForm: React.FC<ReviewFormProps> = ({
  courseId,
  moduleId,
  materialId,
  submission,
}) => {
  const { clear } = useModals();
  const form = useAppForm({
    defaultValues: {
      review_result: HomeworkReviewResult.CREDIT,
      review_comment: "",
    },
    validators: {
      onChange: z.object({
        review_result: z.enum([
          HomeworkReviewResult.CREDIT,
          HomeworkReviewResult.NO_CREDIT,
        ]),
        review_comment: z.string(),
      }),
    },
    onSubmit: async ({ value }) => {
      try {
        await api.teacher.reviewHomework(
          courseId,
          moduleId,
          materialId,
          submission.assignment_id,
          submission.id,
          value,
        );
        clear();
        toast({
          title: "Работа проверена",
          description: "Оценка успешно выставлена",
          variant: "success",
        });
      } catch {
        toast({
          title: "Ошибка проверки",
          description: "Не удалось отправить оценку. Попробуйте позже.",
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
        <div className="flex flex-col gap-2">
          <Typography.Body bold className="text-dark-gray select-none">
            Результат проверки
          </Typography.Body>
          <RadioGroup>
            <form.AppField
              {...createFieldRadioProps(
                "review_result",
                HomeworkReviewResult.CREDIT,
                "Зачёт",
              )}
            />
            <form.AppField
              {...createFieldRadioProps(
                "review_result",
                HomeworkReviewResult.NO_CREDIT,
                "Не зачёт",
              )}
            />
          </RadioGroup>
        </div>

        <form.AppField
          {...createFieldProps(
            "review_comment",
            "Комментарий (необязательно)",
            "text",
          )}
        />
      </div>

      <form.AppForm>
        <form.Button type="submit" className="w-min">
          Отправить
        </form.Button>
      </form.AppForm>
    </form>
  );
};

export interface AnswerSubmissionProps {
  submission: HomeworkSubmissionResponseDTO;
  courseId: number;
  moduleId: number;
  materialId: number;
}

export const AnswerSubmission: React.FC<AnswerSubmissionProps> = ({
  submission,
  courseId,
  moduleId,
  materialId,
}) => {
  const { addModal } = useModals();

  const handle = () => {
    addModal({
      title: "Проверка работы",
      maxWidth: "500px",
      fields: (
        <ReviewHomeworkForm
          courseId={courseId}
          moduleId={moduleId}
          materialId={materialId}
          submission={submission}
        />
      ),
    });
  };

  return (
    <Button variant="ghost" size="small" onClick={handle} type="button">
      <Icon size="20" glyph="comment" color="black" />
    </Button>
  );
};
