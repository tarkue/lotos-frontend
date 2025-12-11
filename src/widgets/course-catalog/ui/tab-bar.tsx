"use client";

import { useAuth } from "@/src/shared/api/context/auth-context";
import { Tab } from "@/src/shared/ui/tab";
import { Typography } from "@/src/shared/ui/typography";
import { useTabOptionsCourseCatalog } from "../libs/use-tab-options";

export const CourseCatalogTabBar = ({ width }: { width?: `${string}px` }) => {
  const { isAuthenticated, role } = useAuth();
  const { defaultValue, onChange, elements } = useTabOptionsCourseCatalog(role);

  return (
    <>
      {isAuthenticated && (
        <Tab.Map
          elements={elements}
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
