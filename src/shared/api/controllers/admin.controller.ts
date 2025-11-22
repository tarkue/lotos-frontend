import { BaseClient } from "../base/base.client";
import {
  ChangeUserRoleRequestDTO,
  CreateUserRequestDTO,
  PaginatedUsersResponseDTO,
  StatisticsResponseDTO,
  UpdateUserRequestDTO,
  UserListResponseDTO,
} from "../dto/admin.dto";
import { MessageResponseDTO } from "../dto/auth.dto";
import { PaginationParams } from "../dto/common.dto";
import { RoleType } from "../enum/role-type.enum";

export interface AdminUsersParams extends PaginationParams {
  role?: RoleType | null;
  search?: string | null;
}

export class AdminClient extends BaseClient {
  constructor(baseURL?: string) {
    super(baseURL);
  }

  async createUser(data: CreateUserRequestDTO): Promise<UserListResponseDTO> {
    return await this.post("/admin/users", data);
  }

  async getUsers(
    params?: AdminUsersParams
  ): Promise<PaginatedUsersResponseDTO> {
    return await this.get<PaginatedUsersResponseDTO>("/admin/users", {
      params,
    });
  }

  async getUser(userId: number): Promise<UserListResponseDTO> {
    return await this.get<UserListResponseDTO>(`/admin/users/${userId}`);
  }

  async updateUser(
    userId: number,
    data: UpdateUserRequestDTO
  ): Promise<UserListResponseDTO> {
    return await this.put(`/admin/users/${userId}`, data);
  }

  async deleteUser(userId: number): Promise<MessageResponseDTO> {
    return await this.delete<MessageResponseDTO>(`/admin/users/${userId}`);
  }

  async changeUserRole(
    userId: number,
    data: ChangeUserRoleRequestDTO
  ): Promise<UserListResponseDTO> {
    return await this.patch(`/admin/users/${userId}/role`, data);
  }

  async getStatistics(): Promise<StatisticsResponseDTO> {
    return await this.get("/admin/statistics");
  }
}
