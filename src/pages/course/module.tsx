import { ModuleContent } from "@/src/entity/module";
import { BackButton } from "@/src/features/back";
import { TeacherAddLesson } from "@/src/features/create-lesson";
import { DeleteModule } from "@/src/features/delete-module";
import { api } from "@/src/shared/api";
import { formatEndpoint } from "@/src/shared/libs/endpoint";
import { roleSwitcher } from "@/src/shared/libs/role-switcher";
import { sfwr } from "@/src/shared/libs/server-fetch-with-refresh";
import { Endpoint } from "@/src/shared/models/endpoint-enum";
import { Loader } from "@/src/shared/ui/loader";
import { ModuleNotFound } from "@/src/widgets/module-not-found";
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
  slug: string[];
}) {
  const moduleFromCourse = await fetchModule([slug[0], slug[1]]);

  // 1. Находим текущий материал (из URL или первый в списке)
  const currentMaterialId = slug[2] ? Number.parseInt(slug[2]) : null;
  
  const sortedMaterials = [...(moduleFromCourse.materials || [])].sort(
    (a, b) => a.position - b.position
  );

  const currentMaterial = currentMaterialId 
    ? sortedMaterials.find(m => m.id === currentMaterialId)
    : sortedMaterials[0]; // По умолчанию первый

  if (!currentMaterial && !moduleFromCourse.materials?.length) {
    return <ModuleNotFound module={moduleFromCourse} />;
  }

  // Определяем следующий материал для кнопки "Вперед"
  const nextMaterial = sortedMaterials.find(
    (el) => el.position === (currentMaterial?.position || 0) + 1,
  );

  return (
    <div className="flex w-full min-h-full h-max gap-6 flex-col-reverse md:flex-row">
      {/* ЛЕВАЯ ЧАСТЬ: Контент только ОДНОГО активного материала */}
      <div className="flex flex-col gap-8 flex-1">
        {/* Если это тест (длина slug 4) - показываем только тест */}
        {slug.length === 4 ? (
          <Suspense fallback={<Loader />}>
            <TestPage slug={slug as [string, string, string, string]} />
          </Suspense>
        ) : (
          /* Иначе показываем материал */
          slug.length >= 2 && currentMaterial && (
            <Suspense fallback={<Loader />}>
              <MaterialPage 
                slug={[slug[0], slug[1], currentMaterial.id.toString()]} 
                nextMaterial={nextMaterial}
              />
            </Suspense>
          )
        )}
      </div>

      {/* ПРАВАЯ ЧАСТЬ: Панель навигации (Сайдбар) */}
      <div className="flex flex-col gap-4 md:sticky md:top-6 h-min">
        {/* ModuleContent внутри себя должен содержать список ссылок на материалы */}
        <ModuleContent 
          module={moduleFromCourse} 
          className="w-full md:w-75" 
        />
        
        {/* Кнопки управления для учителя */}
        <DeleteModule module={moduleFromCourse} />
        <TeacherAddLesson module={moduleFromCourse} />
      </div>
    </div>
  );
}