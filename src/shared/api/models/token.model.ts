export interface TokenPair {
  access_token: string;
  refresh_token: string;
  token_type?: string;
}

export interface TokenStorage {
  getAccessToken(): string | null;
  getRefreshToken(): string | null;
  setTokens(tokens: TokenPair): void;
  clearTokens(): void;
}
