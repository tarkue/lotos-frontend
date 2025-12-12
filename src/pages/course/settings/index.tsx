import { BackButton } from "@/src/features/back";
import { api } from "@/src/shared/api";
import { formatEndpoint } from "@/src/shared/libs/endpoint";
import { roleSwitcher } from "@/src/shared/libs/role-switcher";
import { sfwr } from "@/src/shared/libs/server-fetch-with-refresh";
import { Endpoint } from "@/src/shared/models/endpoint-enum";
import { Typography } from "@/src/shared/ui/typography";
import { CourseSettings } from "@/src/widgets/course-settings";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import SettingsAboutPage from "./about";
import SettingsApplicationsPage from "./applications";
import SettingsStudentsPage from "./students";

export async function fetchCourse(slug: string) {
  const cookieStore = await cookies();

  if (!Number.isInteger(Number.parseInt(slug))) {
    notFound();
  }

  const courseId = Number.parseInt(slug);
  const role = cookieStore.get("role")?.value;

  try {
    return await roleSwitcher(role, {
      teacher: async () => await sfwr(api.teacher.getCourse, courseId),
      admin: async () => await sfwr(api.teacher.getCourse, courseId),
      student: () => notFound(),
      unauthorized: () => notFound(),
    });
  } catch {
    notFound();
  }
}

export default async function CourseSettingsPage({
  slug,
  route,
  q,
  p,
}: {
  slug: string;
  route: string;
  q?: string;
  p: string;
}) {
  const course = await fetchCourse(slug);
  return (
    <>
      <div className="w-full">
        <BackButton endpoint={formatEndpoint(Endpoint.COURSE, [slug])} />
      </div>
      <Typography.H1 className="w-full">Настройки курса</Typography.H1>
      <CourseSettings.TabBarWrapper course={course}>
        {Endpoint.COURSE_SETTINGS_ABOUT.endsWith(route) && (
          <SettingsAboutPage course={course} />
        )}
        {Endpoint.COURSE_SETTINGS_STUDENTS.endsWith(route) && (
          <SettingsStudentsPage course={course} q={q} p={p} />
        )}
        {Endpoint.COURSE_SETTINGS_APPLICATIONS.endsWith(route) && (
          <SettingsApplicationsPage course={course} />
        )}
      </CourseSettings.TabBarWrapper>
    </>
  );
}
