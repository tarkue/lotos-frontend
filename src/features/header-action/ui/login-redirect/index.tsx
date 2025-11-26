import { Endpoint } from "@/src/shared/models/endpoint-enum";
import { Button } from "@/src/shared/ui/button";
import Link from "next/link";

export const LoginRedirect = () => (
  <Link href={Endpoint.LOGIN}>
    <Button size="large" variant="primary">
      Вход
    </Button>
  </Link>
);
