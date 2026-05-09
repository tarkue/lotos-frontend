import { VariantProps } from "class-variance-authority";
import { IconVariants } from "./variants";

export interface IconProps
  extends
    VariantProps<typeof IconVariants>,
    Omit<React.HTMLAttributes<HTMLElement>, "color"> {
  className?: string;
  glyph: glyphs;
}

export type glyphs =
  | "add-user"
  | "add"
  | "ai"
  | "arrow-down"
  | "arrow-left"
  | "arrow-right"
  | "arrow-up"
  | "change"
  | "close"
  | "comment"
  | "dislike-filled"
  | "dislike-outline"
  | "done"
  | "download"
  | "file"
  | "filter"
  | "homework"
  | "list"
  | "lock"
  | "like-filled"
  | "like-outline"
  | "minus"
  | "password"
  | "presentation"
  | "return"
  | "search"
  | "sort"
  | "test"
  | "text"
  | "time"
  | "trash"
  | "user"
  | "users"
  | "video";
