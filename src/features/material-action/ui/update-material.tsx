"use client";
import { MaterialType } from "@/src/shared/api/enum/material-type.enum";
import { Button } from "@/src/shared/ui/button";
import { useModals } from "@/src/shared/ui/modal";
import { MaterialActionProps } from "../models/material-action";
import { EditLectureForm } from "./edit-lecture-form";
import { EditPresentationForm } from "./edit-presentation-form";
import { EditVideoLessonForm } from "./edit-video-lesson-form";
import { EditTestForm } from "./edit-test-form";
import { Icon } from "@/src/shared/ui/icon";

export const UpdateMaterial: React.FC<MaterialActionProps> = ({
  material,
  courseId,
}) => {
  const { addModal } = useModals();

  const handleEdit = () => {
    if (!material.module) return;

    const moduleId = material.module.id;
    const courseIdNum = Number.parseInt(courseId);

    // Сначала проверяем наличие теста — он может быть у материала любого типа
    if (material.tests && material.tests.length > 0) {
      addModal({
        title: "Редактировать тест",
        maxWidth: "600px",
        fields: (
          <EditTestForm
            material={material}
            courseId={courseIdNum}
            moduleId={moduleId}
          />
        ),
      });
      return;
    }

    if (material.type === MaterialType.VIDEO) {
      addModal({
        title: "Изменить видеоурок",
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
    <Button variant="ghost" size="small" onClick={handleEdit}>
      <Icon glyph="change" color="dark-gray" size="20" />
    </Button>
  );
};
