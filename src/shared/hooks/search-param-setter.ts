import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useSearchParamSetter = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  return useCallback(
    (name: string, value: string, resetParam?: string) => {
      if (!pathname) return;

      const params = new URLSearchParams(searchParams?.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      if (resetParam) {
        params.delete(resetParam);
      }

      const query = params.toString();
      router.push(query ? `${pathname}?${query}` : pathname);
    },
    [searchParams, router, pathname]
  );
};
