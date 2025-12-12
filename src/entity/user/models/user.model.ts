import { RoleType } from "@/src/shared/api/enum/role-type.enum";

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  patronymic?: string | null;
  group_name?: string | null;
  role_id?: RoleType;
  created_at?: string;
}

export interface UserProps {
  user: User;
}

export interface UserListProps {
  users: User[];
}
