import { Container } from "@/src/shared/ui/container";
import { CourseCatalogWrapperProps } from "./props";
import { CourseCatalogTabBar } from "./tab-bar";

export const CourseCatalogWrapper = ({
  children,
  tabBarWidth,
  action,
}: CourseCatalogWrapperProps) => {
  const Act = action;
  return (
    <Container className="flex flex-col gap-5 pb-12">
      <div className="flex w-full max-md:flex-col justify-between gap-2">
        <CourseCatalogTabBar width={tabBarWidth} />
        {Act && <Act />}
      </div>
      {children}
    </Container>
  );
};
