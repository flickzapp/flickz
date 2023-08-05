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
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Film,
  MoreHorizontal,
  MoveDownIcon,
  MoveUpIcon,
  PlusIcon,
  Ratio,
  Trash,
  Type,
  Wand,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
type DefaultStatesType = {
  fontFamily: string;
  align: string;
  fontWeight: string;
  fontSize: string;
};

export default function TypographyMenu({
  currentFrame,
  frames,
  setFrames,
}: any) {
  const handlePropertyChange = (fieldKey: string, newVal: string) => {
    let newFrames = frames.map((frame: any, index: number) => {
      if (index === currentFrame) {
        return { ...frame, [fieldKey]: newVal };
      }
      return frame;
    });
    setFrames(newFrames);
  };
  const [defaultStates, setDefaultState] = useState<
    DefaultStatesType | undefined
  >();
  const fontRef = useRef("inter");
  useEffect(() => {
    console.log("currentFrame", currentFrame);
    const { fontFamily, align, fontWeight, fontSize } = frames[currentFrame];
    console.log(fontFamily);
    fontRef.current = fontFamily;
    setDefaultState({ fontFamily, align, fontWeight, fontSize });
  }, [currentFrame, frames]);

  return (
    <div className="flex flex-col w-full space-y-6">
      <div className="flex justify-between items-center ">
        <h3 className="text-lg font-semibold my-4">Typography</h3>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreHorizontal />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Apply To All frames</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Select
        onValueChange={(val) => handlePropertyChange("fontFamily", val)}
        defaultValue={fontRef.current}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Font Style" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="inter">Inter</SelectItem>
          <SelectItem value="Noto-Sans">Noto Sans</SelectItem>
          <SelectItem value="Roboto">Roboto</SelectItem>
          <SelectItem value="Poppins">Poppins</SelectItem>
        </SelectContent>
      </Select>
      <div className="flex gap-4 ">
        <div className="flex-1">
          <Select
            onValueChange={(val) => handlePropertyChange("fontWeight", val)}
            defaultValue={defaultStates?.fontWeight || ""}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Font-Weight" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="font-bold">Bold</SelectItem>
              <SelectItem value="font-normal">Regular</SelectItem>
              <SelectItem value="font-semibold">Medium</SelectItem>
              <SelectItem value="font-extrabold">Extra Bold</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1">
          <Select
            onValueChange={(val) => handlePropertyChange("fontSize", val)}
            defaultValue={defaultStates?.fontSize || ""}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Font-Size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="LG">Regular</SelectItem>
              <SelectItem value="XL">XL</SelectItem>
              <SelectItem value="2XL">2XL</SelectItem>
              <SelectItem value="3XL">3XL</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <AlignMentButtonContainer handleChange={handlePropertyChange} />
      <div className="flex justify-between items-center ">
        <h3 className="text-lg font-semibold my-4">Background Fill</h3>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreHorizontal />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Apply To All frames</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Solid" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="solid">Solid</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
