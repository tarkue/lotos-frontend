"use client";
import { EnrolledCourseResponseDTO } from "@/src/shared/api/exports";
import { TableBuilder } from "@/src/shared/ui/table";

export const ProgressStudentTable = ({
  data,
}: {
  data: EnrolledCourseResponseDTO[];
}) => {
  console.log(data);
  return (
    <TableBuilder
      data={data}
      columns={[
        {
          key: "title",
          header: "Название курса",
        },
        {
          key: "completed_tests",
          header: "Тестов сдано",
          cell: (_, row) => `${row.completed_tests}/${row.total_tests}`,
        },
        {
          key: "completed_homework",
          header: "Заданий сдано",
          cell: (_, row) => `${row.completed_homework}/${row.total_homework}`,
        },
        {
          key: "completed_lessons",
          header: "Уроков пройдено",
          cell: (_, row) => `${row.completed_lessons}/${row.total_lessons}`,
        },
        {
          key: "progress_percentage",
          header: "Прогресс",
          cell: (_, row) => `${row.progress_percentage}%`,
        },
      ]}
    />
  );
};
