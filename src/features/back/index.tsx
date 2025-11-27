"use client";
import { Endpoint } from "@/src/shared/models/endpoint-enum";
import { Button } from "@/src/shared/ui/button";
import { Icon } from "@/src/shared/ui/icon";
import { Typography } from "@/src/shared/ui/typography";
import { useRouter } from "next/navigation";

export const BackButton = ({ endpoint }: { endpoint: Endpoint }) => {
  const router = useRouter();
  const handle = () => router.push(endpoint);
  return (
    <Button variant="ghost" onClick={handle}>
      <Icon glyph="arrow-left" size="20" color="default" />
      <Typography.Body className="text-base-500">
        Вернуться назад
      </Typography.Body>
    </Button>
  );
};
