"use client";

import {
  Series,
  spring,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
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
    <div className="flex items-center justify-center bg-black w-full h-full">
      <div
        className={` text-white font-${ipframe.fontFamily} ${ipframe.align} ${
          ipframe.fontWeight || "font-bold"
        } ${ipframe.fontSize || "text-3xl"}`}
        // @ts-ignore
        style={{
          ...animate[ipframe.entryAnimate || "none"],
          ...animate[ipframe.exitAnimate || "none"],
        }}
      >
        {currentFrame ? currentFrameText : ipframe.text}
      </div>
    </div>
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