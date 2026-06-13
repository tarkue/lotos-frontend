import { Material } from "@/src/entity/material";
import { MaterialContent } from "@/src/entity/material/ui/content";
import {
  FooterContentMaterialAction,
  MaterialAction,
  NavigationMaterialAction,
} from "@/src/features/material-action";
import { api } from "@/src/shared/api";
import {
  HomeworkStudentItemResponseDTO,
  RoleType,
} from "@/src/shared/api/exports";
import { formatEndpoint } from "@/src/shared/libs/endpoint";
import { roleSwitcher } from "@/src/shared/libs/role-switcher";
import { sfwr } from "@/src/shared/libs/server-fetch-with-refresh";
import { Endpoint } from "@/src/shared/models/endpoint-enum";
import { CommentList } from "@/src/widgets/comment-list";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import { HomeworkActionsBlock } from "@/src/widgets/homework-actions-block";
import { HomeworkTable } from "@/src/widgets/homework-table";

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

async function fetchSubmissions(
  courseId: number,
  moduleId: number,
  materialId: number,
  assignmentId?: number,
) {
  const cookieStore = await cookies();
  const role = cookieStore.get("role")?.value;

  if (!role || Number.parseInt(role) == RoleType.STUDENT || !assignmentId)
    return undefined;

  return await sfwr(
    api.teacher.getHomeworkSubmissions,
    courseId,
    moduleId,
    materialId,
    assignmentId,
  );
}

async function fetchTest(
  courseId: number,
  moduleId: number,
  materialId: number,
  testId: number,
) {
  const cookieStore = await cookies();
  const role = cookieStore.get("role")?.value;

  try {
    const test = await roleSwitcher(role, {
      student: () => undefined,
      teacher: async () =>
        await sfwr(api.test.getTest, courseId, moduleId, materialId, testId),
      admin: async () =>
        await sfwr(api.test.getTest, courseId, moduleId, materialId, testId),
      unauthorized: async () => undefined,
    });
    return test;
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

  const submissions = await fetchSubmissions(
    courseId,
    moduleId,
    materialId,
    homework?.id,
  );

  const test =
    material.tests && material.tests.length > 0
      ? await fetchTest(courseId, moduleId, materialId, material.tests[0].id)
      : undefined;

  return (
    <div className="w-full min-h-full flex flex-col mt-9 gap-6">
      <MaterialContent
        material={material}
        homework={homework}
        test={test}
        headerAction={
          <MaterialAction
            nextMaterial={nextMaterial}
            material={material}
            courseId={slug[0]}
          />
        }
        bodyAction={
          <>
            {homework && (
              <Suspense fallback={<div>Загрузка...</div>}>
                <HomeworkActionsBlock
                  homework={homework}
                  courseId={courseId}
                  moduleId={moduleId}
                  materialId={materialId}
                />
              </Suspense>
            )}
            <FooterContentMaterialAction
              material={material}
              courseId={slug[0]}
            />
          </>
        }
      />
      <Suspense>
        {homework && submissions && (
          <HomeworkTable
            submissions={submissions?.submissions}
            courseId={courseId}
            moduleId={moduleId}
            materialId={materialId}
          />
        )}
      </Suspense>
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
