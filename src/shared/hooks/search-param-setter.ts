import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useSearchParamSetter = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  return useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams?.toString());
      params.set(name, value);

      router.push(pathname + "?" + params.toString());
    },
    [searchParams, router, pathname]
  );
};
