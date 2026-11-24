import { CourseAction } from "@/src/features/course-action";
import { QueryPagination } from "@/src/features/pagination";
import { QuerySearch } from "@/src/features/search";
import { api } from "@/src/shared/api";
import { Typography } from "@/src/shared/ui/typography";
import { AllCoursesTable } from "@/src/widgets/all-courses-table";

export async function fetchAllCourse(search?: string, page?: string) {
  return await api.course.getCoursesCatalog({
    page: page ? Number.parseInt(page) : undefined,
    search: search ? search : undefined,
  });
}

export default async function AllCoursePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; p: string }>;
}) {
  const { q, p } = await searchParams;
  const { total_pages, courses } = await fetchAllCourse(q, p);

  return (
    <div className="w-full gap-6 flex flex-col">
      <div className="w-full gap-4 flex flex-col">
        <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <Typography.Title className="text-dark-gray">
              Курсы
            </Typography.Title>
            <Typography.Body className="text-light-gray">
              Информация о всех курсах
            </Typography.Body>
          </div>
          <div className="flex w-full flex-wrap items-center gap-3 sm:w-auto sm:flex-nowrap">
            <QuerySearch />
          </div>
        </div>
        <AllCoursesTable data={courses} />
      </div>
      <QueryPagination total={total_pages} />
    </div>
  );
}
