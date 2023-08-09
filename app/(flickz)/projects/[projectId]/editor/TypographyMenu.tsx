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
import { fontSizes, fontWeights, fonts } from "@/config/typographyMenuOpts";
import { Icons } from "@/components/icons";

interface TypographyMenuInterface {
  currentFrame: number;
  frames: frameInputType[];
  setFrames: any;
}
export default function TypographyMenu({
  currentFrame,
  frames,
  setFrames,
}: TypographyMenuInterface) {
  const handlePropertyChange = (fieldKey: string, newVal: string) => {
    let newFrames = frames.map((frame: any, index: number) => {
      if (index === currentFrame) {
        return { ...frame, [fieldKey]: newVal };
      }
      return frame;
    });
    setFrames(newFrames);
  };

  return (
    <div className="flex flex-col w-full space-y-6">
      <div className="flex justify-between items-center ">
        <h3 className="text-base font-semibold my-4">Typography</h3>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Icons.horizontalEllipsis className="h-5 w-5"/>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Apply To All frames</DropdownMenuItem>
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
          {fonts.map((font) => (
            <SelectItem value={font.value} key={font.value}>
              {font.name}
            </SelectItem>
          ))}
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
              {fontSizes.map((font) => (
                <SelectItem value={font.value} key={font.value}>
                  {font.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <AlignMentButtonContainer handleChange={handlePropertyChange} />
      <div className="flex justify-between items-center ">
        <h3 className="text-base font-semibold my-4">Background Fill</h3>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Icons.horizontalEllipsis className="h-5 w-5" />
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
