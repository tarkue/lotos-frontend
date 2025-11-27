import { api } from "@/src/shared/api";
import { sfwr } from "@/src/shared/libs/server-fetch-with-refresh";
import { Course } from "@/src/widgets/course";
import { notFound } from "next/navigation";

export async function fetchCourse(slug: string) {
  if (!Number.isInteger(Number.parseInt(slug))) {
    notFound();
  }

  const courseId = Number.parseInt(slug);

  try {
    const course = await sfwr(api.student.getEnrolledCourse, courseId);
    course.is_enrolled = true;

    return course;
  } catch {}

  try {
    const course = await api.course.getCoursePublicInfo(courseId);
    course.is_enrolled = false;
    course.modules = [];
    return course;
  } catch {
    notFound();
  }
}

export default async function CoursePage({ slug }: { slug: string }) {
  const course = await fetchCourse(slug);

  return <Course course={course} />;
}
