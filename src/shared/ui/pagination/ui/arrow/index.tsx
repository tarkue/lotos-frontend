import { Button } from "../../../button";
import { Icon } from "../../../icon";
import { ArrowProps } from "./props";

const Arrow = ({ onClick, disabled, variant }: ArrowProps) => (
  <Button
    variant="ghost"
    size="icon-small"
    disabled={disabled}
    onClick={onClick}
  >
    <Icon glyph={`arrow-${variant}`} color="default" />
  </Button>
);

export default Arrow;
