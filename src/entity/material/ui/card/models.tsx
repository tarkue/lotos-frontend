import { MaterialType } from "@/src/shared/api/exports";
import { glyphs } from "@/src/shared/ui/icon/props";

export const MaterialTypeIconGlyphMap: Record<MaterialType, glyphs> = {
  [MaterialType.DOCUMENT]: "presentation",
  [MaterialType.HOMEWORK]: "homework",
  [MaterialType.PRESENTATION]: "presentation",
  [MaterialType.TEXT]: "text",
  [MaterialType.VIDEO]: "video",
};
