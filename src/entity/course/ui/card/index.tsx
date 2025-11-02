import { cn } from "@/src/shared/libs/utils";
import { Typography } from "@/src/shared/ui/typography";
import Link from "next/link";
import { forwardRef } from "react";
import { CourseCardProps } from "./props";
import { CourseCardVariant } from "./variant";

export const CourseCard = forwardRef<HTMLAnchorElement, CourseCardProps>(
  ({ size, className, course, ...props }, ref) => {
    return (
      <Link
        href={`/catalog/course/${course.id}`}
        className={cn(CourseCardVariant({ size, className }))}
        ref={ref}
        {...props}
      >
        <Typography.Subtitle className="p-2 text-center uppercase">
          {course.title}
        </Typography.Subtitle>
      </Link>
    );
  }
);
CourseCard.displayName = "CourseCard";
