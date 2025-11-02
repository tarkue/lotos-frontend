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
  return <CourseCatalog.List courses={courses} />;
}
