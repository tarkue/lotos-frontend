import { Container } from "@/src/shared/ui/container";
import { Typography } from "@/src/shared/ui/typography";
import { RegisterForm } from "@/src/widgets/register-form";

export default function RegisterPage() {
  return (
    <Container
      component="main"
      className="flex flex-col items-center justify-center"
    >
      <div className="max-w-[520px] w-full flex flex-col gap-5 p-6 rounded-2xl bg-white my-9">
        <div className="flex flex-col w-full gap-2">
          <Typography.Heading className="text-center text-black">
            Регистрация
          </Typography.Heading>
          <Typography.Body className="text-center text-light-gray">
            Зарегистрируйтесь, чтобы записаться на курсы
          </Typography.Body>
        </div>
        <RegisterForm />
      </div>
    </Container>
  );
}
