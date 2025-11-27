import { api } from "@/src/shared/api";
import { sfwr } from "@/src/shared/libs/server-fetch-with-refresh";
import { notFound } from "next/navigation";

export async function fetchMaterial(slug: [string, string, string]) {
  if (!slug.every((e) => Number.isInteger(Number.parseInt(e)))) {
    notFound();
  }

  const courseId = Number.parseInt(slug[0]);
  const moduleId = Number.parseInt(slug[1]);
  const materialId = Number.parseInt(slug[1]);

  return await sfwr(
    api.student.getMaterialDetail,
    courseId,
    moduleId,
    materialId
  );
}

export default async function MaterialPage({
  slug,
}: {
  slug: [string, string, string];
}) {
  const material = await fetchMaterial(slug);

  console.log(material);

  return <></>;
}
