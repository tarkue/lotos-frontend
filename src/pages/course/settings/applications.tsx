import { Course, CourseProps } from "@/src/entity/course";
import { api } from "@/src/shared/api";
import { sfwr } from "@/src/shared/libs/server-fetch-with-refresh";
import { ApplicationList } from "@/src/widgets/application-list";

export async function fetchAllApplicationsOfCourse(course: Course) {
  // sfwr вернет то, что возвращает api.teacher.getCourseApplications, то есть массив []
  return await sfwr(api.teacher.getCourseApplications, course.id);
}

export default async function SettingsApplicationsPage({
  course,
}: CourseProps) {
  // Теперь здесь лежит сразу массив заявок
  const applications = await fetchAllApplicationsOfCourse(course);

  return (
    <>
      {/* Передаем напрямую, так как распаковка уже произошла в TeacherClient */}
      <ApplicationList applications={applications} />
    </>
  );
}
