"use client";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const Player = dynamic(() => import("@/src/shared/ui/player"));

export const MaterialVideoViewer = ({
  url,
}: {
  url: string;
  transcript?: string | null;
}) => {
  return (
    <div className="rounded-[12px]">
      <Suspense>
        <Player url={url} />
      </Suspense>
    </div>
  );
};
