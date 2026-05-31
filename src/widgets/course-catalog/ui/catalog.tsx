import { Container } from "@/src/shared/ui/container";
import { CourseCatalogWrapperProps } from "./props";

export const CourseCatalogWrapper = ({
  children,
}: CourseCatalogWrapperProps) => {
  return (
    <Container className="flex flex-col gap-5 pb-12">{children}</Container>
  );
};
