import React from "react";
import { Material } from "../../models/material";

export interface ThemeCardProps
  extends React.HTMLAttributes<HTMLAnchorElement> {
  material?: Material;
  href: string;
}
