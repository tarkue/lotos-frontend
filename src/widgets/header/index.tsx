import { HeaderAction } from "@/src/features/header-action";
import { Logo } from "@/src/shared/ui/logo";
import { HamburgerButton } from "@/src/shared/ui/sidebar";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="w-full px-4 sm:px-6 py-4 flex justify-between z-20 items-center border-b fixed border-b-base-border bg-white">
      <div className="flex items-center gap-3">
        <HamburgerButton className="-ml-2" />
        <Link href="/catalog/all">
          <Logo />
        </Link>
      </div>
      <HeaderAction />
    </header>
  );
};
