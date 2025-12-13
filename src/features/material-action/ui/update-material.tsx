"use client";
import { MaterialType } from "@/src/shared/api/enum/material-type.enum";
import { Button } from "@/src/shared/ui/button";
import { useModals } from "@/src/shared/ui/modal";
import { MaterialActionProps } from "../models/material-action";
import { EditLectureForm } from "./edit-lecture-form";
import { EditPresentationForm } from "./edit-presentation-form";
import { EditVideoLessonForm } from "./edit-video-lesson-form";

export const UpdateMaterial: React.FC<MaterialActionProps> = ({
  material,
  courseId,
}) => {
  const { addModal } = useModals();

  const handleEdit = () => {
    if (!material.module) return;

    const moduleId = material.module.id;
    const courseIdNum = Number.parseInt(courseId);

    if (material.type === MaterialType.VIDEO) {
      addModal({
        title: "Изменить видео-урок",
        fields: (
          <EditVideoLessonForm
            material={material}
            courseId={courseIdNum}
            moduleId={moduleId}
          />
        ),
      });
    } else if (material.type === MaterialType.TEXT) {
      addModal({
        title: "Изменить лекцию",
        fields: (
          <EditLectureForm
            material={material}
            courseId={courseIdNum}
            moduleId={moduleId}
          />
        ),
      });
    } else if (material.type === MaterialType.PRESENTATION) {
      addModal({
        title: "Изменить презентацию",
        fields: (
          <EditPresentationForm
            material={material}
            courseId={courseIdNum}
            moduleId={moduleId}
          />
        ),
      });
    }
  };

  return (
    <Button variant="primary" size="large" onClick={handleEdit}>
      Изменить урок
    </Button>
  );
};
