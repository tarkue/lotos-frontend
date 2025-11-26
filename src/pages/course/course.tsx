import { CourseDescription } from "@/src/entity/course";
import { ModuleList } from "@/src/entity/module";
import { BackButton } from "@/src/features/back";
import { CourseAction } from "@/src/features/course-action";
import { api } from "@/src/shared/api";
import { GetTokenPairFromCookie } from "@/src/shared/libs/cookie";
import { Container } from "@/src/shared/ui/container";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export async function fetchCourse(slug: string) {
  if (!Number.isInteger(Number.parseInt(slug))) {
    notFound();
  }

  const id = Number.parseInt(slug);
  const cookieStore = await cookies();
  const tokenPair = GetTokenPairFromCookie(cookieStore);

  if (tokenPair !== undefined) {
    try {
      api.student.setTokens(tokenPair);
      const course = await api.student.getEnrolledCourse(id);
      course.is_enrolled = true;
      return { course: course, modules: course.modules };
    } catch {}
  }

  try {
    const course = await api.course.getCoursePublicInfo(id);
    course.is_enrolled = false;
    return { course: course, modules: undefined };
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
  const { course, modules } = await fetchCourse(slug);

  return (
    <Container className="flex flex-col gap-6 items-center pb-[117px] min-h-[calc(100dvh-167px)]">
      <div className="w-full">
        <BackButton />
      </div>
      <CourseDescription
        course={course}
        action={
          course.is_enrolled ? CourseAction.ProgressBar : CourseAction.Enroll
        }
      />
      {modules && <ModuleList modules={modules} />}
    </Container>
  );
}
