import { cn } from "@/src/shared/libs/utils";
import { Endpoint } from "@/src/shared/models/endpoint-enum";
import { Typography } from "@/src/shared/ui/typography";
import Link from "next/link";
import { forwardRef, Suspense } from "react";
import { CourseCardProps } from "./props";
import { CourseCardVariant } from "./variant";
import Image from "next/image";

export const CourseCard = forwardRef<HTMLAnchorElement, CourseCardProps>(
  ({ className, course, action, ...props }, ref) => {
    const Act = action;
    return (
      <Link
        href={`${Endpoint.COURSES}/${course.id}`}
        className={cn(CourseCardVariant({ className }))}
        ref={ref}
        {...props}
      >
        {course.img_url ? (
          <Image
            src={course.img_url}
            alt={course.title}
            className="w-full h-36 object-cover"
          />
        ) : (
          <div className="w-full h-36 bg-base-border"></div>
        )}
        <div className="flex flex-col bg-white p-5 pt-3 w-full">
          <Typography.Body bold className="w-full text-black">
            {course.title}
          </Typography.Body>
          <Typography.Caption className="w-full text-dark-gray line-clamp-4 min-h-16">
            {course.description}
          </Typography.Caption>
        </div>
        {Act && (
          <div className={cn(!course.progress && "w-full md:w-auto")}>
            <Suspense>
              <Act course={course} />
            </Suspense>
          </div>
        )}
      </Link>
    );
  },
);
CourseCard.displayName = "CourseCard";
