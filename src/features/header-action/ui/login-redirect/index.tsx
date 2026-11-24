import { Endpoint } from "@/src/shared/models/endpoint-enum";
import { buttonVariants } from "@/src/shared/ui/button/variants";
import Link from "next/link";

export const LoginRedirect = () => (
  <Link
    href={Endpoint.LOGIN}
    className={buttonVariants({
      variant: "ghost",
      size: "small",
      className: "min-h-11 justify-start md:min-h-0 md:justify-center",
    })}
  >
    Вход
  </Link>
);
