import { forwardRef } from "react";
import { Typography } from "../../typography";
import { TabElementProps } from "./props";
import { TabElementVariant } from "./variant";

export const TabElement = forwardRef<HTMLLIElement, TabElementProps>(
  ({ isActive, className, children, ...props }, ref) => {
    return (
      <li
        className={TabElementVariant({ isActive, className })}
        {...props}
        ref={ref}
      >
        <Typography.Body bold>{children}</Typography.Body>
      </li>
    );
  },
);
TabElement.displayName = "TabElement";
