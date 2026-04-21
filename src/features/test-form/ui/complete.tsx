import { Button } from "@/src/shared/ui/button";

import { ClipLoader } from "react-spinners";

export const CompleteTestButton = ({ disable }: { disable?: boolean }) => {
  return (
    <Button
      variant="primary"
      size="large"
      className="w-min"
      type="submit"
      disabled={disable}
    >
      {!disable ? "Завершить тест" : <ClipLoader color="#FFFFFF" size={27} />}
    </Button>
  );
};
