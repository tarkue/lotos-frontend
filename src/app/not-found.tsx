import { Container } from "../shared/ui/container";
import { Typography } from "../shared/ui/typography";

export default function Custom404() {
  return (
    <Container className="flex flex-col items-center absolute pb-[117px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <Typography.Hero className="text-[160px] font-extrabold! text-base-500">
        404
      </Typography.Hero>
      <Typography.Body className="-mt-12 text-center text-base-300">
        Страница не была найдена :(
      </Typography.Body>
    </Container>
  );
}
