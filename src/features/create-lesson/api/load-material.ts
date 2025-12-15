import { api } from "@/src/shared/api";

export const loadMaterials = (courseId: number, moduleId: number) => {
  return async (search: string) => {
    return (await api.teacher.getModule(courseId, moduleId)).materials
      .filter((material) =>
        material.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      )
      .map((material) => ({
        value: material.id,
        label: material.title,
      }));
  };
};
