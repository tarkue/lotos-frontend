import { api } from "@/src/shared/api";
import { PaginatedCoursesResponseDTO } from "@/src/shared/api/exports";
import { formatEndpoint } from "@/src/shared/libs/endpoint";
import { sfwr } from "@/src/shared/libs/server-fetch-with-refresh";
import { Endpoint } from "@/src/shared/models/endpoint-enum";
import { Container } from "@/src/shared/ui/container";
import { Typography } from "@/src/shared/ui/typography";
import { ProgressTeacherSidebar } from "@/src/widgets/progress-sidebar";
import { ProgressTeacherTable } from "@/src/widgets/progress-table/teacher";
import { redirect } from "next/navigation";

export async function fetchMyCourses(search?: string) {
  return await sfwr(api.teacher.getMyCourses, {
    search: search,
    page_size: 100,
  });
}

export async function fetchCourseProgress(
  courses: PaginatedCoursesResponseDTO,
  slug: string,
  page?: string,
) {
  if (!slug && courses.total > 0) {
    redirect(formatEndpoint(Endpoint.PROGRESS_COURSE, [courses.courses[0].id]));
  }

  return await sfwr(
    api.teacher.getCourseProgressOverview,
    Number.parseInt(slug),
    {
      page: page ? Number.parseInt(page) : undefined,
    },
  );
}

export default async function ProgressTeacherPage({
  searchParams,
  params,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ p?: string }>;
}) {
  const slug = await params;
  const { p } = await searchParams;
  const courses = await fetchMyCourses();

  const progress = await fetchCourseProgress(courses, slug?.slug, p);

  return (
    <>
      <ProgressTeacherSidebar courses={courses.courses} />
      <Container
        component="main"
        variant="large"
        className="flex flex-col gap-9 mt-9 h-max min-h-[calc(100dvh-var(--footer-height-and-padding)-36px)]"
      >
        <div className="flex flex-col gap-1 w-full">
          <Typography.Heading className="text-dark-gray">
            Общий прогресс
          </Typography.Heading>
          <Typography.Body className="text-light-gray">
            Просматривайте информацию о прохождении каждого курса, проходимого
            вами.
          </Typography.Body>
        </div>
        <ProgressTeacherTable data={progress} />
      </Container>
    </>
  );
}
