import { Container } from "@/src/shared/ui/container";
import { CourseCatalogWrapperProps } from "./props";

export const CourseCatalogWrapper = ({
  children,
}: CourseCatalogWrapperProps) => {
  return (
    <Container className="flex flex-col gap-5 px-0 pb-8 md:pb-12">{children}</Container>
  );
};
