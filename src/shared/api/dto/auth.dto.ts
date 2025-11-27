import { RoleType } from "../enum/role-type.enum";

export interface RegisterRequestDTO {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  patronymic?: string | null;
  group_name?: string | null;
}

export interface LoginRequestDTO {
  email: string;
  password: string;
}

export interface RefreshTokenRequestDTO {
  refresh_token: string;
}

export interface TokenResponseDTO {
  access_token: string;
  refresh_token: string;
  token_type?: string;
}

export interface UserResponseDTO {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  patronymic?: string | null;
  group_name?: string | null;
  role_id: RoleType;
  created_at: string;
}

export interface MessageResponseDTO {
  message: string;
}
