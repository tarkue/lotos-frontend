import { usePathname, useRouter } from "next/navigation";
import { COURSE_CATALOG_TABS } from "../models/tabs";

type COURSE_CATALOG_KEY = (typeof COURSE_CATALOG_TABS)[number];
export const useTabOptionsCourseCatalog = () => {
  const router = useRouter();
  const pathname = usePathname();
  const defaultValue: COURSE_CATALOG_KEY =
    pathname !== null && pathname.endsWith("all") ? "Все курсы" : "Твои курсы";

  const onChange = (value: COURSE_CATALOG_KEY) => {
    if (value === "Все курсы") {
      router.push("/catalog/all");
    } else if (value === "Твои курсы") {
      router.push("/catalog/my");
    }
  };

  return { onChange, defaultValue };
};
