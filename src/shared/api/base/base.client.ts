// clients/base-client.ts

import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { TokenPair, TokenStorage } from "../models/token.model";
import { CookieTokenStorage } from "../utils/cookie-store";

// Тип для элементов в очереди запросов
type QueueItem = {
  resolve: (value?: string | null | unknown) => void;
  reject: (error?: string | null | unknown) => void;
};

export class BaseClient {
  protected client: AxiosInstance;
  public tokenStorage: TokenStorage;
  private isRefreshing = false;
  private failedQueue: QueueItem[] = [];

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

  private processQueue(
    error: string | null | unknown,
    token: string | null = null
  ): void {
    this.failedQueue.forEach(({ resolve, reject }) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    });

    this.failedQueue = [];
  }

  private setupInterceptors(): void {
    // Request interceptor to add auth token
    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // Не добавляем токен для эндпоинтов аутентификации
        if (config.url?.includes("/auth/")) {
          return config;
        }

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

        // Пропускаем все не 401 ошибки и запросы на аутентификацию
        if (
          error.response?.status !== 401 ||
          originalRequest.url?.includes("/auth/") ||
          originalRequest._retry
        ) {
          return Promise.reject(error);
        }

        // Если уже обновляем токен - добавляем запрос в очередь
        if (this.isRefreshing) {
          return new Promise((resolve, reject) => {
            this.failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              if (originalRequest.headers && token) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
              }
              return this.client(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        this.isRefreshing = true;

        try {
          const refreshToken = this.tokenStorage.getRefreshToken();
          if (!refreshToken) {
            throw new Error("No refresh token");
          }

          // Создаем новый экземпляр axios для запроса обновления
          const refreshClient = axios.create({
            baseURL: this.client.defaults.baseURL,
          });

          const response = await refreshClient.post<TokenPair>(
            "/auth/refresh",
            {
              refresh_token: refreshToken,
            }
          );

          this.tokenStorage.setTokens(response.data);

          // Обрабатываем очередь запросов
          this.processQueue(null, response.data.access_token);
          this.isRefreshing = false;

          // Повторяем оригинальный запрос
          const token = this.tokenStorage.getAccessToken();
          if (token && originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }
          return this.client(originalRequest);
        } catch (refreshError) {
          this.processQueue(refreshError, null);
          this.isRefreshing = false;
          this.handleAuthError();
          return Promise.reject(error);
        }
      }
    );
  }

  private handleAuthError(): void {
    this.clearTokens();
    // Не делаем автоматический редирект здесь - пусть компоненты решают сами
    console.warn("Authentication error - tokens cleared");
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
