import { Endpoint } from "@/src/shared/models/endpoint-enum";
import { TabModel } from "@/src/shared/ui/tab";

export const settingsTabBarElements: TabModel[] = [
  {
    title: "Информация",
    href: Endpoint.COURSE_SETTINGS_ABOUT,
  },
  {
    title: "Ученики",
    href: Endpoint.COURSE_SETTINGS_STUDENTS,
  },
  {
    title: "Заявки",
    href: Endpoint.COURSE_SETTINGS_APPLICATIONS,
  },
];
