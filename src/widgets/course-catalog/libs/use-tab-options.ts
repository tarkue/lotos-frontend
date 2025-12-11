import { RoleType } from "@/src/shared/api/enum/role-type.enum";
import { TabModel } from "@/src/shared/ui/tab";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";
import {
  ADMIN_COURSE_CATALOG_TABS,
  STUDENT_COURSE_CATALOG_TABS,
  TEACHER_COURSE_CATALOG_TABS,
} from "../models/tabs";

export const getTabCatalogByRole = (role?: RoleType) => {
  switch (role) {
    case RoleType.TEACHER:
      return TEACHER_COURSE_CATALOG_TABS;
    case RoleType.ADMIN:
      return ADMIN_COURSE_CATALOG_TABS;
    default:
      return STUDENT_COURSE_CATALOG_TABS;
  }
};

export const useTabOptionsCourseCatalog = <T extends TabModel[]>(
  role?: RoleType
) => {
  const catalog = useMemo(() => getTabCatalogByRole(role), [role]);
  const elements = useMemo(() => catalog.map((el) => el.title), [catalog]);
  const router = useRouter();
  const pathname = usePathname();

  const defaultValue = useMemo(
    () =>
      pathname
        ? catalog.find((el) => el.href.startsWith(pathname))?.title
        : "Все курсы",
    [catalog, pathname]
  );

  const onChange = (value: T[number]["title"]) => {
    router.push(catalog.find((el) => el.title === value)!.href);
  };

  return { onChange, defaultValue, elements };
};
