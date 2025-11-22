import { Course, CourseDescription } from "@/src/entity/course";
import { ModuleList } from "@/src/entity/module";
import { BackButton } from "@/src/features/back";
import { CourseAction } from "@/src/features/course-action";
import { Container } from "@/src/shared/ui/container";

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  console.log(slug);
  const { enrolled } = { enrolled: false };
  const course: Required<Course> = {
    id: "",
    total: 31,
    all: 40,
    title: "Элементы математического анализа",
    description:
      "Математический анализ — фундаментальный раздел высшей математики, изучающий бесконечно малые величины, пределы, производные, интегралы и ряды, и хотя вычисление предела частного, может сделать из обычного человека несчастного, математический анализ широко применяется в различных областях, в которых для решения проблемы может быть построена математическая модель и необходимо найти её оптимальное решение.",
    img_url: "",
    status: "",
    modules: [
      {
        id: "",
        title: "Модуль 1. Что такое математический анализ?",
        isAble: true,
        position: 1,
        allTasks: 10,
      },
      {
        id: "",
        title: "Модуль 2. Что такое математический анализ?",
      },
      {
        id: "",
        title: "Модуль 3. Что такое математический анализ?",
      },
      {
        id: "",
        title: "Модуль 4. Что такое математический анализ?",
      },
      {
        id: "",
        title: "Модуль 5. Что такое математический анализ?",
      },
      {
        id: "",
        title: "Модуль 6. Что такое математический анализ?",
      },
      {
        id: "",
        title: "Модуль 7. Что такое математический анализ?",
      },
    ],
  };
  return (
    <Container className="flex flex-col gap-6 items-center pb-[117px] min-h-[calc(100dvh-167px)]">
      <div className="w-full">
        <BackButton />
      </div>
      <CourseDescription
        course={course}
        action={enrolled ? CourseAction.ProgressBar : CourseAction.Enroll}
      />
      <ModuleList className="flex flex-col gap-2" modules={course.modules} />
    </Container>
  );
}
