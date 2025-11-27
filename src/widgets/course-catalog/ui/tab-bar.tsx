"use client";

import { useAuth } from "@/src/shared/api/context/auth-context";
import { Tab } from "@/src/shared/ui/tab";
import { Typography } from "@/src/shared/ui/typography";
import { useTabOptionsCourseCatalog } from "../libs/use-tab-options";
import { COURSE_CATALOG_TABS } from "../models/tabs";

export const CourseCatalogTabBar = ({ width }: { width?: `${string}px` }) => {
  const { isAuthenticated } = useAuth();
  const { defaultValue, onChange } = useTabOptionsCourseCatalog();

  return (
    <>
      {isAuthenticated && (
        <Tab.Map
          elements={COURSE_CATALOG_TABS}
          defaultValue={defaultValue}
          width={width}
          onChange={onChange}
        />
      )}{" "}
      {!isAuthenticated && (
        <Typography.H1 className="font-bold text-base-500" variant="secondary">
          Все курсы
        </Typography.H1>
      )}
    </>
  );
};
