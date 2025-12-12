import { Container } from "@/src/shared/ui/container";
import { Loader } from "@/src/shared/ui/loader";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import CoursePage from "./course";
import ModulePage from "./module";
import CourseSettingsPage from "./settings";

export default async function UniversalPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ q?: string; p: string }>;
}) {
  const { p, q } = await searchParams;
  const { slug } = await params;

  if (slug.length > 4) {
    return notFound();
  }

  return (
    <Container className="flex flex-col gap-6 items-center px-2.5 pb-4 min-h-[calc(100dvh-var(--footer-height-and-padding))] h-max">
      {slug.length === 1 && (
        <Suspense fallback={<Loader />}>
          <CoursePage slug={slug[0]} />
        </Suspense>
      )}
      {slug.length >= 2 && slug[1] === "settings" && (
        <CourseSettingsPage slug={slug[0]} route={slug[2]} q={q} p={p} />
      )}
      {slug.length >= 2 && slug[1] !== "settings" && (
        <Suspense fallback={<Loader />}>
          <ModulePage slug={slug as [string, string]} />
        </Suspense>
      )}
    </Container>
  );
}
