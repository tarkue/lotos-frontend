import { CourseDescription } from "@/src/entity/course";
import { ModuleList } from "@/src/entity/module";
import { BackButton } from "@/src/features/back";
import { CourseAction } from "@/src/features/course-action";
import { api } from "@/src/shared/api";
import { sfwr } from "@/src/shared/libs/server-fetch-with-refresh";
import { Endpoint } from "@/src/shared/models/endpoint-enum";
import { Container } from "@/src/shared/ui/container";
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

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = await fetchCourse(slug);

  return (
    <Container className="flex flex-col gap-6 items-center pb-[117px] min-h-[calc(100dvh-167px)]">
      <div className="w-full">
        <BackButton endpoint={Endpoint.ALL_COURSES} />
      </div>
      <CourseDescription
        course={course}
        action={
          course.is_enrolled ? CourseAction.ProgressBar : CourseAction.Enroll
        }
      />
      {course.modules && <ModuleList modules={course.modules} />}
    </Container>
  );
}
