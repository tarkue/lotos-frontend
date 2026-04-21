"use client";
import { useAuth } from "@/src/shared/api/context/auth-context";
import { Endpoint } from "@/src/shared/models/endpoint-enum";
import { Button } from "@/src/shared/ui/button";
import { useRouter } from "next/navigation";

export const Logout = () => {
  const router = useRouter();
  const { logout } = useAuth();

  const handle = async () => {
    await logout();
    router.push(Endpoint.LOGIN);
  };

  return (
    <Button variant="ghost" size="large" onClick={handle}>
      Выйти из аккаунта
    </Button>
  );
};
