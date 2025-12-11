import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export const GetTokenPairFromCookieOrThrow = (
  cookieStore: ReadonlyRequestCookies
) => {
  const accessToken = cookieStore.get("access_token")?.value;
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (accessToken === undefined && refreshToken === undefined) {
    throw new Error("not found tokens!");
  }

  return {
    access_token: accessToken as string,
    refresh_token: refreshToken as string,
  };
};

export const getClientSideCookie = (name: string): string | undefined => {
  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))
    ?.split("=")[1];

  return cookieValue;
};

export function deleteClientSideCookie(name: string) {
  const { path = "/", domain = "", secure = false, sameSite = "" } = {};

  let cookieString = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;

  if (path) cookieString += `; path=${path}`;
  if (domain) cookieString += `; domain=${domain}`;
  if (secure) cookieString += "; secure";
  if (sameSite) cookieString += `; samesite=${sameSite}`;

  document.cookie = cookieString;
}

type CookieOptions = {
  expires?: number | Date | string; // Срок действия (дни, дата, строка GMT)
  path?: string; // Путь
  domain?: string; // Домен
  secure?: boolean; // Только HTTPS
  sameSite?: "Strict" | "Lax" | "None"; // SameSite политика
};

/**
 * Устанавливает cookie с заданным именем, значением и опциями
 * @param name - Имя cookie
 * @param value - Значение cookie
 * @param options - Опции cookie
 */
export function setCookie(
  name: string,
  value: string,
  options: CookieOptions = {}
): void {
  const {
    expires,
    path = "/",
    domain,
    secure = false,
    sameSite = "Lax",
  } = options;

  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  // Обработка срока действия
  if (expires) {
    let expiresDate: Date | null = null;

    if (typeof expires === "number") {
      // Число дней
      expiresDate = new Date();
      expiresDate.setDate(expiresDate.getDate() + expires);
    } else if (expires instanceof Date) {
      // Объект Date
      expiresDate = expires;
    } else if (typeof expires === "string") {
      // Строка в формате GMT
      expiresDate = new Date(expires);
    }

    if (expiresDate && !isNaN(expiresDate.getTime())) {
      cookieString += `; expires=${expiresDate.toUTCString()}`;
    }
  }

  // Добавление остальных параметров
  if (path) cookieString += `; path=${path}`;
  if (domain) cookieString += `; domain=${domain}`;
  if (secure) cookieString += "; secure";
  if (sameSite) cookieString += `; samesite=${sameSite}`;

  document.cookie = cookieString;
}
