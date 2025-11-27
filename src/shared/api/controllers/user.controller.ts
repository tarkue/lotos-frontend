import { BaseClient } from "../base/base.client";
import { MessageResponseDTO, UserResponseDTO } from "../dto/auth.dto";
import {
  ChangePasswordRequestDTO,
  UpdateProfileRequestDTO,
} from "../dto/user.dto";

export class UsersClient extends BaseClient {
  constructor(baseURL?: string) {
    super(baseURL);

    this.getMyProfile = this.getMyProfile.bind(this);
    this.updateMyProfile = this.updateMyProfile.bind(this);
    this.changePassword = this.changePassword.bind(this);
  }

  async getMyProfile(options?: {
    accessToken?: string;
  }): Promise<UserResponseDTO> {
    return await this.get(
      "/users/profile",
      options
        ? {
            headers: {
              Authorization: `Bearer ${options?.accessToken}`,
            },
          }
        : undefined
    );
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
