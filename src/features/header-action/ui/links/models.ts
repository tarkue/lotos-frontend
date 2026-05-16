import { RoleType } from "@/src/shared/api/exports";
import { Endpoint } from "@/src/shared/models/endpoint-enum";

const UNAUTHORIZED_LINKS = [
  {
    label: "Каталог курсов",
    href: Endpoint.ALL_COURSES,
  },
] as const;

const STUDENT_LINKS = [
  ...UNAUTHORIZED_LINKS,
  {
    label: "Мои курсы",
    href: Endpoint.MY_COURSES,
  },
] as const;

const TEACHER_LINKS = STUDENT_LINKS;

const ADMIN_LINKS = [
  ...TEACHER_LINKS,
  {
    label: "Управление",
    href: Endpoint.ADMINISTRATION,
  },
] as const;

export const RoleLinksMap = {
  unauthorized: UNAUTHORIZED_LINKS,
  [RoleType.STUDENT]: STUDENT_LINKS,
  [RoleType.TEACHER]: TEACHER_LINKS,
  [RoleType.ADMIN]: ADMIN_LINKS,
} as const;
