"use client";

import { googleFonts } from "../../config/typographyMenuOpts";
import { CompositionProps, ZFrame } from "../../types/lambda";
import {
  Series,
  spring,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  AbsoluteFill,
  Img,
  Audio,
} from "remotion";
import { z } from "zod";

function FrameRenderer({ ipframe }: { ipframe: z.infer<typeof ZFrame> }) {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const fonts = googleFonts.find((font) => font.family === ipframe.fontFamily);
  fonts?.load().then((res) => {
    // @ts-ignore
    res.loadFont.call();
  });
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
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        position: "relative",
        borderRadius: "3rem",
        background: ipframe.backgroundColor || "#000",
      }}
    >
      {(ipframe.backgroundImgLink || ipframe.backgroundVideoLink) && (
        <div
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
        style={{
          // @ts-ignore
          ...animate[ipframe.entryAnimate || "none"],
          // @ts-ignore
          ...animate[ipframe.exitAnimate || "none"],
          fontSize: ipframe.fontSize || "4rem",
          zIndex: 10,
          color: "transparent",
          background: ipframe.fontColor,
          backgroundClip: "text",
          fontFamily: ipframe.fontFamily,
          fontWeight: ipframe.fontWeight,
          textAlign: ipframe.align,
          backgroundSize: "cover",
          WebkitBackgroundClip: "text",
        }}
      >
        {ipframe.text}
      </div>
    </AbsoluteFill>
  );
}

export default function RenderableVideo({
  frames,
  audioLink,
}: z.infer<typeof CompositionProps>) {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill>
      {audioLink && <Audio src={audioLink} />}
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
    </AbsoluteFill>
  );
}
