"use client";

import { useAuth } from "@/src/shared/api/context/auth-context";
import { RoleType } from "@/src/shared/api/exports";
import { Endpoint } from "@/src/shared/models/endpoint-enum";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminPage() {
  const { role, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (role === RoleType.ADMIN) {
      router.push(Endpoint.ADMINISTRATION_TEACHERS);
    } else {
      router.push(Endpoint.ALL_COURSES);
    }
  }, [role, isLoading, router]);

  return <div>Загрузка...</div>;
}
