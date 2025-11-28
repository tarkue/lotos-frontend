import { formatEndpoint } from "@/src/shared/libs/endpoint";
import { cn } from "@/src/shared/libs/utils";
import { Endpoint } from "@/src/shared/models/endpoint-enum";
import { Typography } from "@/src/shared/ui/typography";
import Link from "next/link";
import { forwardRef } from "react";
import { CardRight } from "./card-right";
import { ModuleCardProps } from "./props";

export const ModuleCard = forwardRef<HTMLAnchorElement, ModuleCardProps>(
  ({ className, module, ...props }, ref) => {
    return (
      <Link
        href={formatEndpoint(Endpoint.MODULE, [module.course_id, module.id])}
        className={cn(
          "flex gap-12 px-5 py-4 items-center justify-between bg-base-100 border-base-200 border text-base-500 rounded-[10px]",
          className
        )}
        ref={ref}
        {...props}
      >
        <Typography.Subtitle>{module.title}</Typography.Subtitle>
        <CardRight module={module} />
      </Link>
    );
  }
);
ModuleCard.displayName = "ModuleCard";
