import { QueryPagination } from "@/src/features/pagination";
import { api } from "@/src/shared/api";
import { roleSwitcher } from "@/src/shared/libs/role-switcher";
import { sfwr } from "@/src/shared/libs/server-fetch-with-refresh";
import { Typography } from "@/src/shared/ui/typography";
import { AllCoursesActions } from "@/src/widgets/all-course-actions";
import { AllCourseList } from "@/src/widgets/all-course-list";
import { cookies } from "next/headers";

export async function FetchAllCourses(search?: string, page?: string) {
  const cookieStore = await cookies();
  const role = cookieStore.get("role")?.value;

  const defaultRequest = async () =>
    await api.course.getCoursesCatalog({
      page: page ? Number.parseInt(page) : undefined,
      search: search,
    });

  return await roleSwitcher(role, {
    student: () =>
      sfwr(api.student.getCoursesCatalog, {
        page: page ? Number.parseInt(page) : undefined,
        search: search,
      }),
    teacher: defaultRequest,
    admin: defaultRequest,
    unauthorized: defaultRequest,
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
    <div className="flex w-full flex-col gap-5 md:gap-6">
      <div className="flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Typography.Heading className="text-black">
          Каталог курсов
        </Typography.Heading>
        <AllCoursesActions />
      </div>
      {courses.length > 0 ? (
        <AllCourseList courses={courses} />
      ) : (
        <div className="rounded-xl bg-white p-5 text-center">
          <Typography.Body className="text-dark-gray">
            {q ? "Курсы не найдены" : "В каталоге пока нет курсов"}
          </Typography.Body>
        </div>
      )}
      <QueryPagination total={total_pages} />
    </div>
  );
}
