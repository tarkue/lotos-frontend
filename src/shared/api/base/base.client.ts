// clients/base-client.ts

import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { TokenPair, TokenStorage } from "../models/token.model";
import { CookieTokenStorage } from "../utils/cookie-store";

export class BaseClient {
  protected client: AxiosInstance;
  private tokenStorage: TokenStorage;
  private refreshPromise: Promise<string> | null = null;

  constructor(baseURL: string = "/api") {
    this.tokenStorage = new CookieTokenStorage();
    this.client = axios.create({
      baseURL,
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor to add auth token
    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = this.tokenStorage.getAccessToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor for token refresh
    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error) => {
        const originalRequest = error.config;

        // If error is 401 and we haven't tried to refresh yet
        if (error.response?.status === 401 && !originalRequest._retry) {
          if (this.refreshPromise) {
            // If refresh is already in progress, wait for it
            try {
              await this.refreshPromise;
              return this.client(originalRequest);
            } catch {
              this.handleAuthError();
              return Promise.reject(error);
            }
          }

          originalRequest._retry = true;

          try {
            await this.refreshToken();
            return this.client(originalRequest);
          } catch (refreshError) {
            this.handleAuthError();
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  private async refreshToken(): Promise<void> {
    if (this.refreshPromise) {
      await this.refreshPromise;
    }

    this.refreshPromise = new Promise(async (resolve, reject) => {
      try {
        const refreshToken = this.tokenStorage.getRefreshToken();

        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        // Используем базовый axios чтобы избежать рекурсивных интерцепторов
        const response = await axios.post<TokenPair>("/api/auth/refresh", {
          refresh_token: refreshToken,
        });

        this.tokenStorage.setTokens(response.data);
        resolve(response.data.access_token);
      } catch (error) {
        this.handleAuthError();
        reject(error);
      } finally {
        this.refreshPromise = null;
      }
    });

    await this.refreshPromise;
  }

  private handleAuthError(): void {
    this.tokenStorage.clearTokens();

    // Redirect to login page if we're in browser environment
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  }

  public setTokens(tokens: TokenPair): void {
    this.tokenStorage.setTokens(tokens);
  }

  public clearTokens(): void {
    this.tokenStorage.clearTokens();
  }

  public isAuthenticated(): boolean {
    return !!this.tokenStorage.getAccessToken();
  }

  protected async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.get(url, config);
    return response.data;
  }

  protected async post<TRequest, TResponse>(
    url: string,
    data?: TRequest,
    config?: AxiosRequestConfig
  ): Promise<TResponse> {
    const response: AxiosResponse<TResponse> = await this.client.post(
      url,
      data,
      config
    );
    return response.data;
  }

  protected async put<TRequest, TResponse>(
    url: string,
    data?: TRequest,
    config?: AxiosRequestConfig
  ): Promise<TResponse> {
    const response: AxiosResponse<TResponse> = await this.client.put(
      url,
      data,
      config
    );
    return response.data;
  }

  protected async patch<TRequest, TResponse>(
    url: string,
    data?: TRequest,
    config?: AxiosRequestConfig
  ): Promise<TResponse> {
    const response: AxiosResponse<TResponse> = await this.client.patch(
      url,
      data,
      config
    );
    return response.data;
  }

  protected async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.client.delete(url, config);
    return response.data;
  }
}
