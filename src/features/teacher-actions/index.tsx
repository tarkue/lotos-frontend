import { AddToCourse } from "./ui/add-to-course";
import { Create } from "./ui/create";
import { SetRoleStudent } from "./ui/set-role-student";

export { generateDeleteFromCourse } from "./teacher-delete";

export const TeacherAction = Object.assign(
  {},
  {
    Create,
    AddToCourse,
    SetRoleStudent,
  }
);
