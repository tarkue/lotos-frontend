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
