"use client";
import { CourseProps } from "@/src/entity/course";
import { Button } from "@/src/shared/ui/button";
import { Icon } from "@/src/shared/ui/icon";

export const Enroll: React.FC<CourseProps> = () => {
  const { isAuthorized } = { isAuthorized: true };
  return (
    <Button
      size="large"
      variant="primary"
      disabled={!isAuthorized}
      className="w-min"
    >
      Записаться
      <Icon glyph="plus" size="20" color={isAuthorized ? "white" : "gray"} />
    </Button>
  );
};
