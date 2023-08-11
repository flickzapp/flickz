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
  setCompositionDimensions: (value: { width: number; height: number }) => void;
}

export default function AspectRatioMenu({
  setCompositionDimensions,
}: AspectRatioMenuProps) {
  const [aspectRatio, setAspectRatio] = useState("16:9");

  const handleAspectRatioChange = (newAspectRatio: string) => {
    setAspectRatio(newAspectRatio);
    const newDimensions = getDimensionsForAspectRatio(newAspectRatio);
    setCompositionDimensions(newDimensions);
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
              <Icons.monitor className="h-5 w-5" />
              <span>{aspectRatio}</span>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="16:9">
            <div className="flex gap-4 justify-start">
              <Icons.monitor className="h-5 w-5" />
              <span>16:9</span>
            </div>
          </SelectItem>
          <SelectItem value="4:3">
            <div className="flex gap-4">
              <Icons.square className="h-5 w-5" />
              <span>4:3</span>
            </div>
          </SelectItem>
          <SelectItem value="1:1">
            <div className="flex gap-4">
              <Icons.smartphone className="h-5 w-5" />
              <span>1:1</span>
            </div>
          </SelectItem>
          <SelectItem value="4:5">
            <div className="flex gap-4">
              <Icons.smartphone className="h-5 w-5" />
              <span>4:5</span>
            </div>
          </SelectItem>
          <SelectItem value="9:16">
            <div className="flex gap-4">
              <Icons.smartphone className="h-5 w-5" />
              <span>9:16</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
      <div className="flex justify-between items-center ">
        <h3 className="text-base font-semibold my-4">Sound Track</h3>
      </div>
    </div>
  );
}
