import { formatEndpoint } from "@/src/shared/libs/endpoint";
import { Endpoint } from "@/src/shared/models/endpoint-enum";
import { buttonVariants } from "@/src/shared/ui/button/variants";
import { Icon } from "@/src/shared/ui/icon";
import { Link } from "@/src/shared/ui/link";
import { MaterialNavigationProps } from "../models/material-action";

export const NextMaterialAction = ({
  nextMaterial,
  courseId,
  moduleId,
}: MaterialNavigationProps) => {
  if (!nextMaterial) return null;

  return (
    <Link
      href={formatEndpoint(Endpoint.MATERIAL, [
        courseId,
        moduleId,
        nextMaterial.id,
      ])}
      className={buttonVariants({ variant: "primary", className: "ml-auto" })}
    >
      Дальше
      <Icon glyph="arrow-right" color="white" size="20" />
    </Link>
  );
};
