import Image from "next/image";
import { forwardRef } from "react";
import { LogoProps } from "./props";
import { getLogoSize, LogoVariant } from "./variant";

export const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ size, ...props }, ref) => {
    const { width, height } = getLogoSize(size);
    return (
      <div ref={ref} {...props} className={LogoVariant({ size })}>
        <Image src="/logo.svg" alt="Logo" width={width} height={height} />
      </div>
    );
  }
);

Logo.displayName = "Logo";
