"use client";
import { CourseProgressOverviewResponseDTO } from "@/src/shared/api/exports";
import { TableBuilder } from "@/src/shared/ui/table";

export const ProgressTeacherTable = ({
  data,
}: {
  data: CourseProgressOverviewResponseDTO;
}) => {
  console.log(data);
  return (
    <TableBuilder
      data={data.students}
      columns={[
        {
          key: "full_name",
          header: "Ученик",
          rowVariant: (row) =>
            row.progress_percentage === 0 ? "danger" : undefined,
        },
        {
          key: "group_name",
          header: "Группа",
          rowVariant: (row) =>
            row.progress_percentage === 0 ? "danger" : undefined,
        },
        {
          key: "completed_tests",
          header: "Тесты",
          cell: (_, row) => `${row.completed_tests}/${row.total_tests}`,
          rowVariant: (row) =>
            row.progress_percentage === 0 ? "danger" : undefined,
        },
        {
          key: "completed_homework",
          header: "Задания",
          cell: (_, row) => `${row.completed_homework}/${row.total_homework}`,
          rowVariant: (row) =>
            row.progress_percentage === 0 ? "danger" : undefined,
        },
        {
          key: "completed_lessons",
          header: "Уроки",
          cell: (_, row) => `${row.completed_lessons}/${row.total_lessons}`,
          rowVariant: (row) =>
            row.progress_percentage === 0 ? "danger" : undefined,
        },
        {
          key: "progress_percentage",
          header: "Прогресс",
          cell: (_, row) => `${row.progress_percentage}%`,
          rowVariant: (row) =>
            row.progress_percentage === 0 ? "danger" : undefined,
        },
      ]}
    />
  );
};
