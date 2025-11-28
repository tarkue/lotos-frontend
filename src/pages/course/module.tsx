import { MaterialContent } from "@/src/entity/material/ui/content";
import { ModuleContent } from "@/src/entity/module";
import { BackButton } from "@/src/features/back";
import { api } from "@/src/shared/api";
import { formatEndpoint } from "@/src/shared/libs/endpoint";
import { sfwr } from "@/src/shared/libs/server-fetch-with-refresh";
import { Endpoint } from "@/src/shared/models/endpoint-enum";
import { Loader } from "@/src/shared/ui/loader";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";

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

export async function fetchMaterial(slug: [string, string, string]) {
  if (!slug.every((e) => Number.isInteger(Number.parseInt(e)))) {
    notFound();
  }

  const courseId = Number.parseInt(slug[0]);
  const moduleId = Number.parseInt(slug[1]);
  const materialId = Number.parseInt(slug[2]);

  try {
    return await sfwr(
      api.student.getMaterialDetail,
      courseId,
      moduleId,
      materialId
    );
  } catch {
    redirect(Endpoint.LOGIN);
  }
}

export default async function SuspensedModulePage({
  slug,
}: {
  slug: [string, string] | [string, string, string];
}) {
  return (
    <div className="w-full min-h-full">
      <BackButton endpoint={formatEndpoint(Endpoint.COURSE, [slug[0]])} />
      <Suspense fallback={<Loader />}>
        <ModulePage slug={slug} />
      </Suspense>
    </div>
  );
}

export async function ModulePage({
  slug,
}: {
  slug: [string, string] | [string, string, string];
}) {
  const moduleFromCourse = await fetchModule([slug[0], slug[1]]);
  const currentMaterial = moduleFromCourse.materials?.find(
    (el) => el.position === moduleFromCourse.position
  );

  if (
    slug.length === 2 &&
    currentMaterial &&
    currentMaterial.material_id !== undefined
  ) {
    redirect(
      formatEndpoint(Endpoint.MATERIAL, [
        moduleFromCourse.course_id,
        moduleFromCourse.id,
        currentMaterial?.material_id,
      ])
    );
  }

  return (
    <>
      <div className="flex w-full min-h-full h-full gap-6">
        {slug.length === 3 && (
          <Suspense fallback={<Loader />}>
            <MaterialPage slug={slug} />
          </Suspense>
        )}
        <ModuleContent module={moduleFromCourse} className="w-75" />
      </div>
    </>
  );
}

export async function MaterialPage({
  slug,
}: {
  slug: [string, string, string];
}) {
  const material = await fetchMaterial(slug);
  console.log(material);

  return (
    <div className="w-full min-h-full h-full flex">
      <MaterialContent material={material} />
    </div>
  );
}
