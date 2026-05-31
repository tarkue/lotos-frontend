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
    <div className="w-full gap-6 flex flex-col">
      <div className="flex w-full max-md:flex-col justify-between gap-2">
        <div className="flex flex-col w-full gap-1">
          <Typography.Heading className="text-black">
            Каталог курсов
          </Typography.Heading>
          <Typography.Body className="text-dark-gray">
            Полный список курсов, которые есть на платформе.
          </Typography.Body>
        </div>
        <AllCoursesActions />
      </div>
      <div className="w-full gap-4 flex flex-col">
        <AllCourseList courses={courses} />
      </div>
      <QueryPagination total={total_pages} />
    </div>
  );
}
