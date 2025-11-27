import { cookies } from "next/headers";
import { api } from "../api";
import { GetTokenPairFromCookieOrThrow } from "./cookie";

export async function sfwr<R, T extends unknown[]>(
  fn: (...args: [...T, { accessToken?: string }?]) => Promise<R>,
  ...args: T
): Promise<R> {
  const cookieStore = await cookies();
  const tokenPair = GetTokenPairFromCookieOrThrow(cookieStore);

  const callWithToken = (token: string) => fn(...args, { accessToken: token });

  try {
    return await callWithToken(tokenPair.access_token);
  } catch {
    const tokens = await api.auth.forceRefreshToken(tokenPair);
    return await callWithToken(tokens.access_token);
  }
}
