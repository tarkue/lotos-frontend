import { Container } from "@/src/shared/ui/container";
import { CourseCatalogWrapperProps } from "./props";
import { Typography } from "@/src/shared/ui/typography";

export const CourseCatalogWrapper = ({
  children,
  action,
}: CourseCatalogWrapperProps) => {
  const Act = action;
  return (
    <Container className="flex flex-col gap-5 pb-12">
      <div className="flex w-full max-md:flex-col justify-between gap-2">
        <div className="flex flex-col w-full gap-1">
          <Typography.Heading className="text-black">
            Каталог курсов
          </Typography.Heading>
          <Typography.Body className="text-dark-gray">
            Полный список курсов, которые есть на платформе.
          </Typography.Body>
        </div>
        {Act && <Act />}
      </div>
      {children}
    </Container>
  );
};
