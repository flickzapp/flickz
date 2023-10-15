"use client";

import EditableInput from "@/components/shared/EditableInput";
import { Input } from "@/components/ui/input";
import { EDITOR_CANVAS_PROPS } from "@/lib/constants";
import { AbsoluteFill } from "remotion";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useEffect } from "react";

export default function ThumbnailComp({
  frames,
  currentFrame,
  currentFrameText,
  audioLink,
  handlePlay,
}: {
  frames: frameInputType[];
  currentFrame: number;
  currentFrameText: string;
  audioLink: string | null | undefined;
  handlePlay: () => void;
}) {
  const { editor, onReady } = useFabricJSEditor();

  const onAddText = () => {
    editor?.addText("Enter Text");
  };

  useEffect(() => {
    editor?.canvas.loadFromJSON(JSON.parse(EDITOR_CANVAS_PROPS));
  }, []);
  return (
    <AbsoluteFill className="w-full h-full rounded-3xl bg-slate-50 relative flex flex-col text-black">
      <div className="flex gap-4 justify-center items-center py-4   ">
        <Button variant={"ghost"} onClick={onAddText}>
          <Icons.typography className="w-8 h-8" />
        </Button>
        <Button variant={"ghost"}>
          <Icons.media className="w-8 h-8" />
        </Button>
        <Button
          variant={"ghost"}
          onClick={() => {
            // saving canvas to frames
            handlePlay();
          }}
        >
          <Icons.save className="w-8 h-8" />
        </Button>
      </div>

      <FabricJSCanvas className="h-full bg-slate-200" onReady={onReady} />
    </AbsoluteFill>
  );
}
