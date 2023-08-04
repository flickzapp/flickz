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
import { Monitor, MoreHorizontal, Smartphone, Square } from "lucide-react";

export default function AspectRatioMenu() {
  return (
    <div className="flex flex-col w-full space-y-6">
      <div className="flex justify-between items-center ">
        <h3 className="text-lg font-semibold my-4">Aspect Ratio</h3>
      </div>
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue>
            <div className="flex gap-4">
              <Monitor />
              <span>4:3</span>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="4:3">
            <div className="flex gap-4">
              <Monitor />
              <span>4:3</span>
            </div>
          </SelectItem>
          <SelectItem value="1:1">
            <div className="flex gap-4">
              <Square />

              <span>1:1</span>
            </div>
          </SelectItem>
          <SelectItem value="4:5">
            <div className="flex gap-4">
              <Smartphone />
              <span>4:5</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
      <div className="flex justify-between items-center ">
        <h3 className="text-lg font-semibold my-4">Sound Track</h3>
      </div>
    </div>
  );
}
