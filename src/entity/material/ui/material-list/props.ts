import React from "react";
import { Material } from "../../models/material";

export interface ThemeListProps extends React.HTMLAttributes<HTMLDivElement> {
  materials?: Material[];
}
