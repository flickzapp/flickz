import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from "lucide-react";

export default function AlignMentButtonContainer({ handleChange }: any) {
  return (
    <div className="flex justify-around">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <AlignLeft onClick={() => handleChange("align", "text-left")} />
          </TooltipTrigger>
          <TooltipContent>
            <p>Align Text to Left</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <AlignJustify
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
            <AlignCenter onClick={() => handleChange("align", "text-center")} />
          </TooltipTrigger>
          <TooltipContent>
            <p>Center the text</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <AlignRight onClick={() => handleChange("align", "text-right")} />
          </TooltipTrigger>
          <TooltipContent>
            <p>Align Text to Right</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
