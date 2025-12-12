import { VariantProps } from "class-variance-authority";
import { IconVariants } from "./variants";

export interface IconProps
  extends VariantProps<typeof IconVariants>,
    Omit<React.HTMLAttributes<HTMLElement>, "color"> {
  className?: string;
  glyph: glyphs;
}

export type glyphs =
  | "add-user"
  | "add"
  | "arrow-down"
  | "arrow-left"
  | "arrow-right"
  | "attachment"
  | "book"
  | "change"
  | "close"
  | "done"
  | "list"
  | "lock"
  | "log-out"
  | "return"
  | "send"
  | "trash"
  | "user"
  | "download"
  | "plus"
  | "presentation"
  | "search";
