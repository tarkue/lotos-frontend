import { api } from "@/src/shared/api";
import { roleSwitcher } from "@/src/shared/libs/role-switcher";
import { sfwr } from "@/src/shared/libs/server-fetch-with-refresh";
import { Typography } from "@/src/shared/ui/typography";
import { CourseSettings } from "@/src/widgets/course-settings";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { SidebarPortal } from "@/src/shared/ui/sidebar";
import { TeacherCourseActions } from "@/src/widgets/course/teacher-actions";
import { CourseAction } from "@/src/features/course-action";
import { Course } from "@/src/entity/course";
import { CourseTeacherList } from "@/src/widgets/course-editor-list";
import { getFullName } from "@/src/entity/user";
import { ApplicationList } from "@/src/widgets/application-list";
import { UserListForDelete } from "@/src/widgets/user-list-for-delete";
import { PaginatedApplicationsResponseDTO } from "@/src/shared/api/exports";

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

export async function fetchAllUsersOnCourse(
  course: Course,
  search?: string | undefined,
  page?: string,
) {
  return await sfwr(api.teacher.getStudentsFromCourse, course.id, {
    page: page ? Number.parseInt(page) : undefined,
    search: search,
  });
}

export async function fetchAllTeachersOnCourse(
  course: Course,
  search?: string | undefined,
  page?: string,
) {
  const res = await sfwr(api.teacher.getEditors, course.id, {
    page: page ? Number.parseInt(page) : undefined,
    search,
  });

  res.editors.map((el) => {
    el.full_name = getFullName(el.user);
  });

  return res;
}

export async function fetchAllApplicationsOfCourse(
  course: Course,
  search?: string,
  page?: string,
): Promise<PaginatedApplicationsResponseDTO> {
  const res = await sfwr(api.teacher.getCourseApplications, course.id, {
    page: page ? Number.parseInt(page) : undefined,
    search,
  });

  res.applications.map((el) => {
    el.user.full_name = getFullName(el.user);
  });

  return res;
}

export default async function CourseSettingsPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string; route?: string }>;
  searchParams: {
    students_q?: string;
    students_p?: string;
    applications_q?: string;
    applications_p?: string;
    teachers_q?: string;
    teachers_p?: string;
  };
}) {
  const { slug } = await params;
  const {
    teachers_p,
    teachers_q,
    students_p,
    students_q,
    applications_p,
    applications_q,
  } = searchParams;

  const course = await fetchCourse(slug);
  const teachers = await fetchAllTeachersOnCourse(
    course,
    teachers_q,
    teachers_p,
  );
  const applications = await fetchAllApplicationsOfCourse(
    course,
    applications_q,
    applications_p,
  );
  const users = await fetchAllUsersOnCourse(course, students_q, students_p);
  return (
    <>
      <SidebarPortal>
        <div className="flex flex-col gap-1 px-3">
          <Typography.Caption className="text-light-gray">
            КУРС
          </Typography.Caption>
          <Typography.Subtitle className="text-black">
            {course.title}
          </Typography.Subtitle>
        </div>
        <TeacherCourseActions course={course} />
      </SidebarPortal>
      <div className="flex flex-col gap-9 w-full mt-9">
        <div className="flex flex-col gap-4 w-full">
          <Typography.Heading className="w-full">Настройки</Typography.Heading>
          <div className="w-full min-h-full flex flex-col bg-white p-6 rounded-2xl">
            <CourseSettings.Form course={course} action={CourseAction.Delete} />
          </div>
        </div>
      </div>
      <CourseTeacherList teachers={teachers} course={course} />
      <ApplicationList
        applications={applications.applications}
        total={applications.total}
        page={applications.page}
        pageSize={applications.page_size}
      />
      <UserListForDelete users={users.students} course={course} />
    </>
  );
}
