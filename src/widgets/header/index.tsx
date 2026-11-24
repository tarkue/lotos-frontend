import { HeaderAction } from "@/src/features/header-action";
import { Logo } from "@/src/shared/ui/logo";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-10 flex h-(--header-height) items-center justify-between gap-3 border-b border-base-border bg-white px-4 md:px-6">
      <Link href="/catalog/all">
        <Logo />
      </Link>
      <HeaderAction />
    </header>
  );
};
