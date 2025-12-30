"use client";
import { Course } from "@/src/entity/course";
import { useAuth } from "@/src/shared/api/context/auth-context";
import { RoleType } from "@/src/shared/api/enum/role-type.enum";
import { formatEndpoint } from "@/src/shared/libs/endpoint";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";
import {
  settingsAdminTabBarElements,
  settingsTeacherTabBarElements,
} from "../models/tab-bar-elements";

export const useSettingsTabBar = (course: Course) => {
  const pathname = usePathname();
  const router = useRouter();
  const { role } = useAuth();

  const tabBarElements =
    role === RoleType.ADMIN
      ? settingsAdminTabBarElements
      : settingsTeacherTabBarElements;

  const elements = useMemo(
    () => tabBarElements.map((el) => el.title),
    [tabBarElements]
  );
  const splittedPath = pathname ? pathname.split("/") : null;
  const endPath = splittedPath ? splittedPath[splittedPath.length - 1] : "";

  const defaultValue = useMemo(
    () => tabBarElements.find((el) => el.href.endsWith(endPath))?.title,
    [endPath, tabBarElements]
  );

  const onChange = (el: string) => {
    const link = tabBarElements.find((tab) => tab.title === el)?.href;
    if (link !== undefined) {
      router.push(formatEndpoint(link, [course.id]));
    }
  };

  return { defaultValue, elements, onChange };
};
