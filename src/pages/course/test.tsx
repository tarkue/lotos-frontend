import { TestContent } from "@/src/entity/test";
import { TestFormWrapper } from "@/src/features/test-form/ui/test-form-wrapper";
import { api } from "@/src/shared/api";
import { formatEndpoint } from "@/src/shared/libs/endpoint";
import { sfwr } from "@/src/shared/libs/server-fetch-with-refresh";
import { Endpoint } from "@/src/shared/models/endpoint-enum";
import { TestHeader } from "@/src/widgets/test-header";
import { redirect } from "next/navigation";

export async function startTest(slug: [number, number, number, number]) {
  try {
    return await sfwr(api.student.startTest, ...slug);
  } catch {}

  try {
    const attmpts = await sfwr(api.student.getMyTestAttempts, ...slug);

    const current = attmpts.sort((a) => a.attempt_number)[0];

    if (current.finished_at !== null) {
      redirect(formatEndpoint(Endpoint.MATERIAL, slug.slice(0, -1)));
    }
    return current;
  } catch (error) {
    console.log(error);
  }

  redirect(formatEndpoint(Endpoint.MATERIAL, slug.slice(0, -1)));
}

export async function getTest(slug: [number, number, number, number]) {
  return await sfwr(api.student.getTest, ...slug);
}

export default async function TestPage({
  slug,
}: {
  slug: [string, string, string, string];
}) {
  const ids = slug.map((i) => Number.parseInt(i)) as [
    number,
    number,
    number,
    number
  ];
  const { started_at, id } = await startTest(ids);
  const test = await getTest(ids);

  return (
    <TestFormWrapper
      test={test}
      courseId={ids[0]}
      moduleId={ids[1]}
      materialId={ids[2]}
      attemptId={id}
    >
      <TestHeader test={test} startedAt={started_at + "+00:00"} />
      <TestContent test={test} />
    </TestFormWrapper>
  );
}
