"use client";

import { CourseCardResponseDTO } from "@/src/shared/api/dto/student.dto";
import { TableBuilder } from "@/src/shared/ui/table";
import { CourseAction } from "@/src/features/course-action";

const ActionWrapper: React.FC<{ row: CourseCardResponseDTO }> = ({ row }) => (
  <div className="flex gap-2 py-3">
    <CourseAction.OpenAbout course={row} variant="button" />
    <CourseAction.Delete course={row} />
  </div>
);

export const AllCoursesTable = ({
  data,
}: {
  data: CourseCardResponseDTO[];
}) => {
  return (
    <TableBuilder
      data={data}
      columns={[
        {
          key: "title",
          header: "Название курса",
        },
      ]}
      action={ActionWrapper}
      emptyMessage="Курсы не найдены"
    />
  );
};
