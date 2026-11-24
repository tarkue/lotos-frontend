import { Endpoint } from "@/src/shared/models/endpoint-enum";
import { buttonVariants } from "@/src/shared/ui/button/variants";
import Link from "next/link";

export const ProfileRedirect = () => (
  <Link
    href={Endpoint.PROFILE}
    className={buttonVariants({
      variant: "ghost",
      size: "small",
      className: "min-h-11 justify-start md:min-h-0 md:justify-center",
    })}
  >
    Мой профиль
  </Link>
);
