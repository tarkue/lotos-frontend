import { HeaderAction } from "@/src/features/header-action";
import { Logo } from "@/src/shared/ui/logo";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="w-full px-6 py-4 flex justify-between items-center border-b border-b-base-border bg-white">
      <Link href="/catalog/all">
        <Logo />
      </Link>
      <HeaderAction />
    </header>
  );
};
