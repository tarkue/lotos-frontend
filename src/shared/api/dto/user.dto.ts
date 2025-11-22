export interface UpdateProfileRequestDTO {
  first_name: string;
  last_name: string;
  patronymic?: string | null;
  group_name?: string | null;
}

export interface ChangePasswordRequestDTO {
  old_password: string;
  new_password: string;
}
