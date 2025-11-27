import { Container } from "@/src/shared/ui/container";
import { notFound } from "next/navigation";
import CoursePage from "./course";
import MaterialPage from "./material";
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
    <Container className="flex flex-col gap-6 items-center pb-[117px] min-h-[calc(100dvh-167px)]">
      {slug.length === 1 && <CoursePage slug={slug[0]} />}
      {slug.length === 2 && <ModulePage slug={slug as [string, string]} />}
      {slug.length === 3 && (
        <MaterialPage slug={slug as [string, string, string]} />
      )}
    </Container>
  );
}
