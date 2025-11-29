import { Container } from "@/src/shared/ui/container";
import { Typography } from "@/src/shared/ui/typography";

export default function Custom404() {
  return (
    <Container className="flex flex-col items-center justify-center pb-[117px] min-h-[calc(100dvh-var(--footer-height-and-padding))]">
      <Typography.Hero className="text-[160px] font-extrabold! text-base-500">
        404
      </Typography.Hero>
      <Typography.Body className="-mt-12 text-center text-base-300">
        Страница не была найдена :(
      </Typography.Body>
    </Container>
  );
}
