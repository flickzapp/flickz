"use client";

import { cn } from "@/lib/utils";
import {
  Series,
  spring,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  AbsoluteFill,
  Img,
} from "remotion";

function FrameRenderer({
  ipframe,
  currentFrame,
  currentFrameText,
}: {
  ipframe: frameInputType;
  currentFrame: boolean;
  currentFrameText: string;
}) {
  const { fps, width, height } = useVideoConfig();
  const frame = useCurrentFrame();
  const entryProgress = spring({
    frame,
    fps,
    config: {
      damping: 200,
    },
    durationInFrames: (ipframe.duration * fps) / 2,
  });

  const exitProgress = spring({
    frame: frame - (ipframe.duration * fps) / 2,
    fps,
    config: {
      damping: 200,
    },
    durationInFrames: (ipframe.duration * fps) / 2,
  });

  let animate = {
    moveUp: {
      transform: `translateY(${interpolate(
        entryProgress,
        [0, 1],
        [1000, 0]
      )}px)`,
    },
    grow: {
      maxWidth: 1200,
      textAlign: "center",
      transform: `scale(${entryProgress})`,
    },
    slideFromRight: {
      transform: `translateX(${interpolate(
        entryProgress,
        [0, 1],
        [1000, 0]
      )}px)`,
    },
    fadeIn: {
      opacity: interpolate(entryProgress, [0, 1], [0, 1]),
    },
    fadeOut: {
      opacity: interpolate(exitProgress, [0, 1], [1, 0]),
    },
    shrink: {
      transform: `scale(${interpolate(exitProgress, [0, 1], [1, 0])})`,
    },
    slideFromLeft: {
      transform: `translateX(${interpolate(
        exitProgress,
        [0, 1],
        [-1000, 0]
      )}px)`,
    },
    none: {
      maxWidth: 1200,
    },
  };
  return (
    <AbsoluteFill
      className={cn(
        `flex items-center justify-center w-full h-full relative rounded-3xl`
      )}
      style={
        !ipframe?.backgroundImgLink
          ? { background: ipframe.backgroundColor }
          : {}
      }
    >
      {(ipframe.backgroundImgLink || ipframe.backgroundVideoLink) && (
        <div className="absolute z-0 left-0 top-0 h-full w-full">
          <AbsoluteFill>
            {ipframe.backgroundImgLink && (
              <Img
                style={{
                  width: "100%",
                  objectFit: "cover",
                  height: "100%",
                }}
                src={ipframe.backgroundImgLink}
              />
            )}
          </AbsoluteFill>
        </div>
      )}

      <div
        className={cn(
          `z-10 !bg-clip-text text-transparent !bg-cover !bg-center transition-all`,
          `font-${ipframe.fontFamily} ${ipframe.align} ${
            ipframe.fontWeight || "font-bold"
          } ${ipframe.fontSize || "text-9xl"}`
        )}
        // @ts-ignore
        style={{
          ...animate[ipframe.entryAnimate || "none"],
          ...animate[ipframe.exitAnimate || "none"],
          background: ipframe.fontColor,
        }}
      >
        {currentFrame ? currentFrameText : ipframe.text}
      </div>
    </AbsoluteFill>
  );
}

export default function InteractivePlayer({
  frames,
  currentFrame,
  currentFrameText,
}: {
  frames: frameInputType[];
  currentFrame: number;
  currentFrameText: string;
}) {
  const { fps } = useVideoConfig();
  return (
    <Series>
      {frames.map((ipframe: frameInputType, index: number) => {
        return (
          <Series.Sequence
            key={index}
            durationInFrames={ipframe.duration * fps}
          >
            <FrameRenderer
              ipframe={ipframe}
              currentFrame={currentFrame === index}
              currentFrameText={currentFrameText}
            />
          </Series.Sequence>
        );
      })}
    </Series>
  );
}
