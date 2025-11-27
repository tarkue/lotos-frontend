import { Container } from "@/src/shared/ui/container";
import { CourseCatalogWrapperProps } from "./props";
import { CourseCatalogTabBar } from "./tab-bar";

export const CourseCatalogWrapper = ({
  children,
  tabBarWidth,
}: CourseCatalogWrapperProps) => {
  return (
    <Container className="flex flex-col gap-5 pb-12">
      <CourseCatalogTabBar width={tabBarWidth} />
      {children}
    </Container>
  );
};
