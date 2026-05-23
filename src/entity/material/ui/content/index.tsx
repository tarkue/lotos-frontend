import { api } from "@/src/shared/api";
import { MaterialType } from "@/src/shared/api/enum/material-type.enum";
import { Typography } from "@/src/shared/ui/typography";
import { Material } from "../../models/material";
import { MaterialPresentationViewer } from "./content-viewers/presentation-viewer";
import { MaterialTextViewer } from "./content-viewers/text-viewer";
import { MaterialVideoViewer } from "./content-viewers/video-viewer";
import { cn } from "@/src/shared/libs/utils";

export const MaterialContent = ({
  material,
  action,
}: {
  material: Material;
  action?: React.ReactNode;
}) => {
  if (!material) {
    return <></>;
  }
  return (
    <section className="w-full flex flex-col gap-6 pb-4">
      <div className={"flex w-full items-center justify-between"}>
        {material.title && (
          <Typography.Heading className={cn(!action && "text-center")}>
            {material.title}
          </Typography.Heading>
        )}
        {action}
      </div>
      <div className="p-6 rounded-2xl bg-white w-full">
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
      </div>
    </section>
  );
};
