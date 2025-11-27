import { ModuleContent } from "@/src/entity/module";
import { api } from "@/src/shared/api";
import { sfwr } from "@/src/shared/libs/server-fetch-with-refresh";
import { notFound } from "next/navigation";

export async function fetchModule(slug: [string, string]) {
  if (!slug.every((e) => Number.isInteger(Number.parseInt(e)))) {
    notFound();
  }

  const courseId = Number.parseInt(slug[0]);
  const moduleId = Number.parseInt(slug[1]);

  try {
    return await sfwr(api.student.getModule, courseId, moduleId);
  } catch {
    notFound();
  }
}

export default async function ModulePage({ slug }: { slug: [string, string] }) {
  const moduleFromCourse = await fetchModule(slug);

  return (
    <>
      <ModuleContent module={moduleFromCourse} className="w-75" />
    </>
  );
}
