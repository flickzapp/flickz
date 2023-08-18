import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Icons } from "@/components/icons";
import { getDimensionsForAspectRatio } from "@/lib/aspect-ratio";
import { useState } from "react";

interface AspectRatioMenuProps {
  aspectRatio?: string;
  saveProjectMetaChanges: (value: {
    aspectRatio?: string;
    audioLink?: string;
  }) => void;
  setCompositionDimensions: (value: { width: number; height: number }) => void;
}

const MapAspectRatioToIcons: {
  [key: string]: JSX.Element;
} = {
  "16:9": <Icons.monitor className="h-5 w-5" />,
  "4:3": <Icons.square className="h-5 w-5" />,
  "1:1": <Icons.smartphone className="h-5 w-5" />,
  "4:5": <Icons.smartphone className="h-5 w-5" />,
  "9:16": <Icons.smartphone className="h-5 w-5" />,
};

export default function AspectRatioMenu({
  aspectRatio,
  saveProjectMetaChanges,
  setCompositionDimensions,
}: AspectRatioMenuProps) {
  const handleAspectRatioChange = (newAspectRatio: string) => {
    const newDimensions = getDimensionsForAspectRatio(newAspectRatio);
    setCompositionDimensions(newDimensions);
    saveProjectMetaChanges({ aspectRatio: newAspectRatio });
  };

  return (
    <div className="flex flex-col w-full space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-base font-semibold my-4">Aspect Ratio</h3>
      </div>
      <Select onValueChange={(val) => handleAspectRatioChange(val)}>
        <SelectTrigger className="w-full">
          <SelectValue>
            <div className="flex gap-4 items-center">
              {(aspectRatio && MapAspectRatioToIcons[aspectRatio]) || (
                <Icons.monitor className="h-5 w-5" />
              )}
              <span>{aspectRatio}</span>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {Object.keys(MapAspectRatioToIcons).map((key) => (
            <SelectItem value={key} key={key}>
              <div className="flex gap-4">
                {MapAspectRatioToIcons[key]}
                <span>{key}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex justify-between items-center ">
        <h3 className="text-base font-semibold my-4">Sound Track</h3>
      </div>
    </div>
  );
}
