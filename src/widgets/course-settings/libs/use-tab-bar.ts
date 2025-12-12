"use client";
import { Course } from "@/src/entity/course";
import { formatEndpoint } from "@/src/shared/libs/endpoint";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";
import { settingsTabBarElements } from "../models/tab-bar-elements";

export const useSettingsTabBar = (course: Course) => {
  const pathname = usePathname();
  const router = useRouter();
  const elements = useMemo(
    () => settingsTabBarElements.map((el) => el.title),
    []
  );
  const splittedPath = pathname ? pathname.split("/") : null;
  const endPath = splittedPath ? splittedPath[splittedPath.length - 1] : "";

  const defaultValue = useMemo(
    () => settingsTabBarElements.find((el) => el.href.endsWith(endPath))?.title,
    [endPath]
  );

  const onChange = (el: string) => {
    const link = settingsTabBarElements.find((tab) => tab.title === el)?.href;
    if (link !== undefined) {
      router.push(formatEndpoint(link, [course.id]));
    }
  };

  return { defaultValue, elements, onChange };
};
