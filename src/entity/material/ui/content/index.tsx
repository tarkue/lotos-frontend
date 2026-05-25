import { api } from "@/src/shared/api";
import { MaterialType } from "@/src/shared/api/enum/material-type.enum";
import { Typography } from "@/src/shared/ui/typography";
import { Material } from "../../models/material";
import { MaterialPresentationViewer } from "./content-viewers/presentation-viewer";
import { MaterialTextViewer } from "./content-viewers/text-viewer";
import { MaterialVideoViewer } from "./content-viewers/video-viewer";
import { cn } from "@/src/shared/libs/utils";
import { Suspense } from "react";
import { MaterialHomeWorkViewer } from "./content-viewers/homework-viewer";
import { HomeworkStudentItemResponseDTO } from "@/src/shared/api/exports";

export const MaterialContent = ({
  material,
  bodyAction,
  headerAction,
  courseId,
  moduleId,
  homework,
}: {
  material: Material;
  bodyAction?: React.ReactNode;
  headerAction?: React.ReactNode;
  courseId?: number;
  moduleId?: number;
  homework?: HomeworkStudentItemResponseDTO;
}) => {
  if (!material) {
    return <></>;
  }
  return (
    <section className="w-full flex flex-col gap-6 pb-4">
      <div className={"flex w-full items-center justify-between"}>
        {material.title && (
          <Typography.Heading
            className={cn("w-full", !headerAction && "text-center")}
          >
            {material.title}
          </Typography.Heading>
        )}
        {headerAction}
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
        {homework && courseId && moduleId && material.id && (
          <Suspense>
            <MaterialHomeWorkViewer homework={homework} />
          </Suspense>
        )}
        {bodyAction}
      </div>
    </section>
  );
};
