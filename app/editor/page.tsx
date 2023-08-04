"use client";

import ContentWrapper from "@/components/shared/ContentWrapper";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Player } from "@remotion/player";
import InteractivePlayer from "./InteractivePlayer";
import { useState } from "react";
import { MoveDownIcon, MoveUpIcon, PlusIcon, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

let defaultFrames: frameInputType[] = [
  {
    text: "Hello World",
    duration: 4,
    id: 1,
    entryAnimate: "grow",
  },
  {
    text: "This is second frame",
    duration: 2,
    id: 2,
    entryAnimate: "none",
  },
  {
    text: "This is third frame",
    duration: 4,
    id: 3,
    entryAnimate: "slideFromRight",
  },
  {
    text: "This is fourth frame",
    duration: 4,
    id: 4,
    entryAnimate: "moveUp",
  },
];
const fps = 60;
export default function EditorPage() {
  const [frames, setFrames] = useState<frameInputType[]>(defaultFrames);
  const moveUp = (inputIndex: number) => {
    if (inputIndex > 0) {
      let tempFrames = [...frames];
      [tempFrames[inputIndex], tempFrames[inputIndex - 1]] = [
        tempFrames[inputIndex - 1],
        tempFrames[inputIndex],
      ];

      setFrames(tempFrames);
    }
  };

  const moveDown = (inputIndex: number) => {
    if (inputIndex < frames.length - 1) {
      let tempFrames = [...frames];
      [tempFrames[inputIndex], tempFrames[inputIndex + 1]] = [
        tempFrames[inputIndex + 1],
        tempFrames[inputIndex],
      ];
      setFrames(tempFrames);
    }
  };

  const addNewFrame = (inputIndex: number) => {
    let newFrame: frameInputType = {
      text: "New Frame",
      duration: 2,
      id: Math.random() * 20,
      entryAnimate: "none",
    };
    if (inputIndex === -1) {
      setFrames([...frames, newFrame]);
    } else {
      let tempFrames = [...frames];
      tempFrames.splice(inputIndex + 1, 0, newFrame);
      console.log(tempFrames);
      setFrames([...tempFrames]);
    }
  };

  const deleteFrame = (inputIndex: number) => {
    let tempFrames = [...frames];
    tempFrames.splice(inputIndex, 1);
    setFrames([...tempFrames]);
  };

  return (
    <ContentWrapper>
      <div className="flex gap-4 items-start w-full h-full justify-start">
        <div className="flex-1">
          <h3 className="text-xl font-semibold my-4">Frames</h3>
          <ScrollArea className="h-[600px] w-[400px]">
            <div className="p-4">
              {frames.map((frame, index) => (
                <div
                  key={`${frame.text}-${frame.id}`}
                  className="my-4 p-4 bg-slate-50"
                >
                  <Textarea
                    defaultValue={frame.text}
                    onChange={(e) => {
                      let tempFrames = [...frames];
                      tempFrames[index].text = e.target.value;
                      setFrames(tempFrames);
                    }}
                    className="bg-white border-none rounded-lg"
                  />
                  <div className="flex items-center justify-end py-2">
                    <Button
                      variant="ghost"
                      onClick={() => moveUp(index)}
                      disabled={index === 0 ? true : false}
                    >
                      <MoveUpIcon className="h-4 w-4 " />
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => moveDown(index)}
                      disabled={index === frames.length - 1 ? true : false}
                    >
                      <MoveDownIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" onClick={() => addNewFrame(index)}>
                      <PlusIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => deleteFrame(index)}
                      disabled={frames.length === 1 ? true : false}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full" onClick={() => addNewFrame(-1)}>
              + Add Frame
            </Button>
          </ScrollArea>
        </div>
        <div className="flex-1">
          <Player
            component={InteractivePlayer}
            durationInFrames={
              frames.reduce((acc, curr) => acc + curr.duration, 0) * fps
            }
            fps={fps}
            compositionHeight={600}
            compositionWidth={600}
            loop={true}
            controls={true}
            autoPlay={true}
            inputProps={{ frames: frames }}
          />
        </div>
      </div>
    </ContentWrapper>
  );
}
