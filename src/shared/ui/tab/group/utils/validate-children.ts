import { VariantProps } from "class-variance-authority";
import { JSX } from "react";
import { TabElementProps } from "../../element/props";
import { TabElementVariant } from "../../element/variant";

export const validateChildrenOrThrow = (
  children: JSX.Element[],
  size: VariantProps<typeof TabElementVariant>["size"]
) => {
  console.log(children);
  children.forEach((el) => {
    const props = el.props as TabElementProps;

    if (props.size !== undefined && props.size !== size) {
      throw new Error("You must create TabGroup with Tabs with one size");
    }
    if (props.isActive === true) {
      throw new Error(
        "You should not control the Tab state manually. Instead, use the defaultValue and onChange props provided by the TabGroup component."
      );
    }
  });
};
