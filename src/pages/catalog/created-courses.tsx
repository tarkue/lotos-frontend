import { CourseAction } from "@/src/features/course-action";
import { QueryPagination } from "@/src/features/pagination";
import { QuerySearch } from "@/src/features/search";
import { api } from "@/src/shared/api";
import { sfwr } from "@/src/shared/libs/server-fetch-with-refresh";
import { CourseCatalog } from "@/src/widgets/course-catalog";

export async function FetchCreatedCourses(search?: string, page?: string) {
  return await sfwr(api.teacher.getMyCourses, {
    page: page ? Number.parseInt(page) : undefined,
    search: search,
  });
  //  {
  // page: page ? Number.parseInt(page) : undefined,
  //  search: search,
  //}
}

export default async function CreatedCoursePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; p: string }>;
}) {
  const { q, p } = await searchParams;
  const { total_pages, courses } = await FetchCreatedCourses(q, p);
  return (
    <div className="w-full gap-6 flex flex-col">
      <div className="w-full gap-4 flex flex-col">
        <QuerySearch />
        <CourseCatalog.List courses={courses} action={CourseAction.None} />
      </div>
      <QueryPagination total={total_pages} />
    </div>
  );
}
