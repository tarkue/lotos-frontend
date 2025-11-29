import { api } from "@/src/shared/api";
import { MaterialType } from "@/src/shared/api/enum/material-type.enum";
import { Typography } from "@/src/shared/ui/typography";
import { Material } from "../../models/material";
import { MaterialPresentationViewer } from "./content-viewers/presentation-viewer";
import { MaterialTextViewer } from "./content-viewers/text-viewer";
import { MaterialVideoViewer } from "./content-viewers/video-viewer";

export const MaterialContent = ({ material }: { material: Material }) => {
  if (!material) {
    return <></>;
  }
  return (
    <section className="w-full min-h-full h-max flex flex-col gap-6 pb-4">
      {material.title && <Typography.H1>{material.title}</Typography.H1>}
      {material.type === MaterialType.VIDEO &&
        material.files &&
        material.files.length > 0 && (
          <MaterialVideoViewer
            url={api.getFile(material.files[0].file.file_url)}
            transcript={material.transcript}
          />
        )}
      {material.type === MaterialType.PRESENTATION && material.files && (
        <MaterialPresentationViewer presentations={material.files} />
      )}
      {material.type === MaterialType.TEXT && material.text_content && (
        <MaterialTextViewer content={material.text_content} />
      )}
    </section>
  );
};
