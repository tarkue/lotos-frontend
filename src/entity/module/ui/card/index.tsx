import { formatEndpoint } from "@/src/shared/libs/endpoint";
import { cn } from "@/src/shared/libs/utils";
import { Endpoint } from "@/src/shared/models/endpoint-enum";
import { Typography } from "@/src/shared/ui/typography";
import Link from "next/link";
import { forwardRef } from "react";
import { CardRight } from "./card-right";
import { ModuleCardProps } from "./props";
import { TabElementVariant } from "@/src/shared/ui/tab/element/variant";

export const ModuleCard = forwardRef<HTMLAnchorElement, ModuleCardProps>(
  ({ className, module, ...props }, ref) => {
    return (
      <Link
        href={formatEndpoint(Endpoint.MODULE, [module.course_id, module.id])}
        className={cn(TabElementVariant(), className)}
        ref={ref}
        {...props}
      >
        <Typography.Body bold className="w-full">
          {module.title}
        </Typography.Body>
        <CardRight module={module} />
      </Link>
    );
  },
);
ModuleCard.displayName = "ModuleCard";
