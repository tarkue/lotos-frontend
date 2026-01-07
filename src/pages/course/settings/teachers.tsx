import { Course, CourseProps } from "@/src/entity/course";
import { QueryPagination } from "@/src/features/pagination";
import { QuerySearch } from "@/src/features/search";
import { TeacherAction } from "@/src/features/teacher-actions";
import { api } from "@/src/shared/api";
import { sfwr } from "@/src/shared/libs/server-fetch-with-refresh";
import { EditorListForDelete } from "@/src/widgets/editor-list-for-delete";

export async function fetchAllTeachersOnCourse(
  course: Course,
  search: string | undefined,
  page: string
) {
  return await sfwr(api.teacher.getEditors, course.id, {
    page: page ? Number.parseInt(page) : undefined,
    search: search,
  });
}

export default async function SettingsTeachersPage({
  course,
  q,
  p,
}: CourseProps & { q?: string; p: string }) {
  const { editors, total_pages } = await fetchAllTeachersOnCourse(course, q, p);

  return (
    <>
      <div className="flex gap-2 w-full">
        <QuerySearch />
        <TeacherAction.AddToCourse editors={editors} courseId={course.id} />
      </div>
      <EditorListForDelete course={course} editors={editors} />
      <QueryPagination total={total_pages} />
    </>
  );
}
