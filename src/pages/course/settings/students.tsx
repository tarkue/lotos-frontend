import { Course, CourseProps } from "@/src/entity/course";
import { QueryPagination } from "@/src/features/pagination";
import { QuerySearch } from "@/src/features/search";
import { api } from "@/src/shared/api";
import { sfwr } from "@/src/shared/libs/server-fetch-with-refresh";
import { UserListForDelete } from "@/src/widgets/user-list-for-delete";

export async function fetchAllUsersOnCourse(
  course: Course,
  search: string | undefined,
  page: string
) {
  return await sfwr(api.teacher.getStudentsFromCourse, course.id, {
    page: page ? Number.parseInt(page) : undefined,
    search: search,
  });
}

export default async function SettingsStudentsPage({
  course,
  q,
  p,
}: CourseProps & { q?: string; p: string }) {
  const { students, total_pages } = await fetchAllUsersOnCourse(course, q, p);
  const users = students.map((el) => el.user);

  return (
    <>
      <QuerySearch />
      <UserListForDelete course={course} users={users} />
      <QueryPagination total={total_pages} />
    </>
  );
}
