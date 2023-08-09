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
              className="h-5 w-5"
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
              className="h-5 w-5"
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
              className="h-5 w-5"
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
              className="h-5 w-5"
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
