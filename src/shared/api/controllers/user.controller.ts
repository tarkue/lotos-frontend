import { BaseClient } from "../base/base.client";
import { MessageResponseDTO, UserResponseDTO } from "../dto/auth.dto";
import {
  ChangePasswordRequestDTO,
  UpdateProfileRequestDTO,
} from "../dto/user.dto";

export class UsersClient extends BaseClient {
  constructor(baseURL?: string) {
    super(baseURL);
  }

  async getMyProfile(): Promise<UserResponseDTO> {
    return await this.get("/users/profile");
  }

  async updateMyProfile(
    data: UpdateProfileRequestDTO
  ): Promise<UserResponseDTO> {
    return await this.put("/users/me", data);
  }

  async changePassword(
    data: ChangePasswordRequestDTO
  ): Promise<MessageResponseDTO> {
    return await this.post("/users/me/change-password", data);
  }
}
