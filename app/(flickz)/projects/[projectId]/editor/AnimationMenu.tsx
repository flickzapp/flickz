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
import { Icons } from "@/components/icons";

export default function AnimationMenu({
  currentFrame,
  frames,
  setFrames,
}: any) {
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
      value: "moveUp",
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
    {
      name: "No Animation",
      value: "none",
    },
  ];

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
      <div className="flex justify-between items-center">
        <h3 className="text-base font-semibold my-4">Animation</h3>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Icons.horizontalEllipsis className="h-5 w-5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Apply To All frames</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <h4 className="text-sm">On Enter</h4>
      <Select
        onValueChange={(val) => handlePropertyChange("entryAnimate", val)}
        defaultValue={frames[currentFrame].entryAnimate}
      >
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
      <h4 className="text-sm">On Exit</h4>
      <Select
        onValueChange={(val) => handlePropertyChange("exitAnimate", val)}
        defaultValue={frames[currentFrame].exitAnimate || "none"}
      >
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
