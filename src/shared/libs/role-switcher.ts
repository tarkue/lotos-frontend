import { RoleType } from "../api/enum/role-type.enum";

export function roleSwitcher<S, T, A, D>(
  role: string | undefined,
  {
    student,
    teacher,
    admin,
    unauthorized,
  }: {
    student?: () => S;
    teacher?: () => T;
    admin?: () => A;
    unauthorized: () => D;
  }
) {
  switch (role) {
    case RoleType.TEACHER.toString():
      return teacher!();
    case RoleType.ADMIN.toString():
      return admin!();
    case RoleType.STUDENT.toString():
      return student!();
    default:
      return unauthorized();
  }
}
