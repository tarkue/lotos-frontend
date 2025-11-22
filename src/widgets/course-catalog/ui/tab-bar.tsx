"use client";
import { Tab } from "@/src/shared/ui/tab";
import { Typography } from "@/src/shared/ui/typography";
import { useTabOptionsCourseCatalog } from "../libs/use-tab-options";
import { COURSE_CATALOG_TABS } from "../models/tabs";

export const CourseCatalogTabBar = () => {
  const { isAuthorized } = { isAuthorized: false };
  const { defaultValue, onChange } = useTabOptionsCourseCatalog();

  return (
    <>
      {isAuthorized && (
        <Tab.Map
          elements={COURSE_CATALOG_TABS}
          defaultValue={defaultValue}
          className="max-w-58"
          onChange={onChange}
        />
      )}{" "}
      {!isAuthorized && (
        <Typography.H1 className="font-bold text-base-500" variant="secondary">
          Все курсы
        </Typography.H1>
      )}
    </>
  );
};
