"use client";
import { Typography } from "@/src/shared/ui/typography";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const Player = dynamic(() => import("@/src/shared/ui/player"));

export const MaterialVideoViewer = ({
  url, transcript
}: {
  url: string;
  transcript?: string | null;
}) => {
  return (
    <>
      <div className="rounded-[12px]">
        <Suspense>
          <Player url={url} />
        </Suspense>
        
      </div>
      {transcript && (
        <div className="flex flex-col w-full gap-1 p-5 rounded-[14px] bg-base-100 border border-base-200">
          <Typography.Caption className="text-black opacity-20 font-black! w-full">
            КУРС
          </Typography.Caption>
          <div className="flex flex-col w-full gap-2">
            <Typography.Body className="w-full text-wrap">
              {transcript}
            </Typography.Body>
          </div>
        </div>
      )}
    </>
  );
};
