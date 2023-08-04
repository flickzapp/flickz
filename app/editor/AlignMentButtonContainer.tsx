import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from "lucide-react";

export default function AlignMentButtonContainer() {
  return (
    <div className="flex justify-around">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <AlignLeft />
          </TooltipTrigger>
          <TooltipContent>
            <p>Align Text to Left</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <AlignJustify />
          </TooltipTrigger>
          <TooltipContent>
            <p>Justify Text</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <AlignCenter />
          </TooltipTrigger>
          <TooltipContent>
            <p>Center the text</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <AlignRight />
          </TooltipTrigger>
          <TooltipContent>
            <p>Align Text to Right</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
