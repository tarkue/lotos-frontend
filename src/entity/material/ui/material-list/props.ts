import React from "react";
import { Material } from "../../models/material";

export interface MaterialListProps
  extends React.HTMLAttributes<HTMLDivElement> {
  materials?: Material[];
  courseId?: number;
  moduleId?: number;
}
