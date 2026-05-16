import { Button } from "../../../button";
import { Icon } from "../../../icon";
import { ArrowProps } from "./props";

const Arrow = ({ onClick, disabled, variant }: ArrowProps) => (
  <Button variant="ghost" disabled={disabled} onClick={onClick}>
    <Icon glyph={`arrow-${variant}`} />
  </Button>
);

export default Arrow;
