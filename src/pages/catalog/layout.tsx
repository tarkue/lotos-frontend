import { Container } from "@/src/shared/ui/container";
import { CourseCatalog } from "@/src/widgets/course-catalog";
import { ReactNode } from "react";

export default function CatalogLayout({ children }: { children?: ReactNode }) {
  return (
    <Container className="w-full h-max min-h-[calc(100dvh-167px)]">
      <CourseCatalog.Wrapper>{children}</CourseCatalog.Wrapper>
    </Container>
  );
}
