"use client";
import { useAuth } from "@/src/shared/api/context/auth-context";
import { useMemo } from "react";
import { RoleLinksMap } from "./models";
import Link from "next/link";
import { Button } from "@/src/shared/ui/button";

export const HeaderLinks = () => {
  const { role } = useAuth();
  const links = useMemo(() => {
    if (role === undefined) return RoleLinksMap.unauthorized;
    return RoleLinksMap[role];
  }, [role]);
  return (
    <ul className="flex gap-4 w-full">
      {links.map((el, i) => (
        <li key={i}>
          <Link href={el.href}>
            <Button size="small" variant="ghost">
              {el.label}
            </Button>
          </Link>
        </li>
      ))}
    </ul>
  );
};
