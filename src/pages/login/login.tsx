import { Endpoint } from "@/src/shared/models/endpoint-enum";
import { Container } from "@/src/shared/ui/container";
import { Link } from "@/src/shared/ui/link";
import { Typography } from "@/src/shared/ui/typography";
import { LoginForm } from "@/src/widgets/login-form";

export default function LoginPage() {
  return (
    <Container className="flex flex-col items-center justify-center pb-[117px] min-h-[calc(100dvh-var(--footer-height-and-padding))]">
      <div className="max-w-[500px] w-full flex flex-col gap-6">
        <Typography.H1 className="-mt-12 text-center text-base-500">
          Вход в личный кабинет
        </Typography.H1>
        <LoginForm />
        <div className="flex justify-between w-full">
          <Link href={Endpoint.FORGET_PASSWORD} className="text-base-300">
            Забыли пароль?
          </Link>
          <Link href={Endpoint.REGISTER} className="text-base-300">
            Нет аккаунта?
          </Link>
        </div>
      </div>
    </Container>
  );
}
