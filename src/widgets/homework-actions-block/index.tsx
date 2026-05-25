"use client";

import { HomeworkAction } from "@/src/features/homework-actions";
import { HomeworkStudentItemResponseDTO } from "@/src/shared/api/exports";
import { Typography } from "@/src/shared/ui/typography";
import { useState } from "react";

export function HomeworkActionsBlock({
  homework,
  courseId,
  moduleId,
  materialId,
}: {
  homework: HomeworkStudentItemResponseDTO;
  courseId: number;
  moduleId: number;
  materialId: number;
}) {
  const hasSubmission = !!homework.submission;
  const isReviewed = homework.status === "reviewed";
  const canResubmit = homework.can_resubmit && isReviewed;

  const showForm = !hasSubmission || canResubmit;

  return (
    <div className="flex flex-col w-full gap-4">
      {showForm && (
        <HomeworkAction.Send
          courseId={courseId}
          moduleId={moduleId}
          materialId={materialId}
          assignmentId={homework.submission?.assignment_id ?? homework.id}
          allowedFormats={homework.allowed_formats}
        />
      )}
    </div>
  );
}
