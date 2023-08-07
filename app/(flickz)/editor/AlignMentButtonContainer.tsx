import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Icons } from "@/components/icons";

export default function AlignMentButtonContainer({ handleChange }: any) {
  return (
    <div className="flex justify-around">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Icons.alignLeft
              onClick={() => handleChange("align", "text-left")}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>Align Text to Left</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Icons.alignJustify
              onClick={() => handleChange("align", "text-justify")}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>Justify Text</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Icons.alignCenter
              onClick={() => handleChange("align", "text-center")}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>Center the text</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Icons.alignRight
              onClick={() => handleChange("align", "text-right")}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>Align Text to Right</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
