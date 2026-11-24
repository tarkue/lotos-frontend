"use client";

import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useId, useRef, useState } from "react";
import { useAuth } from "@/src/shared/api/context/auth-context";
import { Button } from "@/src/shared/ui/button";
import { LoginRedirect } from "./ui/login-redirect";
import { ProfileRedirect } from "./ui/profile-redirect";
import { HeaderLinks } from "./ui/links";

const HeaderProfileLink = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === undefined) {
    return <Button loading variant="ghost" size="small" />;
  }

  if (isAuthenticated) {
    return <ProfileRedirect />;
  }

  return <LoginRedirect />;
};

export const HeaderAction = () => {
  const pathname = usePathname();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const menuId = useId();
  const toggle = useRef<HTMLButtonElement>(null);
  const isOpen = openPath === pathname;
  const close = () => setOpenPath(null);

  return (
    <div onKeyDown={(event) => {
      if (event.key === "Escape" && isOpen) {
        close();
        toggle.current?.focus();
      }
    }}>
      <Button
        ref={toggle}
        type="button"
        variant="ghost"
        size="small"
        className="min-h-11 md:hidden"
        aria-controls={menuId}
        aria-expanded={isOpen}
        onClick={() => setOpenPath(isOpen ? null : pathname)}
      >
        {isOpen ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
        Меню
      </Button>
      <nav
        id={menuId}
        aria-label="Основная навигация"
        className={
          (isOpen ? "flex " : "hidden ") +
          "absolute inset-x-0 top-full max-h-[calc(100dvh-var(--header-height))] flex-col gap-1 overflow-y-auto border-b border-base-border bg-white p-3 md:static md:flex md:max-h-none md:flex-row md:items-center md:gap-4 md:overflow-visible md:border-0 md:p-0"
        }
        onClick={(event) => {
          if (event.target instanceof Element && event.target.closest("a")) {
            close();
          }
        }}
      >
        <HeaderLinks />
        <HeaderProfileLink />
      </nav>
    </div>
  );
};
