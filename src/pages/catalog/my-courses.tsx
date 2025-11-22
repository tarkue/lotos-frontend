import { Endpoint } from "@/src/shared/models/endpoint-enum";
import { CourseCatalog } from "@/src/widgets/course-catalog";
import { redirect } from "next/navigation";

export async function FetchMyCourses() {
  return Promise.resolve([]);
}

export default async function MyCoursePage() {
  try {
    const courses = await FetchMyCourses();
    return <CourseCatalog.List courses={courses} />;
  } catch {
    redirect(Endpoint.ALL_COURSES);
  }
}
