import { HomeWorkTagProps } from "./props";
import { glyphs, IconProps } from "@/src/shared/ui/icon/props";

type TagVariantString = NonNullable<HomeWorkTagProps["variant"]>;
type TagIcon = {
  glyph: glyphs;
  color: NonNullable<IconProps["color"]>;
  text: string;
};

export const tagContentMap: Record<TagVariantString, TagIcon> = {
  reject: {
    color: "red",
    glyph: "close",
    text: "Просрочено",
  },
  pending: {
    color: "yellow",
    glyph: "time",
    text: "На проверке",
  },
  resolve: {
    color: "green",
    glyph: "done",
    text: "Проверено",
  },
} as const;
