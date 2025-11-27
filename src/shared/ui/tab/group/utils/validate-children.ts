import { JSX } from "react";
import { TabElementProps } from "../../element/props";

export const validateChildrenOrThrow = (children: JSX.Element[]) => {
  children.forEach((el) => {
    const props = el.props as TabElementProps;

    if (props.isActive === true) {
      throw new Error(
        "You should not control the Tab state manually. Instead, use the defaultValue and onChange props provided by the TabGroup component."
      );
    }
  });
};
