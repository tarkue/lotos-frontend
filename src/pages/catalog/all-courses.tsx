import { CourseAction } from "@/src/features/course-action";
import { QueryPagination } from "@/src/features/pagination";
import { QuerySearch } from "@/src/features/search";
import { CourseCatalog } from "@/src/widgets/course-catalog";

export async function FetchAllCourses() {
  return Promise.resolve([
    {
      id: "1",
      title: "Элементы математического анализа",
    },
    {
      id: "2",
      title: "Элементы математического анализа",
    },
    {
      id: "3",
      title: "Элементы математического анализа",
    },
    {
      id: "4",
      title: "Элементы математического анализа",
    },
    {
      id: "5",
      title: "Элементы математического анализа",
    },
    {
      id: "6",
      title: "Элементы математического анализа",
    },
  ]);
}

export default async function AllCoursePage() {
  const courses = await FetchAllCourses();
  return (
    <div className="w-full gap-6 flex flex-col">
      <div className="w-full gap-4 flex flex-col">
        <QuerySearch />
        <CourseCatalog.List courses={courses} action={CourseAction.Enroll} />
      </div>
      <QueryPagination total={3} />
    </div>
  );
}
