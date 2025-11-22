import { BaseClient } from "../base/base.client";
import {
  LoginRequestDTO,
  MessageResponseDTO,
  RefreshTokenRequestDTO,
  RegisterRequestDTO,
  TokenResponseDTO,
  UserResponseDTO,
} from "../dto/auth.dto";

export class AuthClient extends BaseClient {
  constructor(baseURL?: string) {
    super(baseURL);
  }

  async register(data: RegisterRequestDTO): Promise<UserResponseDTO> {
    return await this.post("/auth/register", data);
  }

  async login(data: LoginRequestDTO): Promise<TokenResponseDTO> {
    const response = await this.post<LoginRequestDTO, TokenResponseDTO>(
      "/auth/login",
      data
    );
    this.setToken(response.access_token);
    return response;
  }

  async refreshToken(
    data: RefreshTokenRequestDTO
  ): Promise<Record<string, string>> {
    return await this.post("/auth/refresh", data);
  }

  async logout(data: RefreshTokenRequestDTO): Promise<MessageResponseDTO> {
    const response = await this.post<
      RefreshTokenRequestDTO,
      MessageResponseDTO
    >("/auth/logout", data);
    this.clearToken();
    return response;
  }
}
