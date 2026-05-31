"use client";
import { Container } from "@/src/shared/ui/container";
import { CourseCatalog } from "@/src/widgets/course-catalog";
import { ReactNode } from "react";

export default function CatalogLayout({ children }: { children?: ReactNode }) {
  return (
    <Container
      component="main"
      className="w-full h-max min-h-[calc(100dvh-var(--footer-height-and-padding))] pt-9"
    >
      <CourseCatalog.Wrapper>{children}</CourseCatalog.Wrapper>
    </Container>
  );
}
