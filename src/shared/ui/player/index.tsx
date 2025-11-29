"use client";
import {
  MediaControlBar,
  MediaController,
  MediaFullscreenButton,
  MediaMuteButton,
  MediaPlaybackRateButton,
  MediaPlayButton,
  MediaTimeDisplay,
  MediaTimeRange,
  MediaVolumeRange,
} from "media-chrome/react";
import { useState } from "react";
import { cn } from "../../libs/utils";
import { ReactPlayer } from "./player";

export default function Player({ url }: { url: string }) {
  const [seekMediaVolumeRange, setSeekMediaVolumeRange] =
    useState<boolean>(false);

  return (
    <MediaController
      style={{
        width: "100%",
        aspectRatio: "16/9",
      }}
      className="rounded-[12px] overflow-hidden"
    >
      <ReactPlayer
        slot="media"
        src={url}
        controls={false}
        className="rounded-[12px] overflow-hidden"
        style={{
          width: "100%",
          height: "100%",
        }}
      ></ReactPlayer>
      <MediaControlBar className="pb-2">
        <MediaTimeRange className="w-full h-[12px] media-time-range" />
      </MediaControlBar>
      <MediaControlBar className="w-full flex justify-between mb-2 px-2">
        <div className="flex gap-1 items-center">
          <div className="flex gap-2 bg-[rgba(100,100,100,0.15)] p-1 rounded-4xl">
            <MediaPlayButton className="w-10 h-10 rounded-4xl bg-none" />
          </div>
          <div className="flex gap-2 bg-[rgba(100,100,100,0.15)] p-1 rounded-4xl">
            <MediaTimeDisplay
              showDuration
              className="h-10 px-2.5 rounded-4xl hover:none bg-none hover:bg-none font-nunito select-none"
            />
          </div>

          <div
            className={cn(
              "transition-all duration-250 delay-75 flex gap-0 bg-[rgba(100,100,100,0.15)] px-1 items-center h-12 rounded-3xl overflow-hidden",
              seekMediaVolumeRange ? "w-37" : "w-12"
            )}
          >
            <div className="w-10 h-10">
              <MediaMuteButton
                className="rounded-4xl w-10 h-10"
                onMouseEnter={() => setSeekMediaVolumeRange(true)}
                onMouseLeave={() => setSeekMediaVolumeRange(false)}
              />
            </div>
            <div
              className={cn(
                "transition-all duration-250 delay-75 origin-left",
                seekMediaVolumeRange
                  ? "scale-x-100 visible"
                  : "scale-x-0 unvisible"
              )}
            >
              <MediaVolumeRange
                className={cn(
                  "transition-all duration-250 delay-0 p-1 rounded-4xl min-w-25 py-1",
                  seekMediaVolumeRange ? "visible" : "unvisible"
                )}
                onMouseEnter={() => setSeekMediaVolumeRange(true)}
                onMouseLeave={() => setSeekMediaVolumeRange(false)}
              />
            </div>
          </div>
        </div>
        <div className="flex gap-2 bg-[rgba(100,100,100,0.15)] py-1 px-2 rounded-3xl h-full">
          <MediaPlaybackRateButton className="w-10 h-10 rounded-4xl bg-none select-none" />
          <MediaFullscreenButton className="w-10 h-10 rounded-4xl bg-none" />
        </div>
      </MediaControlBar>
    </MediaController>
  );
}
