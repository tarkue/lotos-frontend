import { cva, VariantProps } from "class-variance-authority";
import { ElementSize } from "./models/element-size";

export const LogoVariant = cva("", {
  variants: {
    size: {
      default: "w-30 h-auto sm:w-40 sm:h-9 md:w-49 md:h-11",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export const getLogoSize = (
  size: VariantProps<typeof LogoVariant>["size"]
): ElementSize => {
  switch (size) {
    default:
      return { width: 194, height: 44 };
  }
};
