"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AlignMentButtonContainer from "./AlignMentButtonContainer";
import {
  fontSizes,
  fontWeights,
  fonts,
  googleFonts,
} from "@/config/typographyMenuOpts";
import { Icons } from "@/components/icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ColorPicker } from "@/components/color-picker";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";

interface TypographyMenuInterface {
  currentFrame: number;
  frames: frameInputType[];
  setFrames: any;
  setSavedChanges: SetSavingStatusType;
}
export default function TypographyMenu({
  currentFrame,
  frames,
  setFrames,
  setSavedChanges,
}: TypographyMenuInterface) {
  const [background, setBackground] = useState(
    frames[currentFrame].backgroundColor || "#ffffff"
  );
  const [fontColor, setFontColor] = useState(
    frames[currentFrame].fontColor || "#000000"
  );
  const [duration, setDuration] = useState(frames[currentFrame].duration);
  const handlePropertyChange = (fieldKey: string, newVal: string) => {
    let newFrames = frames.map((frame: any, index: number) => {
      if (index === currentFrame) {
        if (fieldKey === "duration") {
          return { ...frame, [fieldKey]: parseFloat(newVal) };
        }
        return { ...frame, [fieldKey]: newVal };
      }
      return frame;
    });
    setSavedChanges("saving");
    setFrames(newFrames);
  };

  return (
    <div className="flex flex-col w-full space-y-6">
      <div className="flex justify-between items-center ">
        <h3 className="text-base font-semibold my-4">Typography</h3>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Icons.horizontalEllipsis className="h-5 w-5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => {
                const tempFrames = [...frames];
                tempFrames.forEach((frame) => {
                  frame.fontFamily = frames[currentFrame].fontFamily;
                  frame.fontWeight = frames[currentFrame].fontWeight;
                  frame.fontSize = frames[currentFrame].fontSize;
                  frame.align = frames[currentFrame].align;
                });
                setFrames(tempFrames);
                setSavedChanges("saving");
                toast({
                  title: "Typography applied to all frames",
                });
              }}
            >
              Apply To All frames
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Select
        onValueChange={(val) => handlePropertyChange("fontFamily", val)}
        defaultValue={frames[currentFrame].fontFamily}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Font Style" />
        </SelectTrigger>
        <SelectContent>
          <ScrollArea className="h-[30vh]">
            {googleFonts.map((font) => (
              <SelectItem value={font.family} key={font.family}>
                {font.family}
              </SelectItem>
            ))}
          </ScrollArea>
        </SelectContent>
      </Select>
      <div className="flex gap-4 ">
        <div className="flex-1">
          <Select
            onValueChange={(val) => handlePropertyChange("fontWeight", val)}
            defaultValue={frames[currentFrame].fontWeight}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Font-Weight" />
            </SelectTrigger>
            <SelectContent>
              {fontWeights.map((font) => (
                <SelectItem value={font.value} key={font.value}>
                  {font.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1">
          <Select
            onValueChange={(val) => handlePropertyChange("fontSize", val)}
            defaultValue={frames[currentFrame].fontSize}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Font-Size" />
            </SelectTrigger>
            <SelectContent>
              <ScrollArea className="h-48">
                {fontSizes.map((font) => (
                  <SelectItem value={font.value} key={font.value}>
                    {font.name}
                  </SelectItem>
                ))}
              </ScrollArea>
            </SelectContent>
          </Select>
        </div>
      </div>
      <AlignMentButtonContainer handleChange={handlePropertyChange} />
      <div className="flex justify-between items-center ">
        <h3 className="text-base font-semibold mt-4">Background Fill</h3>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Icons.horizontalEllipsis className="h-5 w-5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => {
                const tempFrames = [...frames];
                tempFrames.forEach((frame) => {
                  frame.backgroundColor = background;
                });
                setFrames(tempFrames);
                setSavedChanges("saving");
                toast({
                  title: "Background color applied to all frames",
                });
              }}
            >
              Apply To All frames
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <ColorPicker
        background={background}
        setBackground={(newBackground) => {
          setBackground(newBackground);
          handlePropertyChange("backgroundColor", newBackground);
        }}
      />
      <div className="flex justify-between items-center ">
        <h3 className="text-base font-semibold mt-4">Text Fill</h3>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Icons.horizontalEllipsis className="h-5 w-5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => {
                const tempFrames = [...frames];
                tempFrames.forEach((frame) => {
                  frame.fontColor = fontColor;
                });
                setFrames(tempFrames);
                setSavedChanges("saving");
                toast({
                  title: "Font color applied to all frames",
                });
              }}
            >
              Apply To All frames
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <ColorPicker
        background={fontColor}
        setBackground={(newFontColor) => {
          setFontColor(newFontColor);
          handlePropertyChange("fontColor", newFontColor);
        }}
      />
      <div className="flex justify-between items-center ">
        <h3 className="text-base font-semibold mt-4">Duration</h3>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Icons.horizontalEllipsis className="h-5 w-5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => {
                const tempFrames = [...frames];
                tempFrames.forEach((frame) => {
                  frame.duration = frames[currentFrame].duration;
                });
                setFrames(tempFrames);
                setSavedChanges("saving");
                toast({
                  title: "Applied to all frames",
                });
              }}
            >
              Apply To All frames
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex gap-3 items-center">
        <Input
          type="number"
          defaultValue={frames[currentFrame].duration}
          step={0.5}
          min={0.5}
          max={10}
          onChange={(e) => {
            setDuration(parseFloat(e.target.value));
          }}
          onBlur={() => {
            handlePropertyChange("duration", duration.toString());
          }}
          className="w-32"
        />
        seconds
      </div>
    </div>
  );
}
