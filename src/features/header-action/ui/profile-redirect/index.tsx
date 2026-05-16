import { Endpoint } from "@/src/shared/models/endpoint-enum";
import { Button } from "@/src/shared/ui/button";
import Link from "next/link";

export const ProfileRedirect = () => (
  <Link href={Endpoint.PROFILE}>
    <Button variant="ghost" size="small">
      Мой профиль
    </Button>
  </Link>
);
