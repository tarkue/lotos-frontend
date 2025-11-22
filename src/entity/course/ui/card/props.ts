import { VariantProps } from "class-variance-authority";
import React from "react";
import { CourseProps } from "../../models/course";
import { CourseCardVariant } from "./variant";

export interface CourseCardProps
  extends React.HTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof CourseCardVariant>,
    CourseProps {
  action?: React.FC<CourseProps>;
}
