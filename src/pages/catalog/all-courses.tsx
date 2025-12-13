import { QueryPagination } from "@/src/features/pagination";
import { QuerySearch } from "@/src/features/search";
import { api } from "@/src/shared/api";
import { AllCourseList } from "@/src/widgets/all-course-list";

export async function FetchAllCourses(search?: string, page?: string) {
  return await api.course.getCoursesCatalog({
    page: page ? Number.parseInt(page) : undefined,
    search: search,
  });
}

export default async function AllCoursePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; p: string }>;
}) {
  const { q, p } = await searchParams;
  const { total_pages, courses } = await FetchAllCourses(q, p);

  return (
    <div className="w-full gap-6 flex flex-col">
      <div className="w-full gap-4 flex flex-col">
        <QuerySearch />
        <AllCourseList courses={courses} />
      </div>
      <QueryPagination total={total_pages} />
    </div>
  );
}
