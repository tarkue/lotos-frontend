import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export const GetTokenPairFromCookie = (cookieStore: ReadonlyRequestCookies) => {
  const accessToken = cookieStore.get("access_token")?.value;
  const refreshToken = cookieStore.get("refresh_token")?.value;
  return accessToken && refreshToken
    ? {
        access_token: accessToken,
        refresh_token: refreshToken,
      }
    : undefined;
};
