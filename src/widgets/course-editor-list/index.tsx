"use client";
import React from "react";

import { Course } from "@/src/entity/course";
import { QuerySearch } from "@/src/features/search";
import {
  generateDeleteFromCourse,
  TeacherAction,
} from "@/src/features/teacher-action";
import { EditorListResponse } from "@/src/shared/api/exports";
import { TableBuilder } from "@/src/shared/ui/table";
import { Typography } from "@/src/shared/ui/typography";

export const CourseTeacherList = ({
  course,
  teachers,
}: {
  course: Course;
  teachers: EditorListResponse;
}) => {
  const DeleteEditorAction = generateDeleteFromCourse(course, teachers.editors);

  const ActionWrapper: React.FC<{ row: (typeof teachers.editors)[number] }> = ({
    row,
  }) => <DeleteEditorAction user={row.user} />;

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex justify-between w-full items-center">
        <div className="flex flex-col gap-1 w-full">
          <Typography.Title className="text-dark-gray">
            Преподаватели
          </Typography.Title>
          <Typography.Body className="text-light-gray">
            Все люди, редактирующие курс
          </Typography.Body>
        </div>
        <div className="flex gap-3 w-full justify-end">
          <TeacherAction.AddToCourse
            editors={teachers.editors}
            courseId={course.id}
          />
          <QuerySearch alias="teachers_q" />
        </div>
      </div>
      <TableBuilder
        data={teachers.editors}
        columns={[
          {
            key: "full_name",
            header: "Преподаватель",
          },
          {
            key: "granted_at",
            header: "Дата записи",
            cell: (value) =>
              new Date(value as string).toLocaleDateString("ru-RU", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              }),
          },
        ]}
        action={ActionWrapper}
      />
    </div>
  );
};
