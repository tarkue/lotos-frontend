import { CourseAction } from "@/src/features/course-action";
import { api } from "@/src/shared/api";
import { sfwr } from "@/src/shared/libs/server-fetch-with-refresh";
import { Typography } from "@/src/shared/ui/typography";
import { CourseCatalog } from "@/src/widgets/course-catalog";

export async function FetchMyCourses() {
  return await sfwr(api.student.getMyCourses);
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
