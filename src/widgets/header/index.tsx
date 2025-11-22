import { LoginRedirect } from "@/src/features/login-redirect";
import { Container } from "@/src/shared/ui/container";
import { Logo } from "@/src/shared/ui/logo";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="w-full py-6">
      <Container className="justify-between items-center">
        <Link href="/catalog/all">
          <Logo />
        </Link>
        <LoginRedirect />
      </Container>
    </header>
  );
};
