import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { COMP_NAME } from "@/lib/constants";
import { useRendering } from "@/lib/lambda/use-rendering";

export default function RenderVideoButton({
  frames,
  currentFrame,
  currentFrameText,
  project,
}: {
  frames: frameInputType[];
  currentFrame: number;
  currentFrameText: string;
  project: EditorProjectType;
}) {
  const tempFrames = [...frames];
  tempFrames[currentFrame].text = currentFrameText;
  const { renderMedia, state, undo } = useRendering(COMP_NAME, {
    frames: tempFrames,
    aspectRatio: project.aspectRatio || "16:9",
  });
  return (
    <div>
      {(state.status == "init" ||
        state.status === "invoking" ||
        state.status === "error") && (
        <>
          <Button disabled={state.status === "invoking"} onClick={renderMedia}>
            {state.status === "invoking" && (
              <Icons.spinner className="h-5 w-5 animate-spin" />
            )}
            Render Video
          </Button>
          {state.status === "error" && (
            <div>
              <strong>Error:</strong>
              <p>{state.error.message}</p>
            </div>
          )}
        </>
      )}
      {state.status === "rendering" && <p>Loading...</p>}
      {state.status === "done" && <a href={state.url}> Done</a>}
    </div>
  );
}
