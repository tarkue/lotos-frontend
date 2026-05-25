import { Material } from "@/src/entity/material";
import { MaterialContent } from "@/src/entity/material/ui/content";
import {
  MaterialAction,
  NavigationMaterialAction,
} from "@/src/features/material-action";
import { api } from "@/src/shared/api";
import { HomeworkStudentItemResponseDTO } from "@/src/shared/api/exports";
import { formatEndpoint } from "@/src/shared/libs/endpoint";
import { roleSwitcher } from "@/src/shared/libs/role-switcher";
import { sfwr } from "@/src/shared/libs/server-fetch-with-refresh";
import { Endpoint } from "@/src/shared/models/endpoint-enum";
import { CommentList } from "@/src/widgets/comment-list";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import { HomeworkActionsBlock } from "@/src/widgets/homework-actions-block";

export async function fetchMaterial(slug: [string, string, string]) {
  const cookieStore = await cookies();

  if (!slug.every((e) => Number.isInteger(Number.parseInt(e)))) {
    notFound();
  }

  const courseId = Number.parseInt(slug[0]);
  const moduleId = Number.parseInt(slug[1]);
  const materialId = Number.parseInt(slug[2]);
  const role = cookieStore.get("role")?.value;

  return await roleSwitcher(role, {
    student: async () =>
      await sfwr(api.student.getMaterialDetail, courseId, moduleId, materialId),
    teacher: async () =>
      await sfwr(api.teacher.getMaterial, courseId, moduleId, materialId),
    admin: async () =>
      await sfwr(api.teacher.getMaterial, courseId, moduleId, materialId),
    unauthorized: async () => {
      redirect(formatEndpoint(Endpoint.COURSE, [courseId]));
    },
  });
}

async function fetchHomework(
  courseId: number,
  moduleId: number,
  materialId: number,
) {
  const cookieStore = await cookies();
  const role = cookieStore.get("role")?.value;

  try {
    const homeworks = await roleSwitcher(role, {
      student: async () =>
        await sfwr(
          api.student.getHomeworkForMaterial,
          courseId,
          moduleId,
          materialId,
        ),
      teacher: async () =>
        await sfwr(
          api.teacher.getHomeworkForMaterial,
          courseId,
          moduleId,
          materialId,
        ),
      admin: async () =>
        await sfwr(
          api.teacher.getHomeworkForMaterial,
          courseId,
          moduleId,
          materialId,
        ),
      unauthorized: async () => [],
    });
    return homeworks[0] as HomeworkStudentItemResponseDTO | undefined;
  } catch {
    return undefined;
  }
}

export async function MaterialPage({
  slug,
  prevMaterial,
  nextMaterial,
}: {
  slug: [string, string, string];
  prevMaterial?: Material;
  nextMaterial?: Material;
}) {
  const courseId = Number.parseInt(slug[0]);
  const moduleId = Number.parseInt(slug[1]);
  const materialId = Number.parseInt(slug[2]);

  const [material, homework] = await Promise.all([
    fetchMaterial(slug),
    fetchHomework(courseId, moduleId, materialId),
  ]);

  return (
    <div className="w-full min-h-full flex flex-col mt-9">
      <MaterialContent
        material={material}
        homework={homework}
        headerAction={
          <MaterialAction
            nextMaterial={nextMaterial}
            material={material}
            courseId={slug[0]}
          />
        }
        bodyAction={
          homework && (
            <Suspense fallback={<div>Загрузка...</div>}>
              <HomeworkActionsBlock
                homework={homework}
                courseId={courseId}
                moduleId={moduleId}
                materialId={materialId}
              />
            </Suspense>
          )
        }
        courseId={courseId}
        moduleId={moduleId}
      />

      <Suspense>
        <NavigationMaterialAction
          material={material}
          courseId={slug[0]}
          prevMaterial={prevMaterial}
          nextMaterial={nextMaterial}
        />
      </Suspense>
      <Suspense>
        <section className="mt-6">
          <CommentList
            courseId={courseId}
            moduleId={moduleId}
            materialId={materialId}
          />
        </section>
      </Suspense>
    </div>
  );
}
