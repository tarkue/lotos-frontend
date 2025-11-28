import { Typography } from "@/src/shared/ui/typography";
import { Module } from "../../models/module";

export const CardRight = ({ module }: { module: Module }) => (
  <Typography.Body className="px-[14px] py-[3px] text-base-500 bg-base-200 rounded-[16px] ">
    {module.completed_materials}/{module.total_materials}
  </Typography.Body>
);
