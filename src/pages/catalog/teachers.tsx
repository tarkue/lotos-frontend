import { QueryPagination } from "@/src/features/pagination";
import { QuerySearch } from "@/src/features/search";
import { TeacherAction } from "@/src/features/teacher-actions";
import { api } from "@/src/shared/api";
import { sfwr } from "@/src/shared/libs/server-fetch-with-refresh";
import { TeacherListForDelete } from "@/src/widgets/teacher-list-for-delete";

export async function FetchAllTeachers(search?: string, page?: string) {
  return sfwr(api.admin.getUsers, {
    role: "teacher",
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
  const { total_pages, users } = await FetchAllTeachers(q, p);

  return (
    <div className="w-full gap-6 flex flex-col">
      <div className="w-full gap-4 flex flex-col">
        <div className="w-full flex gap-2">
          <QuerySearch />
          <TeacherAction.Create />
        </div>
        <TeacherListForDelete users={users} />
      </div>
      <QueryPagination total={total_pages} />
    </div>
  );
}
