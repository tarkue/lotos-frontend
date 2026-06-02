"use client";
import { QuerySearch } from "@/src/features/search";
import { SubmissionAction } from "@/src/features/submission-action";
import { HomeworkSubmissionStatus } from "@/src/shared/api/dto/teacher.dto";
import {
  HomeworkReviewResult,
  HomeworkSubmissionResponseDTO,
} from "@/src/shared/api/exports";
import { TableBuilder } from "@/src/shared/ui/table";
import { Typography } from "@/src/shared/ui/typography";

const SubmissionStatusMap = {
  pending_review: "Ожидает оценки",
  reviewed: "Оценено",
  overdue: "Просрочено",
} as const;

export const HomeworkTable = ({
  submissions,
  courseId,
  moduleId,
  materialId,
}: {
  submissions: HomeworkSubmissionResponseDTO[];
  courseId: number;
  moduleId: number;
  materialId: number;
}) => {
  return (
    <div className="flex flex-col w-full gap-6 pt-3">
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col w-full gap-1">
          <Typography.Title className="text-dark-gray">
            Сданные работы
          </Typography.Title>
          <Typography.Body className="text-light-gray">
            Все ученики, отправившие задания на проверку
          </Typography.Body>
        </div>
        <QuerySearch />
      </div>
      <TableBuilder
        data={submissions}
        columns={[
          {
            key: "full_name",
            header: "Ученик",
          },
          {
            key: "group_name",
            header: "Группа",
          },
          {
            key: "status",
            header: "Статус",
            cell: (v) => SubmissionStatusMap[v as HomeworkSubmissionStatus],
          },
          {
            key: "review_result",
            header: "Результат оценки",
            cell: (v) =>
              v == HomeworkReviewResult.CREDIT ? "Зачёт" : "Не зачёт",
          },
          {
            key: "text_answer",
            header: "Ответ",
            cell: (_, row) => <SubmissionAction.View submission={row} />,
          },
        ]}
        action={({ row }) => (
          <SubmissionAction.Answer
            submission={row}
            courseId={courseId}
            moduleId={moduleId}
            materialId={materialId}
          />
        )}
      />
    </div>
  );
};
