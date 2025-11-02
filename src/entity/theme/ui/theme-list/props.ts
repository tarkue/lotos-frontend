import React from "react";
import { Theme } from "../../models/theme";

export interface ThemeListProps extends React.HTMLAttributes<HTMLDivElement> {
  themes?: Theme[];
}
