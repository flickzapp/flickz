import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Icons } from "@/components/icons";

export default function AspectRatioMenu() {
  return (
    <div className="flex flex-col w-full space-y-6">
      <div className="flex justify-between items-center ">
        <h3 className="text-base font-semibold my-4">Aspect Ratio</h3>
      </div>
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue>
            <div className="flex gap-4 items-center">
              <Icons.monitor className="h-5 w-5" />
              <span>4:3</span>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="4:3">
            <div className="flex gap-4 justify-start">
              <Icons.monitor className="h-5 w-5" />
              <span>4:3</span>
            </div>
          </SelectItem>
          <SelectItem value="1:1">
            <div className="flex gap-4">
              <Icons.square className="h-5 w-5" />

              <span>1:1</span>
            </div>
          </SelectItem>
          <SelectItem value="4:5">
            <div className="flex gap-4">
              <Icons.smartphone className="h-5 w-5" />
              <span>4:5</span>
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
