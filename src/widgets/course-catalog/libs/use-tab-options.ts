import { Endpoint } from "@/src/shared/models/endpoint-enum";
import { usePathname, useRouter } from "next/navigation";
import { COURSE_CATALOG_TABS } from "../models/tabs";

type COURSE_CATALOG_KEY = (typeof COURSE_CATALOG_TABS)[number];

export const useTabOptionsCourseCatalog = () => {
  const router = useRouter();
  const pathname = usePathname();
  const defaultValue: COURSE_CATALOG_KEY =
    pathname !== null && pathname.endsWith("all")
      ? COURSE_CATALOG_TABS[0]
      : COURSE_CATALOG_TABS[1];

  const onChange = (value: COURSE_CATALOG_KEY) => {
    if (value === COURSE_CATALOG_TABS[0]) {
      router.push(Endpoint.ALL_COURSES);
    } else if (value === COURSE_CATALOG_TABS[1]) {
      router.push(Endpoint.MY_COURSES);
    }
  };

  return { onChange, defaultValue };
};
