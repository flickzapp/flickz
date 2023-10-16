"use client";

import { googleFonts } from "@/config/typographyMenuOpts";
import { EMPTY_CANVAS } from "@/lib/constants";
import { cn } from "@/lib/utils";
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
  const fonts = googleFonts.find((font) => font.family === ipframe.fontFamily);
  fonts?.load().then((res) => {
    // @ts-ignore
    res.loadFont.call();
  });
  const objects = JSON.parse(ipframe.objects || EMPTY_CANVAS).objects;
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
      className={cn(`rounded-3xl overflow-hidden`)}
      // style={
      //   !ipframe?.backgroundImgLink
      //     ? { background: ipframe.backgroundColor }
      //     : {}
      // }
    >
      {/* {(ipframe.backgroundImgLink || ipframe.backgroundVideoLink) && (
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
      )} */}
      <div className="relative h-full w-full bg-slate-100 ">
        {objects?.map((obj: any, index: number) => (
          <div
            key={`${obj?.text}-${index}`}
            style={{
              position: "absolute",
              left: obj?.left,
              top: obj?.top,
              width: obj?.width,
              height: obj?.height,
              color: obj?.fill,
              scale: `${obj?.scaleX} ${obj?.scaleY}`,
              transform: `rotate(${obj?.angle}deg)`,
              fontWeight: obj?.fontWeight,
              strokeWidth: obj?.strokeWidth,
              fontSize: obj?.fontSize,
              lineHeight: obj?.lineHeight,
              minWidth: obj?.minWidth,
              strokeLinejoin: obj?.strokeLinejoin,
              strokeMiterlimit: obj?.strokeMiterlimit,
              textAlign: obj?.textAlign,
            }}
          >
            {obj?.text || ""}
          </div>
        ))}
      </div>

      {/* <div
        className={cn(
          `z-10 !bg-clip-text text-transparent !bg-cover !bg-center transition-all`,
          `${ipframe.align} ${ipframe.fontWeight}}`
        )}
        // ${ipframe.fontSize || "text-9xl"}
        style={{
          // @ts-ignore
          ...animate[ipframe.entryAnimate || "none"],
          // @ts-ignore
          ...animate[ipframe.exitAnimate || "none"],
          background: ipframe.fontColor,
          fontSize: ipframe.fontSize || "4rem",
          fontFamily: ipframe.fontFamily,
        }}
      >
        {currentFrame ? currentFrameText : ipframe.text}
      </div> */}
    </AbsoluteFill>
  );
}

export default function InteractivePlayer({
  frames,
  currentFrame,
  currentFrameText,
  audioLink,
}: {
  frames: frameInputType[];
  currentFrame: number;
  currentFrameText: string;
  audioLink: string | null | undefined;
}) {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill>
      {audioLink && <Audio src={audioLink} />}
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
    </AbsoluteFill>
  );
}
