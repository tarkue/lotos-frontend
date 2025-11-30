import { cn } from "@/src/shared/libs/utils";
import { Endpoint } from "@/src/shared/models/endpoint-enum";
import { Typography } from "@/src/shared/ui/typography";
import Link from "next/link";
import { forwardRef } from "react";
import { CourseCardProps } from "./props";
import { CourseCardVariant } from "./variant";

export const CourseCard = forwardRef<HTMLAnchorElement, CourseCardProps>(
  ({ size, className, course, action, ...props }, ref) => {
    const Act = action;
    return (
      <Link
        href={`${Endpoint.COURSES}/${course.id}`}
        className={cn(
          CourseCardVariant({ size, className }),
          course.progress ? "max-md:flex-row" : "max-md:flex-col"
        )}
        ref={ref}
        {...props}
      >
        <Typography.Subtitle className="w-full">
          {course.title + "fdf sfs f dfdsf df dsfsfsffsf df ds fd"}
        </Typography.Subtitle>
        {Act && (
          <div className={cn(!course.progress && "w-full md:w-auto")}>
            <Act course={course} />
          </div>
        )}
      </Link>
    );
  }
);
CourseCard.displayName = "CourseCard";
