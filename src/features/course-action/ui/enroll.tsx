"use client";
import { CourseProps } from "@/src/entity/course";
import { useAuth } from "@/src/shared/api/context/auth-context";
import { Button } from "@/src/shared/ui/button";
import { Icon } from "@/src/shared/ui/icon";

export const Enroll: React.FC<CourseProps> = () => {
  const { isAuthenticated } = useAuth();
  return (
    <Button
      size="large"
      variant="primary"
      disabled={!isAuthenticated}
      className="w-min"
    >
      Записаться
      <Icon glyph="plus" size="20" color={isAuthenticated ? "white" : "gray"} />
    </Button>
  );
};
