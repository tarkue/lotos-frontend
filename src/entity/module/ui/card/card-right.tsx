import { Icon } from "@/src/shared/ui/icon";
import { Typography } from "@/src/shared/ui/typography";
import { Module } from "../../models/module";

export const CardRight = ({ module }: { module: Module }) =>
  module.is_locked ? (
    <Typography.Body className="px-[14px] py-[3px] text-base-500 bg-base-200 rounded-[16px] ">
      {null}/{module.materials?.length ?? 0}
    </Typography.Body>
  ) : (
    <Icon glyph="lock" />
  );
