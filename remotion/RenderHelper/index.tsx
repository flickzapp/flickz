"use client";

import { CompositionProps, ZFrame } from "../../types/lambda";
import {
  Series,
  spring,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  AbsoluteFill,
  Img,
} from "remotion";
import { z } from "zod";

function FrameRenderer({ ipframe }: { ipframe: z.infer<typeof ZFrame> }) {
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
      // className={`flex items-center justify-center w-full h-full relative rounded-3xl`}
      // style={
      //   ipframe?.backgroundImgLink && ipframe?.backgroundColor
      //      { background: ipframe.backgroundColor }
      //     : {}
      // }
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        position: "relative",
        borderRadius: "3rem",
        background: ipframe.backgroundColor || "#000",
        // ipframe?.backgroundImgLink && ipframe?.backgroundColor
        // ? ipframe.backgroundColor
        // : "black",
      }}
    >
      {(ipframe.backgroundImgLink || ipframe.backgroundVideoLink) && (
        <div
          // className="absolute z-0 left-0 top-0 h-full w-full"
          style={{
            position: "absolute",
            zIndex: 0,
            left: 0,
            top: 0,
            height: "100%",
            width: "100%",
          }}
        >
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
        // className={`z-10 !bg-clip-text text-transparent !bg-cover !bg-center transition-all font-${ipframe.fontFamily} ${ipframe.align} ${ipframe.fontWeight}}`}
        style={{
          // @ts-ignore
          ...animate[ipframe.entryAnimate || "none"],
          // @ts-ignore
          ...animate[ipframe.exitAnimate || "none"],
          fontSize: ipframe.fontSize || "4rem",
          zIndex: 10,
          color: ipframe.fontColor,
          fontFamily: ipframe.fontFamily,
          fontWeight: ipframe.fontWeight,
          textAlign: ipframe.align,
          backgroundClip: "text",
          backgroundSize: "cover",

          // transition-property: all;
          // transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          // transition-duration: 150ms;
        }}
      >
        {ipframe.text}
      </div>
    </AbsoluteFill>
  );
}

export default function RenderableVideo({
  frames,
}: z.infer<typeof CompositionProps>) {
  const { fps } = useVideoConfig();
  return (
    <Series>
      {frames.map((ipframe: z.infer<typeof ZFrame>, index: number) => {
        return (
          <Series.Sequence
            key={index}
            durationInFrames={ipframe.duration * fps}
          >
            <FrameRenderer ipframe={ipframe} />
          </Series.Sequence>
        );
      })}
    </Series>
  );
}
