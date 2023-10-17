"use client";

import EditableInput from "@/components/shared/EditableInput";
import { Input } from "@/components/ui/input";
import { EDITOR_CANVAS_PROPS, EDITOR_FPS } from "@/lib/constants";
import { AbsoluteFill } from "remotion";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useEffect, useState } from "react";
import { transformTextToItext } from "@/lib/utils";

export default function ThumbnailComp({
  frames,
  audioLink,
  handlePlay,
  setFrames,
  setSavedChanges,
  currentFrame,
}: {
  frames: frameInputType[];
  audioLink: string | null | undefined;
  handlePlay: () => void;
  currentFrame: number;
  setFrames: React.Dispatch<React.SetStateAction<frameInputType[]>>;
  setSavedChanges: SetSavingStatusType;
}) {
  const { editor, onReady } = useFabricJSEditor();
  // const [currentFrame, setCurrentFrame] = useState(0);
  const onAddText = () => {
    editor?.addText("Enter Text");
  };

  useEffect(() => {
    if (editor && editor.canvas.getObjects().length === 0) {
      editor?.canvas.loadFromJSON(
        transformTextToItext(
          frames[currentFrame].objects || '{"version": "5.3.0","objects":[]}'
        )
      );
    }
    console.log("Loaded ", frames[currentFrame].objects);
  }, [editor, currentFrame]);

  return (
    <AbsoluteFill className="w-full h-full rounded-3xl bg-slate-50 relative text-black">
      <div className="flex gap-4 justify-center items-center py-4 absolute left-1/2 top-4 z-10">
        <Button variant={"ghost"} onClick={onAddText}>
          <Icons.typography className="w-8 h-8" />
        </Button>
        <Button variant={"ghost"}>
          <Icons.media className="w-8 h-8" />
        </Button>
        <Button
          variant={"ghost"}
          onClick={() => {
            const curObjects = editor?.canvas.toJSON();
            if (curObjects) {
              frames[currentFrame].objects = JSON.stringify(curObjects);
              setFrames([...frames]);
              setSavedChanges("saving");
            }
            // saving canvas to frames
            handlePlay();
          }}
        >
          <Icons.save className="w-8 h-8" />
        </Button>
        <Button
          variant={"ghost"}
          onClick={() => {
            handlePlay();
          }}
        >
          <Icons.close className="w-8 h-8" />
        </Button>
      </div>

      <FabricJSCanvas
        className="h-full w-full bg-slate-200 absolute left-0 top-0"
        onReady={onReady}
      />
    </AbsoluteFill>
  );
}
