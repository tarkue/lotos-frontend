import { Container } from "@/src/shared/ui/container";
import { CourseCatalogWrapperProps } from "./props";
import { CourseCatalogTabBar } from "./tab-bar";

export const CourseCatalogWrapper = ({
  children,
}: CourseCatalogWrapperProps) => {
  return (
    <Container className="flex flex-col gap-5 pb-12">
      <CourseCatalogTabBar />
      {children}
    </Container>
  );
};
