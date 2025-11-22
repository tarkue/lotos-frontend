import { TokenPair, TokenStorage } from "../models/token.model";

export class CookieTokenStorage implements TokenStorage {
  private readonly ACCESS_TOKEN_KEY = "access_token";
  private readonly REFRESH_TOKEN_KEY = "refresh_token";
  private readonly TOKEN_TYPE_KEY = "token_type";

  // Для серверной части
  private getCookies() {
    if (typeof window === "undefined") {
      // Серверный рендеринг - возвращаем пустой объект
      return {};
    }
    return document.cookie.split(";").reduce((cookies, cookie) => {
      const [name, value] = cookie.trim().split("=");
      cookies[name] = decodeURIComponent(value);
      return cookies;
    }, {} as Record<string, string>);
  }

  // Для установки cookies
  private setCookie(name: string, value: string, days?: number) {
    if (typeof window === "undefined") return;

    let cookie = `${name}=${encodeURIComponent(
      value
    )}; path=/; samesite=strict`;

    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      cookie += `; expires=${date.toUTCString()}`;
    }

    if (process.env.NODE_ENV === "production") {
      cookie += "; secure";
    }

    document.cookie = cookie;
  }

  // Для удаления cookies
  private removeCookie(name: string) {
    if (typeof window === "undefined") return;
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  }

  getAccessToken(): string | null {
    const cookies = this.getCookies();
    return cookies[this.ACCESS_TOKEN_KEY] || null;
  }

  getRefreshToken(): string | null {
    const cookies = this.getCookies();
    return cookies[this.REFRESH_TOKEN_KEY] || null;
  }

  getTokenType(): string {
    const cookies = this.getCookies();
    return cookies[this.TOKEN_TYPE_KEY] || "bearer";
  }

  setTokens(tokens: TokenPair): void {
    const { access_token, refresh_token, token_type = "bearer" } = tokens;

    // Access token - expires in 15 minutes (0.0104 дня)
    this.setCookie(this.ACCESS_TOKEN_KEY, access_token, 0.0104);

    // Refresh token - expires in 7 days
    this.setCookie(this.REFRESH_TOKEN_KEY, refresh_token, 7);

    this.setCookie(this.TOKEN_TYPE_KEY, token_type, 7);
  }

  clearTokens(): void {
    this.removeCookie(this.ACCESS_TOKEN_KEY);
    this.removeCookie(this.REFRESH_TOKEN_KEY);
    this.removeCookie(this.TOKEN_TYPE_KEY);
  }
}
