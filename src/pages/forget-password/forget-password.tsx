import { Endpoint } from "@/src/shared/models/endpoint-enum";
import { Container } from "@/src/shared/ui/container";
import { Link } from "@/src/shared/ui/link";
import { Typography } from "@/src/shared/ui/typography";
import { ForgetPasswordForm } from "@/src/widgets/forget-password-form";

export default function ForgetPasswordPage() {
  return (
    <Container className="flex flex-col items-center justify-center pb-[117px] min-h-[calc(100dvh-var(--footer-height-and-padding))]">
      <div className="max-w-[500px] w-full flex flex-col gap-6">
        <Typography.H1 className="-mt-12 text-center text-base-500">
          Восстановление доступа
        </Typography.H1>
        <ForgetPasswordForm />
        <div className="flex justify-between w-full">
          <Link href={Endpoint.LOGIN} className="text-base-300">
            Обратно к входу
          </Link>
        </div>
      </div>
    </Container>
  );
}
