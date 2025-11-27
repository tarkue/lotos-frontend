import axios from "axios";
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
    // Используем базовый axios для логина, чтобы избежать интерцепторов
    const response = await axios.post<TokenResponseDTO>(
      `${this.client.defaults.baseURL}/auth/login`,
      data
    );
    this.setTokens(response.data);
    return response.data;
  }

  async forceRefreshToken(
    data: RefreshTokenRequestDTO
  ): Promise<TokenResponseDTO> {
    const response = await this.post<RefreshTokenRequestDTO, TokenResponseDTO>(
      "/auth/refresh",
      data
    );
    this.setTokens({ ...response, refresh_token: data.refresh_token });
    return response;
  }

  async logout(data: RefreshTokenRequestDTO): Promise<MessageResponseDTO> {
    try {
      const response = await this.post<
        RefreshTokenRequestDTO,
        MessageResponseDTO
      >("/auth/logout", data);
      return response;
    } finally {
      this.clearTokens();
    }
  }
}
