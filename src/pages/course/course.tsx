import { api } from "@/src/shared/api";
import { roleSwitcher } from "@/src/shared/libs/role-switcher";
import { sfwr } from "@/src/shared/libs/server-fetch-with-refresh";
import { Course } from "@/src/widgets/course";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export async function fetchCourse(slug: string) {
  const cookieStore = await cookies();

  if (!Number.isInteger(Number.parseInt(slug))) {
    notFound();
  }

  const courseId = Number.parseInt(slug);
  const role = cookieStore.get("role")?.value;

  try {
    return await roleSwitcher(role, {
      student: async () => {
        const course = await sfwr(api.student.getEnrolledCourse, courseId);
        course.is_enrolled = true;

        return course;
      },
      teacher: async () => await sfwr(api.teacher.getCourse, courseId),
      admin: async () => await sfwr(api.teacher.getCourse, courseId),
      unauthorized: async () => {
        const course = await api.course.getCoursePublicInfo(courseId);
        course.is_enrolled = false;
        course.modules = [];
        return course;
      },
    });
  } catch {
    notFound();
  }
}

export default async function CoursePage({ slug }: { slug: string }) {
  const course = await fetchCourse(slug);

  return <Course course={course} />;
}
