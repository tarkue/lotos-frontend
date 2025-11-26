"use client";

import { useAuth } from "@/src/shared/api/context/auth-context";
import { Tab } from "@/src/shared/ui/tab";
import { Typography } from "@/src/shared/ui/typography";
import { useTabOptionsCourseCatalog } from "../libs/use-tab-options";
import { COURSE_CATALOG_TABS } from "../models/tabs";

export const CourseCatalogTabBar = () => {
  const { isAuthenticated } = useAuth();
  const { defaultValue, onChange } = useTabOptionsCourseCatalog();

  return (
    <>
      {isAuthenticated && (
        <Tab.Map
          elements={COURSE_CATALOG_TABS}
          defaultValue={defaultValue}
          className="max-w-58"
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
