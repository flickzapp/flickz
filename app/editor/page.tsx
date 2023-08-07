"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Player, PlayerRef } from "@remotion/player";
import InteractivePlayer from "./InteractivePlayer";
import { useRef, useState } from "react";
import {
  Film,
  MoveDownIcon,
  MoveUpIcon,
  PlusIcon,
  Ratio,
  Trash,
  Type,
  Wand,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TypographyMenu from "./TypographyMenu";
import AspectRatioMenu from "./AspectRatioMenu";
import AnimationMenu from "./AnimationMenu";

let defaultFrames: frameInputType[] = [
  {
    text: "Hello World",
    duration: 4,
    id: 1,
    entryAnimate: "grow",
    fontSize: "text-2xl",
    fontWeight: "font-semibold",
    align: "text-center",
    fontFamily: "inter",
  },
  {
    text: "This is second frame",
    duration: 2,
    id: 2,
    entryAnimate: "none",
    fontSize: "text-2xl",
    fontWeight: "font-semibold",
    align: "text-center",
    fontFamily: "inter",
  },
  {
    text: "This is third frame",
    duration: 4,
    id: 3,
    entryAnimate: "slideFromRight",
    fontSize: "text-2xl",
    fontWeight: "font-semibold",
    align: "text-center",
    fontFamily: "inter",
  },
  {
    text: "This is fourth frame",
    duration: 4,
    id: 4,
    entryAnimate: "moveUp",
    fontSize: "text-2xl",
    fontWeight: "font-semibold",
    align: "text-center",
    fontFamily: "inter",
  },
];
const fps = 60;
export default function EditorPage() {
  const [frames, setFrames] = useState<frameInputType[]>(defaultFrames);
  const playerRef = useRef<PlayerRef>(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [currentFrameContent, setCurrentFrameContent] = useState(
    frames[0].text
  );

  const moveUp = (inputIndex: number) => {
    if (inputIndex > 0) {
      let tempFrames = [...frames];
      [tempFrames[inputIndex], tempFrames[inputIndex - 1]] = [
        tempFrames[inputIndex - 1],
        tempFrames[inputIndex],
      ];
      setCurrentFrame(inputIndex - 1);
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
      setCurrentFrame(inputIndex + 1);
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

  // moves the player to specific frame
  const handleClick = (index: number) => {
    let frameIndex = 0;
    for (let i = 0; i < index; i++) {
      frameIndex += frames[i].duration;
    }
    playerRef.current?.seekTo(frameIndex * fps);
    let tempFrames = [...frames];
    tempFrames[currentFrame].text = currentFrameContent;
    setFrames(tempFrames);
    setCurrentFrame(index);
    setCurrentFrameContent(tempFrames[index].text);
    // pause after choosing a particular frame
    playerRef.current?.pause();
  };

  return (
    <div className="h-screen w-full p-8">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-3 ">
          <h3 className="text-xl font-semibold my-4">Frames</h3>
          <ScrollArea className="h-[80vh] pb-12">
            <div className="p-4">
              {frames.map((frame, index) => (
                <div
                  key={`${frame.text}-${frame.id}`}
                  className={`my-4 p-4 bg-slate-50 rounded-md cursor-pointer transition ease-linear ${
                    currentFrame === index
                      ? "border-2 border-b-2 border-black scale-100"
                      : " scale-75"
                  }`}
                  onClick={() => handleClick(index)}
                >
                  {currentFrame === index ? (
                    <Textarea
                      value={currentFrameContent}
                      onChange={(e) => {
                        setCurrentFrameContent(e.target.value);
                        e.stopPropagation();
                      }}
                      className="border-none rounded-lg resize-none"
                    />
                  ) : (
                    <p>{frame.text}</p>
                  )}

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
          </ScrollArea>
          <Button className="w-full" onClick={() => addNewFrame(-1)}>
            + Add Frame
          </Button>
        </div>
        <div className="col-span-6 px-2">
          <Player
            component={InteractivePlayer}
            ref={playerRef}
            durationInFrames={
              frames.reduce((acc, curr) => acc + curr.duration, 0) * fps
            }
            fps={fps}
            className="w-full h-full"
            compositionHeight={800}
            compositionWidth={900}
            loop={true}
            controls={true}
            autoPlay={true}
            inputProps={{
              frames: frames,
              currentFrame: currentFrame,
              currentFrameText: currentFrameContent,
            }}
          />
        </div>
        <div className="col-span-3">
          <div className="w-full ">
            <Tabs defaultValue="typography" key={currentFrame}>
              <TabsList
                defaultValue="typography"
                className="w-full flex justify-around items-center"
              >
                <TabsTrigger value="typography">
                  <Type />
                </TabsTrigger>
                <TabsTrigger value="ratio">
                  <Ratio />
                </TabsTrigger>
                <TabsTrigger value="background">
                  <Film />
                </TabsTrigger>
                <TabsTrigger value="animation">
                  <Wand />
                </TabsTrigger>
              </TabsList>
              <TabsContent value="typography">
                <TypographyMenu
                  currentFrame={currentFrame}
                  frames={frames}
                  setFrames={setFrames}
                />
              </TabsContent>
              <TabsContent value="ratio">
                <AspectRatioMenu />
              </TabsContent>
              <TabsContent value="background">
                <div className="w-full">
                  <h3 className="text-lg font-semibold my-4 text-center">
                    Coming soon!
                  </h3>
                </div>
              </TabsContent>
              <TabsContent value="animation">
                <AnimationMenu
                  currentFrame={currentFrame}
                  frames={frames}
                  setFrames={setFrames}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
