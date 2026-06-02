import { api } from "@/src/shared/api";
import { sfwr } from "@/src/shared/libs/server-fetch-with-refresh";
import { Endpoint } from "@/src/shared/models/endpoint-enum";
import { Container } from "@/src/shared/ui/container";
import { Typography } from "@/src/shared/ui/typography";
import { ProgressStudentTable } from "@/src/widgets/progress-table/student";
import { redirect } from "next/navigation";

export async function fetchMyCourses() {
  try {
    return await sfwr(api.student.getMyCourses);
  } catch {
    redirect(Endpoint.ALL_COURSES);
  }
}

export default async function ProgressStudentPage() {
  const courses = await fetchMyCourses();
  return (
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
      <ProgressStudentTable data={courses.courses} />
    </Container>
  );
}
