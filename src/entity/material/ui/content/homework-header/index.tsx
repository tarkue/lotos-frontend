"use client";

import { HomeWorkTag } from "@/src/entity/homework";
import { HomeworkStudentItemResponseDTO } from "@/src/shared/api/exports";
import { Typography } from "@/src/shared/ui/typography";

const statusToVariantMap: Record<
  NonNullable<HomeworkStudentItemResponseDTO["status"]>,
  "pending" | "resolve" | "reject"
> = {
  pending_review: "pending",
  reviewed: "resolve",
  overdue: "reject",
};

export const HomeworkHeader = ({
  homework,
}: {
  homework: HomeworkStudentItemResponseDTO;
}) => {
  const deadlineDate = homework.deadline
    ? new Date(homework.deadline).toLocaleString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  return (
    <div className="w-full flex items-center justify-between">
      <Typography.Title>Задание</Typography.Title>
      {deadlineDate && (
        <HomeWorkTag
          variant={
            homework.status ? statusToVariantMap[homework.status] : "default"
          }
          text={`До ${deadlineDate}`}
        />
      )}
    </div>
  );
};
