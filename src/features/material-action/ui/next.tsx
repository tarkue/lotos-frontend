import { Link } from "@/src/shared/ui/link";
import { MaterialActionProps } from "../models/material-action";
import { Button } from "@/src/shared/ui/button";
import { Icon } from "@/src/shared/ui/icon";
import { formatEndpoint } from "@/src/shared/libs/endpoint";
import { Endpoint } from "@/src/shared/models/endpoint-enum";

export const NextMaterialAction = ({
  nextMaterial,
  courseId,
}: MaterialActionProps) => {
  console.log(nextMaterial);
  const btn = (
    <Button disabled={!nextMaterial}>
      Дальше
      <Icon glyph="arrow-right" color="white" size="20" />
    </Button>
  );

  if (!nextMaterial) {
    return undefined;
  }

  return (
    <Link
      href={formatEndpoint(Endpoint.MATERIAL, [
        courseId,
        nextMaterial.module_id,
        nextMaterial.id,
      ])}
    >
      {btn}
    </Link>
  );
};
