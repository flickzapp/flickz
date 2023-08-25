import { z } from "zod";
export const COMP_NAME = "RenderableVideo";

export const CompositionProps = z.object({
  title: z.string(),
});

export const defaultMyCompProps: z.infer<typeof CompositionProps> = {
  title: "Next.js and Remotion",
};

export const DURATION_IN_FRAMES = 300;
export const VIDEO_WIDTH = 1280;
export const VIDEO_HEIGHT = 720;
export const VIDEO_FPS = 30;
