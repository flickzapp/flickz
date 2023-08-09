"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Player, PlayerRef } from "@remotion/player";
import InteractivePlayer from "./InteractivePlayer";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TypographyMenu from "./TypographyMenu";
import AspectRatioMenu from "./AspectRatioMenu";
import AnimationMenu from "./AnimationMenu";
import { Icons } from "@/components/icons";

const fps = 60;
export default function Editor({
  defaultFrames,
}: {
  defaultFrames: frameInputType[];
}) {
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
      id: `${Math.random() * 20}`,
      index: inputIndex === -1 ? frames.length : inputIndex + 1,
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
    <div className="flex gap-4 justify-between">
      <div className="flex flex-col w-[600px]">
        <ScrollArea className="h-[80vh] p-4 dark:text-black">
          {frames.map((frame, index) => (
            <div
              key={`${frame.text}-${frame.id}`}
              className={`mb-3 p-2 bg-slate-50 rounded-md cursor-pointer transition ease-linear ${
                currentFrame === index ? "border-2 scale-100" : " scale-75"
              }`}
              onClick={() => handleClick(index)}
            >
              {currentFrame === index ? (
                <>
                  <Textarea
                    value={currentFrameContent}
                    onChange={(e) => {
                      setCurrentFrameContent(e.target.value);
                      e.stopPropagation();
                    }}
                    className="border-none rounded-lg resize-none outline-none"
                  />
                  <div className="flex items-center justify-end">
                    <Button
                      variant="ghost"
                      onClick={() => moveUp(index)}
                      disabled={index === 0 ? true : false}
                      className="px-1 h-5 hover:bg-transparent mx-1 mt-2"
                    >
                      <Icons.moveUp className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => moveDown(index)}
                      disabled={index === frames.length - 1 ? true : false}
                      className="px-1 h-5 hover:bg-transparent mx-1 mt-2"
                    >
                      <Icons.moveDown className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => addNewFrame(index)}
                      className="px-1 h-5 hover:bg-transparent mx-1 mt-2"
                    >
                      <Icons.plusIcon className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => deleteFrame(index)}
                      disabled={frames.length === 1 ? true : false}
                      className="px-1 h-5 hover:bg-transparent mx-1 mt-2"
                    >
                      <Icons.trash className="h-3 w-3" />
                    </Button>
                  </div>
                </>
              ) : (
                <p className="bg-transparent p-4">{frame.text}</p>
              )}
            </div>
          ))}

          <Button className="w-full" onClick={() => addNewFrame(-1)}>
            + Add Frame
          </Button>
        </ScrollArea>
      </div>

      <div className="flex flex-grow flex-shrink">
        <Player
          component={InteractivePlayer}
          ref={playerRef}
          durationInFrames={
            frames.reduce((acc, curr) => acc + curr.duration, 0) * fps
          }
          className="rounded-lg flex-1 h-full w-full"
          fps={fps}
          compositionHeight={600}
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
      <div className="w-[500px] pl-3">
        <div className="w-full">
          <Tabs defaultValue="typography" key={currentFrame}>
            <TabsList
              defaultValue="typography"
              className="w-full flex justify-around items-center"
            >
              <TabsTrigger value="typography">
                <Icons.typography className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="ratio">
                <Icons.screenSize className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="background">
                <Icons.mediaAssets className="h-4 w-4"/>
              </TabsTrigger>
              <TabsTrigger value="animation">
                <Icons.magicWand className="h-4 w-4" />
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
                <h3 className="text-base font-semibold my-4 text-center">
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
  );
}
