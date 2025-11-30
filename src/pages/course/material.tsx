import { Material } from "@/src/entity/material";
import { MaterialContent } from "@/src/entity/material/ui/content";
import { MaterialAction } from "@/src/features/material-action";
import { api } from "@/src/shared/api";
import { sfwr } from "@/src/shared/libs/server-fetch-with-refresh";
import { Endpoint } from "@/src/shared/models/endpoint-enum";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";

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

export async function MaterialPage({
  slug,
  nextMaterial,
}: {
  slug: [string, string, string];
  nextMaterial?: Material;
}) {
  const material = await fetchMaterial(slug);

  return (
    <div className="w-full min-h-full h-full flex flex-col">
      <MaterialContent material={material} />
      <div className="flex justify-end">
        <Suspense>
          <MaterialAction
            nextMaterial={nextMaterial}
            material={material}
            courseId={slug[0]}
          />
        </Suspense>
      </div>
    </div>
  );
}
