"use client";
import { useAuth } from "@/src/shared/api/context/auth-context";
import { Button } from "@/src/shared/ui/button";
import { RoleLinksMap } from "./links/models";
import Link from "next/link";
import { LoginRedirect } from "./login-redirect";
import { ProfileRedirect } from "./profile-redirect";
import { useSidebar } from "@/src/shared/ui/sidebar";

const MobileHeaderLinks = ({ onClose }: { onClose: () => void }) => {
  const { role } = useAuth();
  const links = RoleLinksMap[role ?? "unauthorized"];

  return (
    <ul className="flex flex-col gap-2 py-2">
      {links.map((el, i) => (
        <li key={i}>
          <Link
            href={el.href}
            className="block px-4 py-2 hover:bg-base-raised rounded"
            onClick={onClose}
          >
            {el.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const MobileHeaderProfile = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === undefined) {
    return <Button loading variant="ghost" size="small" className="w-full" />;
  }

  if (isAuthenticated) {
    return <ProfileRedirect />;
  }

  return <LoginRedirect />;
};

export const MobileHeaderAction = () => {
  const { setOpened, opened } = useSidebar();
  const isOpen = opened ?? false;

  return (
    <div className="md:hidden relative">
      <Button
        variant="ghost"
        size="small"
        onClick={() => setOpened?.(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        Меню
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-30"
            onClick={() => setOpened?.(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-48 bg-white border rounded-lg shadow-lg z-40 animate-in fade-in slide-in-from-top-2 duration-200">
            <MobileHeaderLinks onClose={() => setOpened?.(false)} />
            <div className="border-t px-2 py-2">
              <MobileHeaderProfile />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
