"use client";
import { Icon } from "@/src/shared/ui/icon";
import { Typography } from "@/src/shared/ui/typography";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const Player = dynamic(() => import("@/src/shared/ui/player"));

export const MaterialVideoViewer = ({
  url,
  transcript,
}: {
  url: string;
  transcript?: string | null;
}) => {
  return (
    <>
      <div className="rounded-xl">
        <Suspense>
          <Player url={url} />
        </Suspense>
      </div>
      {transcript && (
        <div className="flex flex-col w-full gap-2 p-4 rounded-xl bg-base-raised border border-base-border">
          <div className="flex gap-3 w-full">
            <Icon glyph="ai" size="20" color="black" />
            <Typography.Body bold className="text-black">
              Краткое содержание
            </Typography.Body>
          </div>
          <Typography.Body className="w-full text-wrap text-black">
            {transcript}
          </Typography.Body>
        </div>
      )}
    </>
  );
};
