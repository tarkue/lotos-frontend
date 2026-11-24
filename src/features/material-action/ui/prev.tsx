import { formatEndpoint } from "@/src/shared/libs/endpoint";
import { Endpoint } from "@/src/shared/models/endpoint-enum";
import { buttonVariants } from "@/src/shared/ui/button/variants";
import { Icon } from "@/src/shared/ui/icon";
import { Link } from "@/src/shared/ui/link";
import { MaterialNavigationProps } from "../models/material-action";

export const PrevMaterialAction = ({
  prevMaterial,
  courseId,
  moduleId,
}: MaterialNavigationProps) => {
  if (!prevMaterial) return null;

  return (
    <Link
      href={formatEndpoint(Endpoint.MATERIAL, [
        courseId,
        moduleId,
        prevMaterial.id,
      ])}
      className={buttonVariants({ variant: "secondary" })}
    >
      <Icon glyph="arrow-left" color="black" size="20" />
      Назад
    </Link>
  );
};
