import { Container } from "@/src/shared/ui/container";
import { CourseCatalog } from "@/src/widgets/course-catalog";
import { ReactNode } from "react";

export default function CatalogLayout({ children }: { children?: ReactNode }) {
  return (
    <Container className="w-full h-max min-h-[calc(100dvh-var(--footer-height-and-padding))]">
      <CourseCatalog.Wrapper tabBarWidth="280px">
        {children}
      </CourseCatalog.Wrapper>
    </Container>
  );
}
