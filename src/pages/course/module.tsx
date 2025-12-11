import { ModuleContent } from "@/src/entity/module";
import { BackButton } from "@/src/features/back";
import { api } from "@/src/shared/api";
import { formatEndpoint } from "@/src/shared/libs/endpoint";
import { roleSwitcher } from "@/src/shared/libs/role-switcher";
import { sfwr } from "@/src/shared/libs/server-fetch-with-refresh";
import { Endpoint } from "@/src/shared/models/endpoint-enum";
import { Loader } from "@/src/shared/ui/loader";
import { Typography } from "@/src/shared/ui/typography";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import { MaterialPage } from "./material";
import TestPage from "./test";

export async function fetchModule(slug: [string, string]) {
  const cookieStore = await cookies();

  if (!slug.every((e) => Number.isInteger(Number.parseInt(e)))) {
    notFound();
  }

  const courseId = Number.parseInt(slug[0]);
  const moduleId = Number.parseInt(slug[1]);
  const role = cookieStore.get("role")?.value;

  try {
    return await roleSwitcher(role, {
      student: async () =>
        await sfwr(api.student.getModule, courseId, moduleId),
      teacher: async () =>
        await sfwr(api.teacher.getModule, courseId, moduleId),
      admin: async () => await sfwr(api.teacher.getModule, courseId, moduleId),
      unauthorized: async () => {
        redirect(formatEndpoint(Endpoint.COURSE, [courseId]));
      },
    });
  } catch {
    notFound();
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
  slug:
    | [string, string]
    | [string, string, string]
    | [string, string, string, string];
}) {
  const moduleFromCourse = await fetchModule([slug[0], slug[1]]);

  const currentMaterial =
    slug[2] !== undefined
      ? moduleFromCourse.materials?.find(
          (el) => el.id === Number.parseInt(slug[2] as string)
        )
      : moduleFromCourse.materials?.find(
          (el) => el.position === moduleFromCourse.position
        );

  if (
    slug.length === 2 &&
    currentMaterial &&
    currentMaterial.id !== undefined
  ) {
    redirect(
      formatEndpoint(Endpoint.MATERIAL, [
        moduleFromCourse.course_id,
        moduleFromCourse.id,
        currentMaterial?.id,
      ])
    );
  }

  if (!currentMaterial) {
    return (
      <Typography.Body className="text-base-300 text-center w-full">
        <strong>Здесь пока ничего нет</strong>
      </Typography.Body>
    );
  }

  const nextMaterial = moduleFromCourse.materials?.find(
    (el) => el.position === currentMaterial.position + 1
  );

  return (
    <>
      <div className="flex w-full min-h-full h-full gap-6 flex-col-reverse md:flex-row">
        {slug.length === 3 && (
          <Suspense fallback={<Loader />}>
            <MaterialPage slug={slug} nextMaterial={nextMaterial} />
          </Suspense>
        )}
        {slug.length === 4 && (
          <Suspense fallback={<Loader />}>
            <TestPage slug={slug} />
          </Suspense>
        )}
        <div className="md:sticky md:top-6 h-min">
          <ModuleContent module={moduleFromCourse} className="w-full md:w-75" />
        </div>
      </div>
    </>
  );
}
