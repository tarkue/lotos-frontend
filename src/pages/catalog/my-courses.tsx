import { CourseCatalog } from "@/src/widgets/course-catalog";
import { redirect } from "next/navigation";

export async function FetchMyCourses() {
  return Promise.reject(undefined);
}

export default async function MyCoursePage() {
  try {
    const courses = await FetchMyCourses();
    return <CourseCatalog.List courses={courses} />;
  } catch {
    redirect("/catalog/all");
  }
}
