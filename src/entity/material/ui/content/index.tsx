import { MaterialType } from "@/src/shared/api/enum/material-type.enum";
import { Typography } from "@/src/shared/ui/typography";
import { Material } from "../../models/material";
import { MaterialTextViewer } from "./content-viewers/text-viewer";

export const MaterialContent = ({ material }: { material: Material }) => {
  if (!material) {
    return <></>;
  }
  return (
    <section className="w-full min-h-full flex flex-col gap-6">
      {material.title && <Typography.H1>{material.title}</Typography.H1>}
      {material.type === MaterialType.VIDEO && material.content_url && <></>}
      {material.type === MaterialType.PRESENTATION && material.content_url && (
        <></>
      )}
      {material.type === MaterialType.DOCUMENT && material.text_content && (
        <MaterialTextViewer content={material.text_content} />
      )}
      {material.type === MaterialType.TEXT && material.text_content && (
        <MaterialTextViewer content={material.text_content} />
      )}
    </section>
  );
};
