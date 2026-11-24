"use client";
import { useAuth } from "@/src/shared/api/context/auth-context";
import { useMemo } from "react";
import { RoleLinksMap } from "./models";
import Link from "next/link";
import { buttonVariants } from "@/src/shared/ui/button/variants";

export const HeaderLinks = () => {
  const { role } = useAuth();
  const links = useMemo(() => {
    if (role === undefined) return RoleLinksMap.unauthorized;
    return RoleLinksMap[role];
  }, [role]);
  return (
    <ul className="flex w-full flex-col gap-1 md:w-auto md:flex-row md:gap-4">
      {links.map((el, i) => (
        <li key={i}>
          <Link
            href={el.href}
            className={buttonVariants({
              size: "small",
              variant: "ghost",
              className: "min-h-11 justify-start md:min-h-0 md:justify-center",
            })}
          >
            {el.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};
