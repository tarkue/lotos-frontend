import { forwardRef } from "react";
import { Typography } from "../../typography";
import { TabElementProps } from "./props";
import { TabElementVariant } from "./variant";

export const TabElement = forwardRef<HTMLLIElement, TabElementProps>(
  ({ isActive, className, children, ...props }, ref) => {
    return (
      <li
        className={TabElementVariant({ isActive, className })}
        style={{ height: "43px" }}
        {...props}
        ref={ref}
      >
        <Typography.Subtitle>{children}</Typography.Subtitle>
      </li>
    );
  }
);
TabElement.displayName = "TabElement";
