import { Course, CourseProps } from "@/src/entity/course";
import { api } from "@/src/shared/api";
import { sfwr } from "@/src/shared/libs/server-fetch-with-refresh";
import { ApplicationList } from "@/src/widgets/application-list";

export async function fetchAllApplicationsOfCourse(course: Course) {
  return await sfwr(api.teacher.getCourseApplications, course.id);
}

export default async function SettingsApplicationsPage({
  course,
}: CourseProps) {
  const applications = await fetchAllApplicationsOfCourse(course);

  return (
    <>
      <ApplicationList applications={applications} />
    </>
  );
}
