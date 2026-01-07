import { Endpoint } from "@/src/shared/models/endpoint-enum";
import { TabModel } from "@/src/shared/ui/tab";

export const STUDENT_COURSE_CATALOG_TABS: TabModel[] = [
  {
    title: "Все курсы",
    href: Endpoint.ALL_COURSES,
  },
  {
    title: "Мои курсы",
    href: Endpoint.MY_COURSES,
  },
] as const;

export const TEACHER_COURSE_CATALOG_TABS: TabModel[] = [
  {
    title: "Все курсы",
    href: Endpoint.ALL_COURSES,
  },
  {
    title: "Созданные курсы",
    href: Endpoint.CREATED_COURSES,
  },
] as const;

export const ADMIN_COURSE_CATALOG_TABS: TabModel[] = [
  {
    title: "Все курсы",
    href: Endpoint.ALL_COURSES,
  },
  {
    title: "Преподаватели",
    href: Endpoint.TEACHERS,
  },
] as const;
