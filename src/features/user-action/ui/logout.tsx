"use client";
import { api } from "@/src/shared/api";
import {
  deleteClientSideCookie,
  getClientSideCookie,
} from "@/src/shared/libs/cookie";
import { Endpoint } from "@/src/shared/models/endpoint-enum";
import { Button } from "@/src/shared/ui/button";
import { useRouter } from "next/navigation";

export const Logout = () => {
  const router = useRouter();
  const handle = async () => {
    const refresh_token = getClientSideCookie("refresh_token");

    if (refresh_token) {
      await api.auth.logout({ refresh_token });
    } else {
      deleteClientSideCookie("access_token");
    }
    router.push(Endpoint.LOGIN);
  };
  return (
    <Button variant="ghost" size="large" onClick={handle}>
      Выйти из аккаунта
    </Button>
  );
};
