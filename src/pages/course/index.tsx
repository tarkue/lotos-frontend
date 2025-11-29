import { Container } from "@/src/shared/ui/container";
import { Loader } from "@/src/shared/ui/loader";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import CoursePage from "./course";
import ModulePage from "./module";

export default async function UniversalPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;

  if (slug.length > 3) {
    return notFound();
  }

  return (
    <Container className="flex flex-col gap-6 items-center pb-4 min-h-[calc(100dvh-167px)] h-max">
      {slug.length === 1 && (
        <Suspense fallback={<Loader />}>
          <CoursePage slug={slug[0]} />
        </Suspense>
      )}
      {slug.length >= 2 && (
        <Suspense fallback={<Loader />}>
          <ModulePage slug={slug as [string, string]} />
        </Suspense>
      )}
    </Container>
  );
}
