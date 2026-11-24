import { Button } from "../../button";
import { Icon } from "../../icon";

export const CloseModal = ({ close }: { close: () => void }) => {
  return (
    <Button
      variant="ghost"
      size="none"
      type="button"
      aria-label="Закрыть окно"
      className="z-10 size-11 shrink-0 sm:size-8"
      onClick={close}
    >
      <Icon glyph="close" size="20" color="black" />
    </Button>
  );
};
