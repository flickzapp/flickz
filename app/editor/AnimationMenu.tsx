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
import { MoreHorizontal } from "lucide-react";

export default function AnimationMenu() {
  const entryAnimations = [
    {
      name: "No Animation",
      value: "none",
    },
    {
      name: "Grow",
      value: "grow",
    },
    {
      name: "Slide From Right",
      value: "slideFromRight",
    },
    {
      name: "Slide From Bottom",
      value: "slideFromBottom",
    },
  ];

  const exitAnimations = [
    {
      name: "Fade Out",
      value: "fadeOut",
    },
    {
      name: "Shrink",
      value: "shrink",
    },
  ];

  return (
    <div className="flex flex-col w-full space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold my-4">Animation</h3>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreHorizontal />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Apply To All frames</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <h3 className="text-md ">On Enter</h3>
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="None" />
        </SelectTrigger>
        <SelectContent>
          {entryAnimations.map((animation, index) => (
            <SelectItem key={index} value={animation.value}>
              {animation.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <h3 className="text-md ">On Exit</h3>
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="None" />
        </SelectTrigger>
        <SelectContent>
          {exitAnimations.map((animation, index) => (
            <SelectItem key={index} value={animation.value}>
              {animation.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
