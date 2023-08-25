"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Player, PlayerRef } from "@remotion/player";
import InteractivePlayer from "./InteractivePlayer";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TypographyMenu from "./TypographyMenu";
import AspectRatioMenu from "./AspectRatioMenu";
import AnimationMenu from "./AnimationMenu";
import { Icons } from "@/components/icons";
import { updateFramesAction, updateProjectAction } from "@/actions";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import MediaMenu from "./MediaMenu";
import { getDimensionsForAspectRatio } from "@/lib/aspect-ratio";
import { useRouter } from "next/navigation";
import { defaultFontSize } from "@/config/typographyMenuOpts";
import RenderVideoButton from "./RenderVideoButton";

const fps = 60;
export default function Editor({
  defaultFrames,
  project,
}: {
  defaultFrames: frameInputType[];
  project: EditorProjectType;
}) {
  const [frames, setFrames] = useState<frameInputType[]>(defaultFrames);
  const playerRef = useRef<PlayerRef>(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [currentFrameContent, setCurrentFrameContent] = useState(
    frames[0].text
  );
  const [compositionDimensions, setCompositionDimensions] = useState({
    height: 1080,
    width: 1920,
  });
  const router = useRouter();
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
      index: inputIndex === -1 ? frames.length : inputIndex + 1,
      entryAnimate: "none",
      exitAnimate: "none",
      fontFamily: "inter",
      fontSize: defaultFontSize,
      fontColor: "#FFFFFF",
      backgroundColor: "#000000",
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
    setCurrentFrame(inputIndex > 0 ? inputIndex - 1 : inputIndex);
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

  const saveChanges = useCallback(async () => {
    let tempFrames = [...frames];
    tempFrames[currentFrame].text = `${currentFrameContent}`;
    await updateFramesAction(project.id, tempFrames);
  }, [frames, currentFrameContent]);

  const saveProjectMetaChanges = async ({
    aspectRatio,
    audioLink,
  }: {
    aspectRatio?: string;
    audioLink?: string;
  }) => {
    let newProjectData = {
      ...project,
      aspectRatio: aspectRatio,
      audioLink: audioLink,
    };
    await updateProjectAction(project.id, newProjectData);
    router.refresh();
  };

  useEffect(() => {
    if (project.aspectRatio) {
      const newDimensions = getDimensionsForAspectRatio(project.aspectRatio);
      setCompositionDimensions(newDimensions);
    }
  }, [project]);

  useEffect(() => {
    const autoSave = setInterval(() => {
      saveChanges();
    }, 5 * 1000);
    return () => clearInterval(autoSave);
  }, [saveChanges]);

  return (
    <div className="flex gap-4 justify-between">
      <div className="flex-1">
        <ScrollArea className="h-[80vh] p-4">
          {frames.map((frame, index) => (
            <Card
              key={`${frame.text}-${index}`}
              className={`mb-3 p-2 rounded-md cursor-pointer transition ease-linear ${
                currentFrame === index ? "border-2 scale-100" : " scale-75"
              }`}
              onClick={() => handleClick(index)}
            >
              <div>
                {currentFrame === index ? (
                  <>
                    <Input
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
                        onClick={(e) => {
                          moveUp(index);
                          e.stopPropagation();
                        }}
                        disabled={index === 0 ? true : false}
                        className="px-1 h-5 hover:bg-transparent mx-1 mt-2"
                      >
                        <Icons.moveUp className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={(e) => {
                          moveDown(index);
                          e.stopPropagation();
                        }}
                        disabled={index === frames.length - 1 ? true : false}
                        className="px-1 h-5 hover:bg-transparent mx-1 mt-2"
                      >
                        <Icons.moveDown className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={(e) => {
                          addNewFrame(index);
                          e.stopPropagation();
                        }}
                        className="px-1 h-5 hover:bg-transparent mx-1 mt-2"
                      >
                        <Icons.plusIcon className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={(e) => {
                          deleteFrame(index);
                          e?.stopPropagation();
                        }}
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
            </Card>
          ))}
        </ScrollArea>
        <div className="flex flex-col gap-4">
          <Button className="w-full" onClick={() => addNewFrame(-1)}>
            + Add Frame
          </Button>
          <RenderVideoButton
            key={currentFrame}
            frames={frames}
            currentFrame={currentFrame}
            currentFrameText={currentFrameContent}
          />
        </div>
      </div>

      <div className="w-[60%] m-auto">
        <div className="overflow-hidden rounded-[20px]">
          <Player
            component={InteractivePlayer}
            ref={playerRef}
            durationInFrames={
              frames.reduce((acc, curr) => acc + curr.duration, 0) * fps
            }
            style={{
              width: "100%",
              maxHeight: "80vh",
            }}
            fps={fps}
            compositionHeight={compositionDimensions.height}
            compositionWidth={compositionDimensions.width}
            loop={true}
            controls={true}
            inputProps={{
              frames: frames,
              currentFrame: currentFrame,
              currentFrameText: currentFrameContent,
            }}
          />
        </div>
      </div>
      <div className="flex-1">
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
              <Icons.mediaAssets className="h-4 w-4" />
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
            <AspectRatioMenu
              aspectRatio={project.aspectRatio}
              saveProjectMetaChanges={saveProjectMetaChanges}
              setCompositionDimensions={setCompositionDimensions}
            />
          </TabsContent>
          <TabsContent value="background">
            {/* <div className="w-full">
              <h3 className="text-base font-semibold my-4 text-center">
                Coming soon!
              </h3>
            </div> */}
            <MediaMenu
              currentFrame={currentFrame}
              frames={frames}
              setFrames={setFrames}
            />
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
  );
}
