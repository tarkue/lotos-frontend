import { QueryPagination } from "@/src/features/pagination";
import { QuerySearch } from "@/src/features/search";
import { TeacherAction } from "@/src/features/teacher-action";
import { api } from "@/src/shared/api";
import { sfwr } from "@/src/shared/libs/server-fetch-with-refresh";
import { Typography } from "@/src/shared/ui/typography";
import { TeacherListForDelete } from "@/src/widgets/teacher-list-for-delete";

export async function fetchAllTeachers(search?: string, page?: string) {
  return sfwr(api.admin.getUsers, {
    role: "teacher",
    page: page ? Number.parseInt(page) : undefined,
    search: search,
  });
}

export default async function AllTeachersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; p: string }>;
}) {
  const { q, p } = await searchParams;
  const { total_pages, users } = await fetchAllTeachers(q, p);

  return (
    <div className="w-full gap-6 flex flex-col">
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col gap-1">
          <Typography.Title className="text-dark-gray">
            Преподаватели
          </Typography.Title>
          <Typography.Body className="text-light-gray">
            Информация о всех преподавателях курсов
          </Typography.Body>
        </div>
        <div className="flex gap-3">
          <TeacherAction.Create />
          <QuerySearch />
        </div>
      </div>
      <div className="w-full gap-4 flex flex-col">
        <TeacherListForDelete users={users} />
      </div>
      <QueryPagination total={total_pages} />
    </div>
  );
}
