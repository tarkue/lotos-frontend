import { CourseAction } from "@/src/features/course-action";
import { api } from "@/src/shared/api";
import { sfwr } from "@/src/shared/libs/server-fetch-with-refresh";
import { Endpoint } from "@/src/shared/models/endpoint-enum";
import { Typography } from "@/src/shared/ui/typography";
import { CourseCatalog } from "@/src/widgets/course-catalog";
import { redirect } from "next/navigation";

export async function FetchMyCourses() {
  try {
    return await sfwr(api.student.getMyCourses);
  } catch {
    redirect(Endpoint.ALL_COURSES);
  }
}

export default async function MyCoursePage() {
  const { courses } = await FetchMyCourses();

  if (courses.length === 0) {
    return (
      <Typography.Body className="text-base-300 text-center">
        Здесь пока ничего нет
      </Typography.Body>
    );
  }
  return (
    <CourseCatalog.List
      courses={courses}
      action={CourseAction.ProgressPercentage}
    />
  );
}
