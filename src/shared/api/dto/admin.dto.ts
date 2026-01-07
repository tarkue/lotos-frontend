import { RoleType } from "../enum/role-type.enum";

export interface CreateUserRequestDTO {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  patronymic?: string | null;
  group_name?: string | null;
  role: RoleType;
}

export interface UpdateUserRequestDTO {
  first_name?: string | null;
  last_name?: string | null;
  patronymic?: string | null;
  group_name?: string | null;
  role?: string | null;
}

export interface ChangeUserRoleRequestDTO {
  role: RoleType;
}

export interface UserListResponseDTO {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  patronymic?: string | null;
  group_name?: string | null;
  role_id: RoleType;
  created_at: string;
}

export interface PaginatedUsersResponseDTO {
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
  users: UserListResponseDTO[];
}

export interface StatisticsResponseDTO {
  total_users: number;
  total_students: number;
  total_teachers: number;
  total_courses: number;
  total_enrollments: number;
  total_applications_pending: number;
}
