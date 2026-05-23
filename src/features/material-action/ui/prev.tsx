import { Link } from "@/src/shared/ui/link";
import { MaterialActionProps } from "../models/material-action";
import { Button } from "@/src/shared/ui/button";
import { Icon } from "@/src/shared/ui/icon";
import { formatEndpoint } from "@/src/shared/libs/endpoint";
import { Endpoint } from "@/src/shared/models/endpoint-enum";

export const PrevMaterialAction = ({
  prevMaterial,
  courseId,
}: MaterialActionProps) => {
  const btn = (
    <Button variant="secondary" disabled={!prevMaterial}>
      <Icon glyph="arrow-left" color="black" size="20" />
      Назад
    </Button>
  );

  if (!prevMaterial) {
    return undefined;
  }

  return (
    <Link
      href={formatEndpoint(Endpoint.MATERIAL, [
        courseId,
        prevMaterial.module_id,
        prevMaterial.id,
      ])}
    >
      {btn}
    </Link>
  );
};
