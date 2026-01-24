import { Button } from "@/src/shared/ui/button";

export const CompleteTestButton = ({ disable }: { disable?: boolean }) => {
  return (
    <Button
      variant="primary"
      size="large"
      className="w-min"
      type="submit"
      disabled={disable}
    >
      Завершить тест
    </Button>
  );
};
