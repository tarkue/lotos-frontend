import React from "react";
import { Theme } from "../../models/theme";

export interface ThemeCardProps extends React.HTMLAttributes<HTMLDivElement> {
  theme?: Theme;
}
