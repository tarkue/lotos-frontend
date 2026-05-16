import { Endpoint } from "@/src/shared/models/endpoint-enum";
import { Container } from "@/src/shared/ui/container";
import { Link } from "@/src/shared/ui/link";
import { Typography } from "@/src/shared/ui/typography";
import { LoginForm } from "@/src/widgets/login-form";

export default function LoginPage() {
  return (
    <Container
      component="main"
      className="flex flex-col items-center justify-center pb-[117px] min-h-[calc(100dvh-var(--footer-height-and-padding))]"
    >
      <div className="max-w-[500px] w-full flex flex-col gap-5 p-6 rounded-2xl bg-white">
        <div className="flex flex-col gap-2">
          <Typography.Heading className="text-center text-black">
            Вход в личный кабинет
          </Typography.Heading>
          <Typography.Body className="text-center text-light-gray">
            Войдите, чтобы записаться на курсы
          </Typography.Body>
        </div>
        <LoginForm />

        <Link
          href={Endpoint.REGISTER}
          className="text-dark-gray text-center w-full"
        >
          Нет аккаунта?
        </Link>
      </div>
    </Container>
  );
}
