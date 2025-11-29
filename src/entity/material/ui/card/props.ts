import React from "react";
import { Material } from "../../models/material";

export interface MaterialCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  material?: Material;
  href: string;
}
