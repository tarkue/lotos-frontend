import { cva, VariantProps } from "class-variance-authority";
import { ElementSize } from "./models/element-size";

export const LogoVariant = cva("", {
  variants: {
    size: {
      default: "w-30 h-auto w-[105px]",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export const getLogoSize = (
  size: VariantProps<typeof LogoVariant>["size"],
): ElementSize => {
  switch (size) {
    default:
      return { width: 105, height: 22 };
  }
};
